// Importing pandas module
// Note: In TypeScript, we don't have direct support for pandas like in Python.
// You might need to find alternative ways to handle data manipulation in TypeScript.
// For simplicity, let's assume the data is in a format that can be accessed directly.


// Function to get steel tensile strength
export function getTensileStrength(steelGrade: string): [number, number] {
    // Define steel parameters
    const steelGrades: string[] = ["S235", "S275", "S355"];
    const tensileStrengths: number[] = [360, 430, 490];
    const yieldStrengths: number[] = [235, 275, 355];

    // Find the index of the grade
    const index: number = steelGrades.indexOf(steelGrade);

    // Access the tensile strength from the list
    const fu: number = tensileStrengths[index];
    const fy: number = yieldStrengths[index];

    return [fu, fy];
}


// Function to get timber density
export function getTimberProperties(grade: string): [string, number, number, number, number, number, number, number, number, number, number] {
    // Define timber parameters
    const LGrades: string[] = ["GL20c", "GL22c", "GL24c", "GL26c", "GL28c", "GL30c", "GL32c", "GL20h", "GL22h", "GL24h", "GL26h", "GL28h", "GL30h", "GL32h"];
    const LRhok: number[] = [355, 355, 365, 385, 390, 390, 400, 340, 370, 385, 405, 425, 430, 440];
    const LFmk: number[] = [20, 22, 24, 26, 28, 30, 32, 20, 22, 24, 26, 28, 30, 32];
    const LFT0k: number[] = [15, 16, 17, 19, 19.5, 19.5, 19.5, 16, 17.6, 19.2, 20.8, 22.3, 24, 25.6];
    const LFT90k: number[] = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
    const LFC0k: number[] = [18.5, 20, 21.5, 23.5, 24, 24.5, 24.5, 20, 22, 24, 26, 28, 30, 32];
    const LFC90k: number[] = [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5];
    const LFvk: number[] = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];
    const LE0mean: number[] = [10400, 10400, 11000, 12000, 12500, 13000, 13500, 8400, 10500, 11500, 12100, 12600, 13600, 14200];
    const LE05: number[] = [8600, 8600, 9100, 10000, 10400, 10800, 11200, 7000, 8800, 9860, 10100, 10500, 11300, 11800];
    const LG05: number[] = [540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540, 540];

    // Find the index of the grade
    const index: number = LGrades.indexOf(grade);

    // Access the properties from the lists
    const rhoK: number = LRhok[index];
    const fMyk: number = LFmk[index];
    const fC0k: number = LFC0k[index];
    const fT0k: number = LFT0k[index];
    const fT90k: number = LFT90k[index];
    const fC90k: number = LFC90k[index];
    const fVk: number = LFvk[index];
    const E0mean: number = LE0mean[index];
    const E05: number = LE05[index];
    const G05: number = LG05[index];

    return [grade, rhoK, fMyk, fC0k, fT0k, fT90k, fC90k, fVk, E0mean, E05, G05];
}


/// Function to get modification factor
export function getKmod(serviceClass: number, loadDurationClass: string): [number, number, number] {
    
    // Define the modification factor lookup table as an object
    const kModLookup: { [key: number]: { [key: string]: number } } = {
        1: {
            "permanent": 0.8,
            "medium-term": 0.9,
            "short-term": 1.0
        },
        2: {
            "permanent": 0.7,
            "medium-term": 0.8,
            "short-term": 0.9
        },
        3: {
            "permanent": 0.6,
            "medium-term": 0.7,
            "short-term": 0.8
        }
    };

    // Look up the modification factor
    const kMod: number = kModLookup[serviceClass][loadDurationClass];

    // Calculate gamma and chi
    const gamma: number = 1.3;
    const chi: number = Math.round(kMod / gamma * 1000) / 1000;

    return [kMod, gamma, chi];
}


