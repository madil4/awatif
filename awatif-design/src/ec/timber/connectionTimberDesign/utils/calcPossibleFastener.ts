import { roundToBase, effectiveNumber } from './calcDistances';

export function calcPossibleFastener(height: number, fastenerDiameter: number, axialForce: number, distances: number[], F_vrd: number, sheetNo: number): [number, number, number, number, number, number, number, number[], number] {
    let [a1, a2, a3, a4, e1] = distances; 
    // console.log("distances", distances)

    let additionalFastener = 0;
    let fastenerCheck = 1; // Initially high to enter the loop
    let noTotalReq, noPerpPos, noPerp, noAxial = 0, noAxialEffective, noTotal = 0, noTotalEffective = 0, F_vrdTotal = 0, sheetLength = 0;

    // while (true) {
    // additionalFastener += 1;
    noTotalReq = roundToBase(Math.abs(axialForce) / (F_vrd * (sheetNo * 2)), 1);
    noPerpPos = Math.floor(((height - 2 * a4) / a2) * 0.8);
    // noPerpPos = 5
    // noPerp = noTotalReq < noPerpPos ? Math.max(3, noTotalReq) : noPerpPos;
    a4 = (height - a2 * (noPerpPos - 1)) / 2;
    noAxial = roundToBase((noTotalReq / noPerpPos) + 2, 1);
    // noAxial = 5;
    noAxialEffective = effectiveNumber(noAxial, a1, fastenerDiameter);
    noTotal = noPerpPos * noAxial;
    noTotalEffective = noAxialEffective * noPerpPos;
    F_vrdTotal = F_vrd * noTotalEffective * (sheetNo * 2);
    fastenerCheck = Math.abs(axialForce) / F_vrdTotal;
    sheetLength = a1 * noAxial + a3 * 2;
    // console.log("noTotalReq", noTotalReq, "noPerpPos", noPerpPos, "noAxial", noAxial, "fastenerCheck", fastenerCheck)

    // console.log("sheetLength", sheetLength)

    //    if (fastenerCheck < 0.95) {
            // Calculate sheet length when condition is met
            // sheetLength = e1 + a1 * noAxial + a3 * 2;
      //      break; // Exit loop when condition is met
       // }
    //}
    // console.log("sheetLength2", sheetLength)

    return [noTotal, noTotalEffective, noAxial, noAxialEffective, noPerpPos, F_vrdTotal, fastenerCheck, [a1, a2, a3, a4, e1], sheetLength];
}
