import { Node, Element, NodeInputs, ElementInputs } from "./data-model";
import { deform } from "./deform";

describe("deform", () => {
  test("Bars from Logan's book example 3.9", () => {
    const nodes: Node[] = [
      [12, -3, -4],
      [0, 0, 0],
      [12, -3, -7],
      [14, 6, 0],
    ];
    const elements: Element[] = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const nodeInputs: NodeInputs = {
      supports: new Map(),
      loads: new Map(),
    };
    const elementInputs: ElementInputs = {
      elasticities: new Map(),
      areas: new Map(),
    };

    nodeInputs.supports?.set(1, [true, true, true, false, false, false]);
    nodeInputs.supports?.set(2, [true, true, true, false, false, false]);
    nodeInputs.supports?.set(3, [true, true, true, false, false, false]);
    nodeInputs.loads?.set(0, [20, 0, 0, 0, 0, 0]);

    elements.forEach((_, i) => {
      elementInputs.elasticities?.set(i, 210e6);
      elementInputs.areas?.set(i, 10e-4);
    });

    const deformOutputs = deform(nodes, elements, nodeInputs, elementInputs);

    expect(deformOutputs).toEqual({
      deformations: new Map([
        [
          0,
          [
            0.001383724933236592, -0.00005156643246716524,
            0.00006015037593984961, 0, 0, 0,
          ],
        ],
        [1, [0, 0, 0, 0, 0, 0]],
        [2, [0, 0, 0, 0, 0, 0]],
        [3, [0, 0, 0, 0, 0, 0]],
      ]),
      reactions: new Map([
        [
          1,
          [-18.947368421052634, 4.736842105263158, 6.3157894736842115, 0, 0, 0],
        ],
        [2, [0, 0, -4.210526315789473, 0, 0, 0]],
        [
          3,
          [
            -1.0526315789473686, -4.736842105263158, -2.105263157894737, 0, 0,
            0,
          ],
        ],
      ]),
    });
  });

  test("Frames from Logan's book example 5.8", () => {
    const nodes: Node[] = [
      [2.5, 0, 0],
      [0, 0, 0],
      [2.5, 0, -2.5],
      [2.5, -2.5, 0],
    ];
    const elements: Element[] = [
      [1, 0],
      [2, 0],
      [3, 0],
    ];
    const nodeInputs: NodeInputs = {
      supports: new Map(),
      loads: new Map(),
    };
    const elementInputs: ElementInputs = {
      elasticities: new Map(),
      shearModuli: new Map(),
      torsionalConstants: new Map(),
      areas: new Map(),
      momentsOfInertiaY: new Map(),
      momentsOfInertiaZ: new Map(),
    };

    nodeInputs.supports?.set(1, [true, true, true, true, true, true]);
    nodeInputs.supports?.set(2, [true, true, true, true, true, true]);
    nodeInputs.supports?.set(3, [true, true, true, true, true, true]);
    nodeInputs.loads?.set(0, [0, -200e3, 0, -100e3, 0, 0]);
    elements.forEach((_, i) => {
      elementInputs.elasticities?.set(i, 200e9);
      elementInputs.shearModuli?.set(i, 60e9);
      elementInputs.momentsOfInertiaZ?.set(i, 40e-6);
      elementInputs.momentsOfInertiaY?.set(i, 40e-6);
      elementInputs.torsionalConstants?.set(i, 20e-6);
      elementInputs.areas?.set(i, 6.25e-3);
    });

    const deformOutputs = deform(nodes, elements, nodeInputs, elementInputs);

    expect(deformOutputs).toEqual({
      deformations: new Map([
        [
          0,
          [
            0.0000017466534414748466, -0.0003356441727126348,
            -0.00005650787769304768, -0.003752156183061716,
            0.000017154708554951422, -0.00009935435371409363,
          ],
        ],
        [1, [0, 0, 0, 0, 0, 0]],
        [2, [0, 0, 0, 0, 0, 0]],
        [3, [0, 0, 0, 0, 0, 0]],
      ]),
      reactions: new Map([
        [
          1,
          [
            -873.3267207374233, 1299.1563606221894, 215.43623884405804,
            1801.0349678696236, -324.19036593091715, 1941.8793826628362,
          ],
        ],
        [
          2,
          [
            121.0167229576055, 30878.75728306041, 28253.93884652384,
            -26591.54681802802, 96.37583632116228, 47.69008978276494,
          ],
        ],
        [
          3,
          [
            752.3099977798178, 167822.0863563174, -28469.375085367898,
            -23579.819070912377, -8.234260106376682, -622.4535653396724,
          ],
        ],
      ]),
    });
  });

  test("Plate", () => {
    const nodes: Node[] = [
      [0, 0, 0],
      [0, 5, 0],
      [5, 0, 0],
      [10, 5, 0],
      [10, 0, 0],
    ];
    const elements: Element[] = [
      [0, 1, 2],
      [2, 3, 4],
    ];

    const fixedSupport = [true, true, true, true, true, true] as any;
    const nodeInputs: NodeInputs = {
      supports: new Map([
        [0, fixedSupport],
        [1, fixedSupport],
        [3, fixedSupport],
        [4, fixedSupport],
      ]),
      loads: new Map([[2, [0, 0, -1, 0, 0, 0]]]),
    };

    const elementInputs: ElementInputs = {
      elasticities: new Map(elements.map((_, i) => [i, 10])),
      thicknesses: new Map(elements.map((_, i) => [i, 1])),
      poissonsRatios: new Map(elements.map((_, i) => [i, 0.3])),
    };

    const deformOutputs = deform(nodes, elements, nodeInputs, elementInputs);

    expect(deformOutputs).toEqual({
      deformations: new Map([
        [0, [0, 0, 0, 0, 0, 0]],
        [1, [0, 0, 0, 0, 0, 0]],
        [
          2,
          [
            0, 0, -1.3467100041517628, 0.20068292565742005,
            -0.08312558954401492, 0,
          ],
        ],
        [3, [0, 0, 0, 0, 0, 0]],
        [4, [0, 0, 0, 0, 0, 0]],
      ]),
      reactions: new Map([
        [
          0,
          [
            0, 0, 0.36780676281428204, 0.11886720202236689, 0.9739614221402426,
            0,
          ],
        ],
        [
          1,
          [0, 0, 0.1321932371857181, 0.1429860312813887, 0.5624946747141107, 0],
        ],
        [
          3,
          [
            0, 0, 0.1321932371857181, -0.29663740653764714,
            -0.49885019120569063, 0,
          ],
        ],
        [
          4,
          [
            0, 0, 0.36780676281428204, -0.6046429215987722, -0.7727465308201459,
            0,
          ],
        ],
      ]),
    });
  });

  test("Rectangular Plate", () => {
    // Plate dimensions and material properties - matching analytical.py
    const a = 10.0; // m (length in x direction)
    const b = 10.0; // m (length in y direction)
    const h = 0.15; // m (thickness)
    const p0 = 1000.0; // N/m² (pressure)
    const E_x = 1.0e10; // Pa (Young's modulus in x direction)
    const E_y = 1.0e10; // Pa (Young's modulus in y direction)
    const nu_xy = 0.25; // Poisson's ratio
    const G_xy = (0.5 * E_x) / (1 + nu_xy); // = 4.0e9 Pa

    // Generate nodes in a 5x5 grid
    const meshNodes: Node[] = [];
    const numDivisions = 5;
    for (let j = 0; j < numDivisions; j++) {
      for (let i = 0; i < numDivisions; i++) {
        meshNodes.push([
          (i * a) / (numDivisions - 1),
          (j * b) / (numDivisions - 1),
          0,
        ]);
      }
    }

    // Generate triangular elements
    const meshElements: Element[] = [];
    for (let j = 0; j < numDivisions - 1; j++) {
      for (let i = 0; i < numDivisions - 1; i++) {
        // Calculate node indices for this grid cell
        const bottomLeft = j * numDivisions + i;
        const bottomRight = bottomLeft + 1;
        const topLeft = (j + 1) * numDivisions + i;
        const topRight = topLeft + 1;

        // Add two triangles for each grid cell
        meshElements.push([bottomLeft, bottomRight, topLeft]);
        meshElements.push([bottomRight, topRight, topLeft]);
      }
    }

    // Identify boundary nodes (nodes on the edges of the plate)
    const boundaryIndices: number[] = [];
    for (let i = 0; i < meshNodes.length; i++) {
      const [x, y] = meshNodes[i];
      if (x === 0 || x === a || y === 0 || y === b) {
        boundaryIndices.push(i);
      }
    }

    // Setup node inputs (supports and loads)
    const nodeInputs2: NodeInputs = {
      supports: new Map<
        number,
        [boolean, boolean, boolean, boolean, boolean, boolean]
      >(),
      loads: new Map<
        number,
        [number, number, number, number, number, number]
      >(),
    };

    // Apply fixed supports at boundary nodes
    boundaryIndices.forEach((i) => {
      nodeInputs2.supports!.set(i, [true, true, true, false, false, false]);
    });

    // Setup element inputs
    const elementInputs2: ElementInputs = {
      elasticities: new Map<number, number>(),
      elasticitiesOrthogonal: new Map<number, number>(),
      shearModuli: new Map<number, number>(),
      poissonsRatios: new Map<number, number>(),
      thicknesses: new Map<number, number>(),
    };

    // Apply material properties to all elements
    meshElements.forEach((_, i) => {
      elementInputs2.elasticities!.set(i, E_x);
      elementInputs2.elasticitiesOrthogonal!.set(i, E_y);
      elementInputs2.shearModuli!.set(i, G_xy);
      elementInputs2.poissonsRatios!.set(i, nu_xy);
      elementInputs2.thicknesses!.set(i, h);
    });

    // Run deformation analysis
    const deformOutputs = deform(
      meshNodes,
      meshElements,
      nodeInputs2,
      elementInputs2
    );

    // Calculate maximum displacement
    let maxZDisplacement = 0;
    deformOutputs!.deformations!.forEach((deformation) => {
      const dz = deformation[2]; // Z-axis displacement
      const absDz = Math.abs(dz);
      maxZDisplacement = Math.max(maxZDisplacement, absDz);
    });

    expect(maxZDisplacement * 1000).toBeCloseTo(13.541176, 6);
  });
});
