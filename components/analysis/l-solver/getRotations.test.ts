import { describe, test, expect } from "vitest";
import { getPositions } from "./getPositions";
import { getRotations } from "./getRotations";
import type { Elements, Mesh, Nodes } from "../../data-model";

describe("rotation", () => {
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

        const rotations = getRotations(
            nodes,
            elements,
            positions
        );

        expect(rotations.length).toBe(nodes.length * 3);
        expect(rotations[0]).toBeCloseTo(0.0);
        expect(rotations[1]).toBeCloseTo(0.0);
        expect(rotations[2]).toBeCloseTo(0.0);
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

        const rotations = getRotations(
            nodes,
            elements,
            positions
        )

        expect(rotations[0]).toBeCloseTo(-0.003752156183061716);
        expect(rotations[1]).toBeCloseTo(0.000017154708554951422);
        expect(rotations[2]).toBeCloseTo(-0.00009935435371409363);
    });
});
