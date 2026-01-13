import { subtract, dot, norm, multiply } from "mathjs";
import type { Mesh, Nodes, Elements } from "../../data-model";

export function getRotations(
    nodes: Nodes,
    elements: Elements,
    positions: NonNullable<Mesh["positions"]>
): number[] {
    const rotations: number[] = [];

    nodes.forEach((node, nodeIndex) => {
        const connectedElements = elements.filter((element) => element.includes(nodeIndex));

        let totalRotX = 0;
        let totalRotY = 0;
        let totalRotZ = 0;

        connectedElements.forEach((element) => {
            // Find the neighbor node in this element
            const neighborIndex = element[0] === nodeIndex ? element[1] : element[0];
            const neighbor = nodes[neighborIndex];

            // Calculate original directional vector (undeformed)
            const originalVector = subtract(neighbor, node) as [number, number, number];

            // Calculate deformed directional vector
            const deformedNode = getNodePosition(positions, nodeIndex);
            const deformedNeighbor = getNodePosition(positions, neighborIndex);
            const deformedVector = subtract(deformedNeighbor, deformedNode) as [number, number, number];

            // Calculate rotation angles on each plane
            const { rotX, rotY, rotZ } = calculateRotationAngles(originalVector, deformedVector);

            totalRotX += rotX;
            totalRotY += rotY;
            totalRotZ += rotZ;
        });

        rotations.push(totalRotX, totalRotY, totalRotZ);
    });

    return rotations;
}

function getNodePosition(positions: number[], nodeIndex: number): [number, number, number] {
    const offset = nodeIndex * 3;
    return [positions[offset], positions[offset + 1], positions[offset + 2]];
}

function projectToPlane(vector: [number, number, number], axis1: number, axis2: number): [number, number] {
    return [vector[axis1], vector[axis2]];
}

function calculateAngleBetweenVectors(vector1: [number, number], vector2: [number, number]): number {
    const norm1 = norm(vector1) as number;
    const norm2 = norm(vector2) as number;

    if (norm1 === 0 || norm2 === 0) {
        return 0;
    }

    const cosineAngle = dot(vector1, vector2) / (multiply(norm1, norm2) as number);
    return Math.acos(cosineAngle);
}

function calculateRotationAngles(
    originalVector: [number, number, number],
    deformedVector: [number, number, number]
): { rotX: number; rotY: number; rotZ: number } {
    // XY plane (rotation around Z-axis)
    const angleXY = calculateAngleBetweenVectors(
        projectToPlane(originalVector, 0, 1),
        projectToPlane(deformedVector, 0, 1)
    );

    // XZ plane (rotation around Y-axis)
    const angleXZ = calculateAngleBetweenVectors(
        projectToPlane(originalVector, 0, 2),
        projectToPlane(deformedVector, 0, 2)
    );

    // YZ plane (rotation around X-axis)
    const angleYZ = calculateAngleBetweenVectors(
        projectToPlane(originalVector, 1, 2),
        projectToPlane(deformedVector, 1, 2)
    );

    return {
        rotX: angleYZ,
        rotY: angleXZ,
        rotZ: angleXY,
    };
}