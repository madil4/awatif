import { CLTLayup, Element, Node, NodeInputs } from "../../data-model";
import { deform } from "../../deform";

type ModelCase = {
  nodes: Node[];
  elements: Element[];
  nodeInputs: NodeInputs;
  elementInputs: {
    cltLayups: Map<number, CLTLayup>;
    elasticities: Map<number, number>;
    shearModuli: Map<number, number>;
    areas: Map<number, number>;
    torsionalConstants: Map<number, number>;
    momentsOfInertiaY: Map<number, number>;
    momentsOfInertiaZ: Map<number, number>;
  };
  shellNodeIndices: number[];
  topColumnNodeIndices: number[];
  bottomColumnNodeIndices: number[];
  slabElevation: number;
};

const LENGTH = 10;
const WIDTH = 6;
const FLOOR_HEIGHT = 4;
const AREA_LOAD_KN_PER_M2 = 4.335;
const cltLayup = buildSevenLayerCLTLayupSI();

describe("CLT shell + column interaction checks", () => {
  test("connection integrity and global equilibrium", () => {
    const model = buildSingleStoryModel(0.5);

    const shellNodeSet = new Set(model.shellNodeIndices);
    const frameElements = model.elements.filter((e) => e.length === 2);
    expect(frameElements.length).toBe(model.topColumnNodeIndices.length);

    frameElements.forEach((e) => {
      const topNode = model.nodes[e[0]][2] >= model.nodes[e[1]][2] ? e[0] : e[1];
      const bottomNode = topNode === e[0] ? e[1] : e[0];

      expect(shellNodeSet.has(topNode)).toBe(true);
      expect(model.bottomColumnNodeIndices.includes(bottomNode)).toBe(true);
    });

    const outputs = deform(
      model.nodes,
      model.elements,
      model.nodeInputs,
      model.elementInputs,
    );

    const totalLoadZ = sumMapComponent(model.nodeInputs.loads, 2);
    const totalReactionZ = sumMapComponent(outputs.reactions, 2);
    const equilibriumRelError =
      Math.abs(totalLoadZ + totalReactionZ) / Math.max(1, Math.abs(totalLoadZ));

    expect(equilibriumRelError).toBeLessThan(5e-3);
  });

  test("A/B comparison and mesh refinement trend", () => {
    const meshSizes = [1.0, 0.5, 0.33];

    const rows = meshSizes.map((meshSize) => {
      const model = buildSingleStoryModel(meshSize);
      const shellElements = model.elements.filter((e) => e.length === 3);

      const outputsWithColumns = deform(
        model.nodes,
        model.elements,
        model.nodeInputs,
        model.elementInputs,
      );

      const shellOnlySupports: NodeInputs["supports"] = new Map(
        model.topColumnNodeIndices.map((i) => [
          i,
          [true, true, true, true, true, true] as [
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
          ],
        ]),
      );

      const shellOnlyInputs = {
        cltLayups: new Map(shellElements.map((_, i) => [i, cltLayup])),
      };

      const outputsShellOnly = deform(
        model.nodes,
        shellElements,
        {
          supports: shellOnlySupports,
          loads: model.nodeInputs.loads,
        },
        shellOnlyInputs,
      );

      const midNode = findClosestNodeIndex(model.nodes, [
        LENGTH * 0.5,
        WIDTH * 0.5,
        model.slabElevation,
      ]);

      const wWithColumns = outputsWithColumns.deformations?.get(midNode)?.[2] ?? 0;
      const wShellOnly = outputsShellOnly.deformations?.get(midNode)?.[2] ?? 0;

      const totalLoadZ = sumMapComponent(model.nodeInputs.loads, 2);
      const totalReactionZ = sumMapComponent(outputsWithColumns.reactions, 2);
      const equilibriumRelError =
        Math.abs(totalLoadZ + totalReactionZ) / Math.max(1, Math.abs(totalLoadZ));

      return {
        meshSize,
        nodes: model.nodes.length,
        elements: model.elements.length,
        wWithColumnsMm: wWithColumns * 1000,
        wShellOnlyMm: wShellOnly * 1000,
        relativeDiffAB:
          Math.abs(wWithColumns - wShellOnly) /
          Math.max(1e-12, Math.abs(wShellOnly)),
        equilibriumRelError,
      };
    });

    // eslint-disable-next-line no-console
    console.table(rows);

    rows.forEach((r) => {
      expect(r.relativeDiffAB).toBeLessThan(0.3);
      expect(r.equilibriumRelError).toBeLessThan(5e-3);
    });

    const deflections = rows.map((r) => Math.abs(r.wWithColumnsMm));
    const monotonicIncreasing = deflections.every(
      (v, i) => i === 0 || v >= deflections[i - 1],
    );
    const monotonicDecreasing = deflections.every(
      (v, i) => i === 0 || v <= deflections[i - 1],
    );
    expect(monotonicIncreasing || monotonicDecreasing).toBe(true);

    const lastRelIncrement =
      Math.abs(deflections[deflections.length - 1] - deflections[deflections.length - 2]) /
      Math.max(1e-12, deflections[deflections.length - 1]);
    expect(lastRelIncrement).toBeLessThan(0.12);
  });
});

function buildSingleStoryModel(meshSize: number): ModelCase {
  const slabElevation = FLOOR_HEIGHT;
  const shell = buildRectShellMesh(LENGTH, WIDTH, meshSize, slabElevation);

  const topColumnTargets: Node[] = [
    [0, 0, slabElevation],
    [LENGTH, 0, slabElevation],
    [LENGTH, WIDTH, slabElevation],
    [0, WIDTH, slabElevation],
  ];

  const topColumnNodeIndices = topColumnTargets.map((target) =>
    findClosestNodeIndex(shell.nodes, target),
  );

  const shellNodeIndices = shell.nodes.map((_, i) => i);
  const nodes: Node[] = [...shell.nodes];
  const elements: Element[] = [...shell.elements];
  const bottomColumnNodeIndices: number[] = [];

  topColumnNodeIndices.forEach((topIdx) => {
    const [x, y] = nodes[topIdx];
    const bottomIdx = nodes.length;
    nodes.push([x, y, 0]);
    bottomColumnNodeIndices.push(bottomIdx);
    elements.push([topIdx, bottomIdx]);
  });

  const loads = buildUniformAreaLoads(nodes, shell.elements, AREA_LOAD_KN_PER_M2 * 1e3);
  const supports: NodeInputs["supports"] = new Map(
    bottomColumnNodeIndices.map((i) => [
      i,
      [true, true, true, true, true, true] as [
        boolean,
        boolean,
        boolean,
        boolean,
        boolean,
        boolean,
      ],
    ]),
  );

  const elementInputs: ModelCase["elementInputs"] = {
    cltLayups: new Map(),
    elasticities: new Map(),
    shearModuli: new Map(),
    areas: new Map(),
    torsionalConstants: new Map(),
    momentsOfInertiaY: new Map(),
    momentsOfInertiaZ: new Map(),
  };

  shell.elements.forEach((_, i) => {
    elementInputs.cltLayups.set(i, cltLayup);
  });

  // Very stiff frame columns for A/B equivalence check.
  const frameStart = shell.elements.length;
  for (let i = 0; i < topColumnNodeIndices.length; i++) {
    const eIdx = frameStart + i;
    elementInputs.elasticities.set(eIdx, 1e12);
    elementInputs.shearModuli.set(eIdx, 4e11);
    elementInputs.areas.set(eIdx, 1.0);
    elementInputs.torsionalConstants.set(eIdx, 1.0);
    elementInputs.momentsOfInertiaY.set(eIdx, 1.0);
    elementInputs.momentsOfInertiaZ.set(eIdx, 1.0);
  }

  return {
    nodes,
    elements,
    nodeInputs: {
      loads,
      supports,
    },
    elementInputs,
    shellNodeIndices,
    topColumnNodeIndices,
    bottomColumnNodeIndices,
    slabElevation,
  };
}

function buildRectShellMesh(
  L: number,
  W: number,
  maxMeshSize: number,
  z: number,
): { nodes: Node[]; elements: Element[] } {
  const nx = Math.max(2, Math.round(L / maxMeshSize) + 1);
  const ny = Math.max(2, Math.round(W / maxMeshSize) + 1);

  const nodes: Node[] = [];
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      nodes.push([(i * L) / (nx - 1), (j * W) / (ny - 1), z]);
    }
  }

  const elements: Element[] = [];
  for (let j = 0; j < ny - 1; j++) {
    for (let i = 0; i < nx - 1; i++) {
      const bl = j * nx + i;
      const br = bl + 1;
      const tl = (j + 1) * nx + i;
      const tr = tl + 1;
      elements.push([bl, br, tl]);
      elements.push([br, tr, tl]);
    }
  }

  return { nodes, elements };
}

function buildUniformAreaLoads(
  allNodes: Node[],
  shellElements: Element[],
  areaLoadNPerM2: number,
): NodeInputs["loads"] {
  const lumpedAreas = Array(allNodes.length).fill(0);

  for (const e of shellElements) {
    const [n1, n2, n3] = e.map((i) => allNodes[i]);
    const area =
      Math.abs(
        (n2[0] - n1[0]) * (n3[1] - n1[1]) -
          (n3[0] - n1[0]) * (n2[1] - n1[1]),
      ) * 0.5;

    const lumped = area / 3;
    lumpedAreas[e[0]] += lumped;
    lumpedAreas[e[1]] += lumped;
    lumpedAreas[e[2]] += lumped;
  }

  const loads: NodeInputs["loads"] = new Map();
  for (let i = 0; i < allNodes.length; i++) {
    if (lumpedAreas[i] <= 0) continue;
    loads.set(i, [0, 0, -areaLoadNPerM2 * lumpedAreas[i], 0, 0, 0]);
  }

  return loads;
}

function buildSevenLayerCLTLayupSI(): CLTLayup {
  const mmToM = 1e-3;
  const nmm2ToNm2 = 1e6;
  const pattern = [30, 40, 30, 40, 30, 40, 30];
  const angles = [0, 90, 0, 90, 0, 90, 0];

  return {
    layers: pattern.map((thkMm, i) => ({
      thickness: thkMm * mmToM,
      thetaDeg: angles[i],
      Ex: 11000 * nmm2ToNm2,
      Ey: 370 * nmm2ToNm2,
      nuXY: 0.2,
      Gxy: 690 * nmm2ToNm2,
      Gxz: 690 * nmm2ToNm2,
      Gyz: 69 * nmm2ToNm2,
    })),
    options: {
      shearCoupling: true,
      noGlueAtNarrowSide: false,
      strictSymmetryForElement: true,
    },
  };
}

function sumMapComponent(
  mapObj:
    | Map<number, [number, number, number, number, number, number]>
    | undefined,
  componentIndex: number,
): number {
  if (!mapObj) return 0;
  let sum = 0;
  mapObj.forEach((v) => {
    sum += v[componentIndex];
  });
  return sum;
}

function findClosestNodeIndex(nodes: Node[], target: Node): number {
  let minDist = Number.POSITIVE_INFINITY;
  let closest = 0;

  for (let i = 0; i < nodes.length; i++) {
    const dx = nodes[i][0] - target[0];
    const dy = nodes[i][1] - target[1];
    const dz = nodes[i][2] - target[2];
    const dist2 = dx * dx + dy * dy + dz * dz;

    if (dist2 < minDist) {
      minDist = dist2;
      closest = i;
    }
  }

  return closest;
}
