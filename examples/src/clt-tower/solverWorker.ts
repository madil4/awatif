import {
  Element,
  ElementInputs,
  Mesh,
  Node,
  NodeInputs,
  createCachedDeformSolver,
  deform,
} from "awatif-fem";

type SolverTopologyPayload = {
  nodes: Node[];
  elements: Element[];
  supports: NodeInputs["supports"];
  elementInputs: ElementInputs;
};

type SolveWorkerRequest =
  | { type: "reset" }
  | {
      type: "solve";
      requestId: number;
      cacheKey: string;
      loads: NodeInputs["loads"];
      topology?: SolverTopologyPayload;
    };

type SolveWorkerResponse =
  | {
      type: "solved";
      requestId: number;
      deformOutputs: Mesh["deformOutputs"]["val"];
      solveMs: number;
    }
  | {
      type: "failed";
      requestId: number;
      error: string;
    };

type SolverCache = {
  key: string;
  topology: SolverTopologyPayload;
  solver: ReturnType<typeof createCachedDeformSolver>;
};

type WorkerCtx = {
  onmessage: ((event: MessageEvent<SolveWorkerRequest>) => void) | null;
  postMessage: (message: SolveWorkerResponse) => void;
};

const workerCtx = self as unknown as WorkerCtx;
let solverCache: SolverCache | null = null;

workerCtx.onmessage = (event: MessageEvent<SolveWorkerRequest>) => {
  const message = event.data;

  if (message.type === "reset") {
    clearSolverCache();
    return;
  }

  const { requestId, cacheKey, loads, topology } = message;

  try {
    ensureSolver(cacheKey, topology);
    const t0 = performance.now();
    const deformOutputs = solverCache!.solver.solve(loads, {
      includeReactions: false,
    });
    const solveMs = performance.now() - t0;

    const response: SolveWorkerResponse = {
      type: "solved",
      requestId,
      deformOutputs,
      solveMs,
    };
    workerCtx.postMessage(response);
    return;
  } catch (cachedError) {
    try {
      const fallbackTopology = topology ?? solverCache?.topology;
      if (!fallbackTopology) throw cachedError;

      const nodeInputs: NodeInputs = {
        supports: fallbackTopology.supports,
        loads,
      };

      const t0 = performance.now();
      const deformOutputs = deform(
        fallbackTopology.nodes,
        fallbackTopology.elements,
        nodeInputs,
        fallbackTopology.elementInputs,
        { includeReactions: false },
      );
      const solveMs = performance.now() - t0;

      const response: SolveWorkerResponse = {
        type: "solved",
        requestId,
        deformOutputs,
        solveMs,
      };
      workerCtx.postMessage(response);
      return;
    } catch (error) {
      const response: SolveWorkerResponse = {
        type: "failed",
        requestId,
        error:
          error instanceof Error
            ? error.message
            : "Unknown solver worker failure",
      };
      workerCtx.postMessage(response);
    }
  }
};

function ensureSolver(
  cacheKey: string,
  topology?: SolverTopologyPayload,
): SolverTopologyPayload {
  if (solverCache && solverCache.key === cacheKey) {
    if (!topology) return solverCache.topology;

    clearSolverCache();
    solverCache = {
      key: cacheKey,
      topology,
      solver: createCachedDeformSolver(
        topology.nodes,
        topology.elements,
        topology.supports,
        topology.elementInputs,
      ),
    };
    return topology;
  }

  if (!topology) {
    throw new Error("Missing topology payload for solver initialization");
  }

  clearSolverCache();
  solverCache = {
    key: cacheKey,
    topology,
    solver: createCachedDeformSolver(
      topology.nodes,
      topology.elements,
      topology.supports,
      topology.elementInputs,
    ),
  };
  return topology;
}

function clearSolverCache() {
  solverCache?.solver.dispose?.();
  solverCache = null;
}
