export type CsrSystemF32 = {
  size: number;
  rowPtr: Uint32Array;
  colIdx: Uint32Array;
  values: Float32Array;
  invDiag: Float32Array;
};

export type WebGpuPcgSolveOptions = {
  tolerance?: number;
  maxIterations?: number;
  warmStart?: Float32Array;
};

export type WebGpuPcgSolveResult = {
  x: Float32Array;
  residual: number;
  iterations: number;
  elapsedMs: number;
};

export type WebGpuPcgSolver = {
  size: number;
  solve: (
    rhs: Float32Array,
    options?: WebGpuPcgSolveOptions,
  ) => Promise<WebGpuPcgSolveResult>;
  dispose: () => void;
};

const WG_SIZE = 256;

const spmvShader = `
struct Params {
  n: u32,
  _pad0: u32,
  alpha: f32,
  beta: f32,
}
@group(0) @binding(0) var<storage, read> rowPtr: array<u32>;
@group(0) @binding(1) var<storage, read> colIdx: array<u32>;
@group(0) @binding(2) var<storage, read> vals: array<f32>;
@group(0) @binding(3) var<storage, read> x: array<f32>;
@group(0) @binding(4) var<storage, read_write> y: array<f32>;
@group(0) @binding(5) var<uniform> params: Params;

@compute @workgroup_size(${WG_SIZE})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  if (i >= params.n) { return; }
  let start = rowPtr[i];
  let end = rowPtr[i + 1u];
  var sum = 0.0;
  for (var k = start; k < end; k = k + 1u) {
    sum = sum + vals[k] * x[colIdx[k]];
  }
  y[i] = params.alpha * sum + params.beta * y[i];
}
`;

const combineShader = `
struct Params {
  n: u32,
  _pad0: u32,
  alpha: f32,
  beta: f32,
}
@group(0) @binding(0) var<storage, read> x: array<f32>;
@group(0) @binding(1) var<storage, read> y: array<f32>;
@group(0) @binding(2) var<storage, read_write> outVec: array<f32>;
@group(0) @binding(3) var<uniform> params: Params;

@compute @workgroup_size(${WG_SIZE})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  if (i >= params.n) { return; }
  outVec[i] = params.alpha * x[i] + params.beta * y[i];
}
`;

const jacobiShader = `
struct Params {
  n: u32,
  _pad0: u32,
  alpha: f32,
  beta: f32,
}
@group(0) @binding(0) var<storage, read> invDiag: array<f32>;
@group(0) @binding(1) var<storage, read> r: array<f32>;
@group(0) @binding(2) var<storage, read_write> z: array<f32>;
@group(0) @binding(3) var<uniform> params: Params;

@compute @workgroup_size(${WG_SIZE})
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  if (i >= params.n) { return; }
  z[i] = invDiag[i] * r[i];
}
`;

const dotShader = `
struct Params {
  n: u32,
  _pad0: u32,
  alpha: f32,
  beta: f32,
}
@group(0) @binding(0) var<storage, read> x: array<f32>;
@group(0) @binding(1) var<storage, read> y: array<f32>;
@group(0) @binding(2) var<storage, read_write> partial: array<f32>;
@group(0) @binding(3) var<uniform> params: Params;

var<workgroup> cache: array<f32, ${WG_SIZE}>;

@compute @workgroup_size(${WG_SIZE})
fn main(
  @builtin(global_invocation_id) gid: vec3<u32>,
  @builtin(local_invocation_id) lid: vec3<u32>,
  @builtin(workgroup_id) wid: vec3<u32>
) {
  let i = gid.x;
  let lane = lid.x;
  var val = 0.0;
  if (i < params.n) {
    val = x[i] * y[i];
  }
  cache[lane] = val;
  workgroupBarrier();

  var stride = ${WG_SIZE / 2}u;
  loop {
    if (stride == 0u) { break; }
    if (lane < stride) {
      cache[lane] = cache[lane] + cache[lane + stride];
    }
    workgroupBarrier();
    stride = stride / 2u;
  }

  if (lane == 0u) {
    partial[wid.x] = cache[0];
  }
}
`;

export async function createWebGpuPcgSolver(
  system: CsrSystemF32,
): Promise<WebGpuPcgSolver> {
  if (typeof navigator === "undefined" || !("gpu" in navigator)) {
    throw new Error("WebGPU not available");
  }
  const adapter = await (navigator as Navigator & { gpu?: GPU }).gpu?.requestAdapter();
  if (!adapter) {
    throw new Error("WebGPU adapter unavailable");
  }
  const device = await adapter.requestDevice();
  return createWebGpuPcgSolverWithDevice(device, system);
}

function createWebGpuPcgSolverWithDevice(
  device: GPUDevice,
  system: CsrSystemF32,
): WebGpuPcgSolver {
  const n = system.size;
  const numGroups = Math.ceil(n / WG_SIZE);

  const rowPtrBuffer = createStorageBuffer(device, system.rowPtr);
  const colIdxBuffer = createStorageBuffer(device, system.colIdx);
  const valuesBuffer = createStorageBuffer(device, system.values);
  const invDiagBuffer = createStorageBuffer(device, system.invDiag);

  const xBuffer = createMutableVectorBuffer(device, n);
  const rBuffer = createMutableVectorBuffer(device, n);
  const zBuffer = createMutableVectorBuffer(device, n);
  const pBuffer = createMutableVectorBuffer(device, n);
  const apBuffer = createMutableVectorBuffer(device, n);
  const bBuffer = createMutableVectorBuffer(device, n);
  const partialBuffer = createMutableVectorBuffer(device, numGroups);

  const paramsBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const partialReadBuffer = device.createBuffer({
    size: alignTo(numGroups * 4, 4),
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });
  const vectorReadBuffer = device.createBuffer({
    size: alignTo(n * 4, 4),
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });

  const spmvPipeline = createPipeline(device, spmvShader);
  const combinePipeline = createPipeline(device, combineShader);
  const jacobiPipeline = createPipeline(device, jacobiShader);
  const dotPipeline = createPipeline(device, dotShader);

  const zeroVector = new Float32Array(n);
  const paramsData = new ArrayBuffer(16);
  const paramsU32 = new Uint32Array(paramsData);
  const paramsF32 = new Float32Array(paramsData);

  const writeParams = (alpha = 1, beta = 0) => {
    paramsU32[0] = n;
    paramsU32[1] = 0;
    paramsF32[2] = alpha;
    paramsF32[3] = beta;
    device.queue.writeBuffer(paramsBuffer, 0, paramsData);
  };

  const dispatch = (
    pipeline: GPUComputePipeline,
    entries: GPUBufferBinding[],
    workgroups: number,
  ) => {
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: entries.map((buffer, binding) => ({
        binding,
        resource: { buffer },
      })),
    });
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(workgroups);
    pass.end();
    device.queue.submit([encoder.finish()]);
  };

  const spmv = (x: GPUBuffer, y: GPUBuffer) => {
    writeParams(1, 0);
    dispatch(
      spmvPipeline,
      [rowPtrBuffer, colIdxBuffer, valuesBuffer, x, y, paramsBuffer],
      numGroups,
    );
  };

  const combine = (x: GPUBuffer, y: GPUBuffer, out: GPUBuffer, alpha: number, beta: number) => {
    writeParams(alpha, beta);
    dispatch(combinePipeline, [x, y, out, paramsBuffer], numGroups);
  };

  const jacobi = (r: GPUBuffer, z: GPUBuffer) => {
    writeParams(1, 0);
    dispatch(jacobiPipeline, [invDiagBuffer, r, z, paramsBuffer], numGroups);
  };

  const dot = async (x: GPUBuffer, y: GPUBuffer) => {
    writeParams(1, 0);
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginComputePass();
    const bindGroup = device.createBindGroup({
      layout: dotPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: x } },
        { binding: 1, resource: { buffer: y } },
        { binding: 2, resource: { buffer: partialBuffer } },
        { binding: 3, resource: { buffer: paramsBuffer } },
      ],
    });
    pass.setPipeline(dotPipeline);
    pass.setBindGroup(0, bindGroup);
    pass.dispatchWorkgroups(numGroups);
    pass.end();
    encoder.copyBufferToBuffer(partialBuffer, 0, partialReadBuffer, 0, numGroups * 4);
    device.queue.submit([encoder.finish()]);

    await partialReadBuffer.mapAsync(GPUMapMode.READ);
    const view = new Float32Array(partialReadBuffer.getMappedRange());
    let sum = 0;
    for (let i = 0; i < view.length; i++) sum += view[i];
    partialReadBuffer.unmap();
    return sum;
  };

  const readVector = async (buffer: GPUBuffer) => {
    const encoder = device.createCommandEncoder();
    encoder.copyBufferToBuffer(buffer, 0, vectorReadBuffer, 0, n * 4);
    device.queue.submit([encoder.finish()]);
    await vectorReadBuffer.mapAsync(GPUMapMode.READ);
    const out = new Float32Array(vectorReadBuffer.getMappedRange()).slice();
    vectorReadBuffer.unmap();
    return out;
  };

  let disposed = false;

  return {
    size: n,
    solve: async (
      rhs: Float32Array,
      options: WebGpuPcgSolveOptions = {},
    ): Promise<WebGpuPcgSolveResult> => {
      if (disposed) throw new Error("WebGPU PCG solver was disposed");
      if (rhs.length !== n) {
        throw new Error(`RHS length mismatch: expected ${n}, got ${rhs.length}`);
      }

      const tol = options.tolerance ?? 1e-4;
      const maxIter = options.maxIterations ?? 300;
      const t0 = performance.now();

      device.queue.writeBuffer(bBuffer, 0, rhs);
      if (options.warmStart && options.warmStart.length === n) {
        device.queue.writeBuffer(xBuffer, 0, options.warmStart);
      } else {
        device.queue.writeBuffer(xBuffer, 0, zeroVector);
      }

      spmv(xBuffer, apBuffer);
      combine(bBuffer, apBuffer, rBuffer, 1, -1);
      jacobi(rBuffer, zBuffer);
      combine(zBuffer, pBuffer, pBuffer, 1, 0);

      let rzOld = await dot(rBuffer, zBuffer);
      const bNorm = Math.sqrt(Math.max(await dot(bBuffer, bBuffer), 1e-20));
      let rr = Math.max(await dot(rBuffer, rBuffer), 0);
      let relResidual = Math.sqrt(rr) / bNorm;
      let iterations = 0;

      while (iterations < maxIter && relResidual > tol) {
        spmv(pBuffer, apBuffer);
        const pAp = await dot(pBuffer, apBuffer);
        if (!Number.isFinite(pAp) || Math.abs(pAp) < 1e-20) break;

        const alpha = rzOld / pAp;
        combine(pBuffer, xBuffer, xBuffer, alpha, 1);
        combine(apBuffer, rBuffer, rBuffer, -alpha, 1);

        rr = Math.max(await dot(rBuffer, rBuffer), 0);
        relResidual = Math.sqrt(rr) / bNorm;
        if (relResidual <= tol) {
          iterations++;
          break;
        }

        jacobi(rBuffer, zBuffer);
        const rzNew = await dot(rBuffer, zBuffer);
        const beta = rzOld === 0 ? 0 : rzNew / rzOld;
        combine(zBuffer, pBuffer, pBuffer, 1, beta);
        rzOld = rzNew;
        iterations++;
      }

      const x = await readVector(xBuffer);
      return {
        x,
        residual: relResidual,
        iterations,
        elapsedMs: performance.now() - t0,
      };
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      rowPtrBuffer.destroy();
      colIdxBuffer.destroy();
      valuesBuffer.destroy();
      invDiagBuffer.destroy();
      xBuffer.destroy();
      rBuffer.destroy();
      zBuffer.destroy();
      pBuffer.destroy();
      apBuffer.destroy();
      bBuffer.destroy();
      partialBuffer.destroy();
      partialReadBuffer.destroy();
      vectorReadBuffer.destroy();
      paramsBuffer.destroy();
    },
  };
}

function createPipeline(device: GPUDevice, code: string) {
  return device.createComputePipeline({
    layout: "auto",
    compute: {
      module: device.createShaderModule({ code }),
      entryPoint: "main",
    },
  });
}

function createStorageBuffer(
  device: GPUDevice,
  data: Uint32Array | Float32Array,
) {
  const buffer = device.createBuffer({
    size: alignTo(data.byteLength, 4),
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(buffer, 0, data);
  return buffer;
}

function createMutableVectorBuffer(device: GPUDevice, length: number) {
  return device.createBuffer({
    size: alignTo(length * 4, 4),
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
  });
}

function alignTo(v: number, align: number) {
  return Math.ceil(v / align) * align;
}
