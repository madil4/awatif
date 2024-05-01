import { roundToBase, effectiveNumber } from "./calcDistances";

export function calcPossibleFastener(
  height: number,
  fastenerDiameter: number,
  axialForce: number,
  distances: number[],
  F_vrd: number,
  sheetNo: number
): [number, number, number, number, number, number, number, number[]] {
  let [a1, a2, a3, a4, e1] = distances;

  let fastenerCheck: number = 2;
  let additionalFastener: number = 0;
  let noTotal: number = 0;
  let noTotalEffective: number = 0;
  let noAxial: number = 0;
  let noAxialEffective: number = 0;
  let noPerp: number = 0;
  let F_vrdTotal: number = 0;

  while (fastenerCheck > 0.8) {
    additionalFastener += 1;

    let noTotalReq: number =
      roundToBase(Math.abs(axialForce) / (F_vrd * (sheetNo * 2)), 1) +
      additionalFastener;
    let noPerpPos: number = Math.max(Math.floor((height - 2 * a4) / a2), 1);

    noPerp = noTotalReq < noPerpPos ? Math.max(3, noTotalReq) : noPerpPos;
    // noPerp = noPerpPos
    a4 = (height - a2 * (noPerp - 1)) / 2;
    // console.log("noTotalReq: ", noTotalReq)

    noAxial = Math.max(roundToBase(noTotalReq / noPerp, 1), 1);
    noAxialEffective = effectiveNumber(noAxial, a1, fastenerDiameter);

    noTotal = noPerp * noAxial;
    noTotalEffective = noAxialEffective * noPerp;

    F_vrdTotal = F_vrd * noTotalEffective * (sheetNo * 2);
    fastenerCheck = Math.abs(axialForce) / F_vrdTotal;
  }

  const sheetLength: number = e1 + a1 * noAxial + a3 * 2;

  return [
    noTotal,
    noTotalEffective,
    noAxial,
    noAxialEffective,
    noPerp,
    F_vrdTotal,
    fastenerCheck,
    [a1, a2, a3, a4, e1],
  ];
}
