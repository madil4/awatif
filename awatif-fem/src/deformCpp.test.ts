import { Node, Element, NodeInputs, ElementInputs } from "./data-model";
import { deformCpp } from "./deformCpp";

describe("deformCpp", () => {
  test("Bar: from Logan's book example 3.9", () => {
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

    const deformOutputs = deformCpp(nodes, elements, nodeInputs, elementInputs);

    expect(deformOutputs).toEqual({
      deformations: new Map([
        [
          0,
          [
            0.001383724933236592, -0.000051566432467165236,
            0.000060150375939849595, 0, 0, 0,
          ],
        ],
        [1, [0, 0, 0, 0, 0, 0]],
        [2, [0, 0, 0, 0, 0, 0]],
        [3, [0, 0, 0, 0, 0, 0]],
      ]),
      reactions: new Map([
        [
          1,
          [-18.947368421052634, 4.736842105263158, 6.31578947368421, 0, 0, 0],
        ],
        [2, [0, 0, -4.210526315789472, 0, 0, 0]],
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

  test("Frame: from Logan's book example 5.8", () => {
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

    const deformOutputs = deformCpp(nodes, elements, nodeInputs, elementInputs);

    // Expected values (kept from original test for toBeCloseTo comparison)
    const expectedDeformations = new Map([
      [
        0,
        [
          0.0000017466534414748468, -0.00033564417271263484,
          -0.000056507877693047675, -0.003752156183061716,
          0.00001715470855495142, -0.00009935435371409366,
        ],
      ],
      [1, [0, 0, 0, 0, 0, 0]],
      [2, [0, 0, 0, 0, 0, 0]],
      [3, [0, 0, 0, 0, 0, 0]],
    ]);

    const expectedReactions = new Map([
      [
        1,
        [
          -873.3267207374234, 1299.1563606221894, 215.43623884405807,
          1801.0349678696236, -324.19036593091715, 1941.8793826628366,
        ],
      ],
      [
        2,
        [
          121.01672295760545, 30878.757283060415, 28253.938846523837,
          -26591.54681802802, 96.37583632116227, 47.69008978276496,
        ],
      ],
      [
        3,
        [
          752.309997779818, 167822.08635631742, -28469.3750853679,
          -23579.819070912377, -8.23426010637668, -622.4535653396727,
        ],
      ],
    ]);

    // Compare sizes first
    expect(deformOutputs.deformations.size).toEqual(expectedDeformations.size);
    expect(deformOutputs.reactions.size).toEqual(expectedReactions.size);

    // Compare deformations using toBeCloseTo
    deformOutputs.deformations.forEach((actualDef, nodeIndex) => {
      const expectedDef = expectedDeformations.get(nodeIndex);
      expect(expectedDef).toBeDefined(); // Ensure the node exists in expected
      actualDef.forEach((val, i) => {
        expect(val).toBeCloseTo(expectedDef[i], 8); // Use 8 decimal places for tolerance
      });
    });

    // Compare reactions using toBeCloseTo
    deformOutputs.reactions.forEach((actualReact, nodeIndex) => {
      const expectedReact = expectedReactions.get(nodeIndex);
      expect(expectedReact).toBeDefined(); // Ensure the node exists in expected
      actualReact.forEach((val, i) => {
        expect(val).toBeCloseTo(expectedReact[i], 8); // Use 8 decimal places for tolerance
      });
    });
  });

  test("Plate: Rectangular pin-supported plate with uniform load (analytical comparison)", () => {
    // Plate dimensions and material properties - matching analytical.py
    const a = 10.0; // m (length in x direction)
    const b = 10.0; // m (length in y direction)
    const h = 0.15; // m (thickness)
    const p0 = 1000.0; // N/m² (pressure)
    const E_x = 1.0e10; // Pa (Young's modulus in x direction)
    const E_y = 1.0e10; // Pa (Young's modulus in y direction)
    const nu_xy = 0.25; // Poisson's ratio
    const G_xy = (0.5 * E_x) / (1 + nu_xy); // = 4.0e9 Pa
    const support = [true, true, true, false, false, false];
    const numDivisions = 10;

    // Generate nodes in a numDivisions x numDivisions grid
    const meshNodes: Node[] = [];
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
      nodeInputs2.supports!.set(
        i,
        support as [boolean, boolean, boolean, boolean, boolean, boolean]
      );
    });

    // Process each element to calculate and apply equivalent nodal forces
    meshElements.forEach((element) => {
      // Get the three nodes of the triangle
      const [i, j, k] = element;
      const node1 = meshNodes[i];
      const node2 = meshNodes[j];
      const node3 = meshNodes[k];

      // Calculate the area of the triangle
      const area = calculateTriangleArea(node1, node2, node3);

      const transverseForce = (p0 * area) / 3;
      const existingLoad1 = nodeInputs2.loads!.get(i) || [0, 0, 0, 0, 0, 0];
      nodeInputs2.loads!.set(i, [
        existingLoad1[0],
        existingLoad1[1],
        existingLoad1[2] - transverseForce, // Negative for downward force
        existingLoad1[3],
        existingLoad1[4],
        existingLoad1[5],
      ] as [number, number, number, number, number, number]);

      // Node 2
      const existingLoad2 = nodeInputs2.loads!.get(j) || [0, 0, 0, 0, 0, 0];
      nodeInputs2.loads!.set(j, [
        existingLoad2[0],
        existingLoad2[1],
        existingLoad2[2] - transverseForce, // Negative for downward force
        existingLoad2[3],
        existingLoad2[4],
        existingLoad2[5],
      ] as [number, number, number, number, number, number]);

      // Node 3
      const existingLoad3 = nodeInputs2.loads!.get(k) || [0, 0, 0, 0, 0, 0];
      nodeInputs2.loads!.set(k, [
        existingLoad3[0],
        existingLoad3[1],
        existingLoad3[2] - transverseForce, // Negative for downward force
        existingLoad3[3],
        existingLoad3[4],
        existingLoad3[5],
      ] as [number, number, number, number, number, number]);
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
    const deformOutputs = deformCpp(
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

    expect(maxZDisplacement * 1000).toBeCloseTo(12.69, 3); // exact value is 13.541176 mm, error due to discretization

    // Utils
    function calculateTriangleArea(n1: Node, n2: Node, n3: Node): number {
      const a = [n2[0] - n1[0], n2[1] - n1[1], n2[2] - n1[2]];
      const b = [n3[0] - n1[0], n3[1] - n1[1], n3[2] - n1[2]];
      const cross = [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
      ];
      const norm = Math.sqrt(cross[0] ** 2 + cross[1] ** 2 + cross[2] ** 2);
      return norm / 2;
    }
  });
});
