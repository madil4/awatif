import { DesignOutput } from "../../../../design";


// @ts-ignore
export function filterConnectionTimberDesigns(outputs: DesignOutput[]): ConnectionTimberDesign[][] {
    return outputs
    // @ts-ignore
        .filter((item): item is DesignOutputNode => "connectionTimberDesign" in item)
        .map(item => item.connectionTimberDesign);
}

export function arrayToSet<T>(inputArray: T[]): T[] {
    // Create a set from the input array to remove duplicates
    const uniqueSet = new Set<T>(inputArray);

    // Convert the set back to an array and return
    return Array.from(uniqueSet);
}