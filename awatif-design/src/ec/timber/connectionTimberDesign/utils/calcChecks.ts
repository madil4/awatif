import { getTimberProperties, getTensileStrength } from './getMaterialProperties';  // Importing functions for material properties (assuming they are defined elsewhere)
import { sqrt } from 'mathjs';  // Import square root function


// Function to check shear member utilization
export function tensionMemberCheck(thickness: number, height: number, noPerpendicular: number, diameter: number, tensionForce: number, timberGrade: string, noSheet: number, chi: number, thicknessSheet: number): [number, number, number, number, number, number, number] {
    // Get glulam properties
    const [grade, rho_k, f_myk, f_c0k, f_t0k, f_t90k, f_c90k, f_vk, E_0mean, E_05, G_05] = getTimberProperties(timberGrade);
    
    // Calculate design shear resistance
    const k_t: number = 0.4;
    const f_td: number = Math.round(f_t0k * chi * k_t * 100) / 100;

    // Effective length factor
    const b_ef: number = thickness - thicknessSheet * 0.5 * Math.min(noSheet, 2);

    // Calculate net area
    const A_net: number = height * b_ef - noPerpendicular * diameter * b_ef;

    // Calculate force
    tensionForce = tensionForce / 2;

    // Calculate stress
    const sigma_t0d: number = Math.round((tensionForce) / A_net * 1000 * 100) / 100;
    
    // Calculate utilization ratio
    const eta: number = Math.round(sigma_t0d / f_td * 100) / 100;
    
    return [A_net, f_t0k, f_td, tensionForce, sigma_t0d, Math.round(b_ef * 100) / 100, eta];
}


// Function to check shear member utilization
export function compressionMemberCheck(thickness: number, height: number, noPerpendicular: number, diameter: number, compressionForce: number, timberGrade: string, noSheet: number, chi: number, thicknessSheet: number): [number, number, number, number, number, number, number] {
    // Get glulam properties
    const [grade, rho_k, f_myk, f_c0k, f_t0k, f_t90k, f_c90k, f_vk, E_0mean, E_05, G_05] = getTimberProperties(timberGrade);
    
    // Calculate design shear resistance
    const f_cd: number = Math.round(f_c0k * chi * 100) / 100;

    // Effective length factor
    const k_t: number = 1;
    const b_ef: number = thickness - thicknessSheet * 0.5 * Math.min(noSheet, 2);

    // Calculate net area
    const A_net: number = height * b_ef;

    // Calculate force
    compressionForce = Math.abs(compressionForce / 2);
    
    // Calculate shear stress
    const sigma_c0d: number = Math.round(compressionForce / A_net * 1000 * 100) / 100;
    
    // Calculate utilization ratio
    const eta: number = Math.round(sigma_c0d / f_cd * 100) / 100;
    
    return [A_net, f_c0k, f_cd, compressionForce, sigma_c0d, Math.round(b_ef * 100) / 100, eta];
}


// Function to check shear block failure
export function blockFailureCheckAxial(steelGrade: string, noPerp: number, noAxial: number, diameter: number, thickness: number, distancesFinal: number[], axialForce: number, noSheet: number): [number, number, number, number, number, number] {

    const d0: number = diameter + 0.6;
    thickness = thickness;
    // Get tensile and yield strength of steel
    const [f_u, f_y] = getTensileStrength(steelGrade);
    
    // Calculate lengths
    const a1: number = distancesFinal[0];
    const a2: number = distancesFinal[1];
    const e1: number = distancesFinal[4];

    const Lh: number = a2 * (noPerp - 1);
    const Lv: number = a1 * (noAxial - 1) + e1;

    // Calculate effective areas
    const Ant: number = (Lh - (noPerp - 1) * d0) * thickness * noSheet;
    const Anv: number = 2 * (Lv - (noAxial - 0.5) * d0 ) * thickness * noSheet;
    
    // Calculate design shear resistance
    const V_eff1Rd: number = Math.round(((f_u * Ant) / 1.25 + (f_y * Anv) / (Math.sqrt(3) * 1)) / 1000 * 100) / 100;
    
    // Calculate utilization ratio
    const eta: number = Math.round(Math.abs(axialForce) / V_eff1Rd * 100) / 100;

    return [Lh, Lv, Ant, Anv, V_eff1Rd, eta];
}


// check no of sheets
export function checkNoSheets(noAxial: number, sheetNo: number): number {

    let test: number = 0;
    if (noAxial >= 4) {
        test = 1;
    
        if (test == 1) {
            sheetNo = 2;
        } else {
            const a: number = 2;
        }
    }
    
    return sheetNo;
}


// calculate max eta
export function getEtaMax(ClassList: any[]): number[] {

    const fastenerCheckList: number[] = [];
    const tensionMemberCheckList: number[] = [];
    const compressionMemberList: number[] = [];
    const axialBlockFailureList: number[] = [];

    for (const beam of ClassList) {

        // checks
        fastenerCheckList.push(beam.fastenerCheck);
        tensionMemberCheckList.push(beam.tensionMemberCheck );
        compressionMemberList.push(beam.compressionMemberCheck );
        axialBlockFailureList.push(beam.axialBlockFailureCheck );
    }

    const fastenerCheckMax: number = Math.max(...fastenerCheckList);
    const tensionMemberCheckMax: number = Math.max(...tensionMemberCheckList);
    const compressionMemberMax: number = Math.max(...compressionMemberList);
    const axialBlockFailureMax: number = Math.max(...axialBlockFailureList);

    const fastenerCheckMaxIndex: number = fastenerCheckList.indexOf(fastenerCheckMax);
    const tensionMemberCheckMaxIndex: number = tensionMemberCheckList.indexOf(tensionMemberCheckMax);
    const compressionMemberMaxIndex: number = compressionMemberList.indexOf(compressionMemberMax);
    const axialBlockFailureMaxIndex: number = axialBlockFailureList.indexOf(axialBlockFailureMax);

    return [fastenerCheckMax, tensionMemberCheckMax, compressionMemberMax, axialBlockFailureMax, fastenerCheckMaxIndex, tensionMemberCheckMaxIndex, compressionMemberMaxIndex, axialBlockFailureMaxIndex];
}


export function calcAxialMemberCheck(width: number, height: number, noPerp: number, fastenerDiameter: number, axialForce: number, timberGrade: string, sheetNo: number, chi: number, sheetThickness: number): [number, number, number, number, number, number, number] {

    let A_net: number, f_ct0k: number, f_ctd: number, Force: number, sigma_ct0d: number, befct: number, eta: number;

    if (axialForce > 0) {

        [A_net, f_ct0k, f_ctd, Force, sigma_ct0d, befct, eta] = tensionMemberCheck(width, height, noPerp, fastenerDiameter, axialForce, timberGrade, sheetNo, chi, sheetThickness);
    
    } else {

        [A_net, f_ct0k, f_ctd, Force, sigma_ct0d, befct, eta] = compressionMemberCheck(width, height, noPerp, fastenerDiameter, axialForce, timberGrade, sheetNo, chi, sheetThickness);
    }
    
    return [A_net, f_ct0k, f_ctd, Force, sigma_ct0d, befct, eta];
}
