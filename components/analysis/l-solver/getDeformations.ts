import { getPositions } from "./getPositions";
import { Mesh, Nodes } from "../../data-model";
import { subtract } from "mathjs";

export function getDeformations(
    nodes: Nodes,
    positions: NonNullable<Mesh["positions"]>
): number[] {
    const originalPositions = nodes.flat();
    const deformations = subtract(positions, originalPositions);

    return deformations;
}