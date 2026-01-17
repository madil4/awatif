import { describe, test, expect } from "vitest";
import { getPositions } from "./getPositions";
import { getDeformations } from "./getDeformations";
import type { Elements, Mesh, Nodes } from "../../data-model";

describe("deform", () => {
    test("Bar: from Logan's book example 3.9", () => {
        const nodes: Nodes = [
            [12, -3, -4],
            [0, 0, 0],
            [12, -3, -7],
            [14, 6, 0],
        ];
        const elements: Elements = [
            [1, 0],
            [2, 0],
            [3, 0],
        ];
        const supports: Mesh["supports"] = new Map([
            [1, [true, true, true, false, false, false]],
            [2, [true, true, true, false, false, false]],
            [3, [true, true, true, false, false, false]],
        ]);
        const loads: Mesh["loads"] = new Map([[0, [20, 0, 0, 0, 0, 0]]]);

        const elementsProps: Mesh["elementsProps"] = new Map(
            elements.map((_, i) => {
                return [i, { elasticity: 210e6, area: 10e-4 }];
            })
        );

        const positions = getPositions(
            nodes,
            elements,
            loads,
            supports,
            elementsProps
        );

        const deformations = getDeformations(
            nodes,
            positions
        );

        expect(deformations.length).toBe(nodes.length * 3);
        expect(deformations[0]).toBeCloseTo(0.001383724933236);
        expect(deformations[1]).toBeCloseTo(-0.00005156643246716524);
        expect(deformations[2]).toBeCloseTo(0.00006015037593984961);
    });

    test("Frame: from Logan's book example 5.8", () => {
        const nodes: Nodes = [
            [2.5, 0, 0],
            [0, 0, 0],
            [2.5, 0, -2.5],
            [2.5, -2.5, 0],
        ];
        const elements: Elements = [
            [1, 0],
            [2, 0],
            [3, 0],
        ];
        const supports: Mesh["supports"] = new Map([
            [1, [true, true, true, true, true, true]],
            [2, [true, true, true, true, true, true]],
            [3, [true, true, true, true, true, true]],
        ]);
        const loads: Mesh["loads"] = new Map([[0, [0, -200e3, 0, -100e3, 0, 0]]]);

        const elementsProps: Mesh["elementsProps"] = new Map(
            elements.map((_, i) => {
                return [
                    i,
                    {
                        elasticity: 200e9,
                        shearModulus: 60e9,
                        momentOfInertia: 40e-6,
                        torsionalConstant: 20e-6,
                        area: 6.25e-3,
                    },
                ];
            })
        );

        const positions = getPositions(
            nodes,
            elements,
            loads,
            supports,
            elementsProps
        );

        const deformations = getDeformations(
            nodes,
            positions
        )

        expect(deformations[0]).toBeCloseTo(0.0000017466534414748466, 10);
        expect(deformations[1]).toBeCloseTo(-0.0003356441727126348);
        expect(deformations[2]).toBeCloseTo(-0.00005650787769304768);
    });

    test("Cantilever beam: 6m cantilever beam with point load", () => {
        const nodes: Nodes = [
            [0, 0, 0],
            [1, 0, 0],
            [2, 0, 0],
            [3, 0, 0],
            [4, 0, 0],
            [5, 0, 0],
            [6, 0, 0],
        ];
        const elements: Elements = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
        ];
        const supports: Mesh["supports"] = new Map([
            [0, [true, true, true, true, true, true]],
        ]);
        const loads: Mesh["loads"] = new Map([[6, [0, 0, -1e3, 0, 0, 0]]]);

        const elementsProps: Mesh["elementsProps"] = new Map(
            elements.map((_, i) => {
                return [
                    i,
                    {
                        elasticity: 200e9,
                        shearModulus: 76923.08e6,
                        momentOfInertia: 8333333e-12,
                        torsionalConstant: 14083333e-12,
                        area: 10000e-6,
                    },
                ];
            })
        );

        const positions = getPositions(
            nodes,
            elements,
            loads,
            supports,
            elementsProps
        );

        const deformations = getDeformations(
            nodes,
            positions
        )

        console.log('Actual deformations:', deformations);

        expect(deformations[2]).toBeCloseTo(0);
        expect(deformations[2 + 1 * 3]).toBeCloseTo(-0.0017, 5);
        expect(deformations[2 + 2 * 3]).toBeCloseTo(-0.0064, 5)
        expect(deformations[2 + 3 * 3]).toBeCloseTo(-0.0135, 5);
        expect(deformations[2 + 4 * 3]).toBeCloseTo(-0.0224, 5);
        expect(deformations[2 + 5 * 3]).toBeCloseTo(-0.0325, 5);
        expect(deformations[2 + 6 * 3]).toBeCloseTo(-0.0432, 5);
    });
});
