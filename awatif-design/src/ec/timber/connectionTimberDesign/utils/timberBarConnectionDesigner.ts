import { getKmod } from "./getMaterialProperties";
import { getDistances } from "./calcDistances";
import { characteristicValues, shearCapacity } from "./calcFastenerCapacity";
import {
  checkNoSheets,
  calcAxialMemberCheck,
  blockFailureCheckAxial,
} from "./calcChecks";
import {
  TimberBarConnectionDesignerLocalInput,
  TimberBarConnectionDesignerOutput,
} from "./types";
import { calcPossibleFastener } from "./calcPossibleFastener";
import { calcStability } from "./calcStability";
import { calcFastenerCoordinates } from "./calcCordinates";

// connectionDesignerOutput = timberBarConnectionDesigner( connectionDesignerInput )
export function timberBarConnectionDesigner(
  timberBarConnectionDesignerLocalInput: TimberBarConnectionDesignerLocalInput
): TimberBarConnectionDesignerOutput {
  // Extract input properties from connectionDesignerInput
  // let { serviceClass, loadDurationClass, element, timberGrade, width, height, axialForce, fastenerGrade, fastenerDiameter, sheetGrade, sheetThickness, sheetNo, beamAngle } = timberBarConnectionDesignerInput;
  let {
    serviceClass,
    loadDurationClass,
    element,
    elementLength,
    timberGrade,
    width,
    height,
    axialForce,
    fastenerGrade,
    fastenerDiameter,
    sheetGrade,
    sheetThickness,
    sheetNo,
    beamAngle,
  } = timberBarConnectionDesignerLocalInput;
  // console.log("serviceClass, loadDurationClass, beam, timberGrade, width, height, axialForce, fastenerGrade, fastenerDiameter, sheetGrade, sheetThickness, sheetNo, beamAngle", serviceClass, loadDurationClass, element, timberGrade, width, height, axialForce, fastenerGrade, fastenerDiameter, sheetGrade, sheetThickness, sheetNo, beamAngle)

  // 0 - General
  const thickness: number = width / 2;

  // 1 - Function to get modification factor
  const [kMod, gamma, chi] = getKmod(serviceClass, loadDurationClass);
  // console.log("kMod, gamma, chi: ", kMod, gamma, chi)

  // 2 - Function to get modification factor
  const [minDistancesListTimber, minDistancesListSteel, distancesListRequired] =
    getDistances(fastenerDiameter);
  // console.log("minDistancesListTimber, minDistancesListSteel, distancesListRequired: ", minDistancesListTimber, minDistancesListSteel, distancesListRequired)

  // 3 - calc fastener properties
  const [f_ub, M_yrk, f_h0k, f_halphak] = characteristicValues(
    fastenerDiameter,
    timberGrade,
    fastenerGrade,
    0
  );
  // console.log("f_ub, M_yrk, f_h0k, f_halphak: ", f_ub, M_yrk, f_h0k, f_halphak)

  // 4 - calc fastener caacity
  const [
    F_vrd,
    F_vrd1,
    F_vrd2,
    F_vrk1,
    F_vrk2,
    F_vrkf,
    F_vrkg,
    F_vrkh,
    F_vrkl,
    F_vrkm,
  ] = shearCapacity(
    fastenerDiameter,
    thickness,
    timberGrade,
    fastenerGrade,
    0,
    chi
  );
  // console.log("F_vrd, F_vrd1, F_vrd2, F_vrk1, F_vrk2, F_vrkf, F_vrkg, F_vrkh, F_vrkl, F_vrkm: ", F_vrd, F_vrd1, F_vrd2, F_vrk1, F_vrk2, F_vrkf, F_vrkg, F_vrkh, F_vrkl, F_vrkm)

  // 5 - calc possible fastener
  const [
    noTotal,
    noTotalEffective,
    noAxial,
    noAxialEffective,
    noPerp,
    F_vrdTotal,
    etaFastenerCheck,
    distances,
    sheetLength,
  ] = calcPossibleFastener(
    height,
    fastenerDiameter,
    axialForce,
    distancesListRequired,
    F_vrd,
    sheetNo
  );
  // console.log("noTotal, noTotalEffective, noAxial, noAxialEffective, noPerp, F_vrdTotal, fastenerCheck, distances: ", noTotal, noTotalEffective, noAxial, noAxialEffective, noPerp, F_vrdTotal, fastenerCheck, distances)

  // 6 - number of sheets
  sheetNo = checkNoSheets(noAxial, sheetNo);
  // console.log("sheetNo: ", sheetNo)

  // 7 - recalculate fastener capacity
  const [
    F_vrdNew,
    F_vrd1New,
    F_vrd2New,
    F_vrk1New,
    F_vrk2New,
    F_vrkfNew,
    F_vrkgNew,
    F_vrkhNew,
    F_vrklNew,
    F_vrkmNew,
  ] = shearCapacity(
    fastenerDiameter,
    thickness,
    timberGrade,
    fastenerGrade,
    0,
    chi
  );
  // console.log("F_vrdNew, F_vrd1New, F_vrd2New, F_vrk1New, F_vrk2New, F_vrkfNew, F_vrkgNew, F_vrkhNew, F_vrklNew, F_vrkmNew: ", F_vrdNew, F_vrd1New, F_vrd2New, F_vrk1New, F_vrk2New, F_vrkfNew, F_vrkgNew, F_vrkhNew, F_vrklNew, F_vrkmNew)

  // 8 - recalc possible fastener
  const [
    noTotalNew,
    noTotalEffectiveNew,
    noAxialNew,
    noAxialEffectiveNew,
    noPerpNew,
    F_vrdTotalNew,
    etaFastenerCheckNew,
    distancesFinal,
    sheetLengthNew,
  ] = calcPossibleFastener(
    height,
    fastenerDiameter,
    axialForce,
    distancesListRequired,
    F_vrdNew,
    sheetNo
  );
  // console.log("noTotalNew, noTotalEffectiveNew, noAxialNew, noAxialEffectiveNew, noPerpNew, F_vrdTotalNew, fastenerCheckNew, distancesFinal: ", noTotalNew, noTotalEffectiveNew, noAxialNew, noAxialEffectiveNew, noPerpNew, F_vrdTotalNew, fastenerCheckNew, distancesFinal)
  // console.log("sheetLengthNew", sheetLengthNew)

  const [coordinatesX, coordinatesY] = calcFastenerCoordinates(
    distancesFinal,
    beamAngle,
    height,
    noAxialNew,
    noPerpNew
  );
  // console.log("element:", element ,"coordinatesX, coordinatesY: ", coordinatesX, coordinatesY)

  // 9 - axial member check
  const [A_net, f_ct0k, f_ctd, force, sigma_ct0d, befct, etaAxialCheck] =
    calcAxialMemberCheck(
      width,
      height,
      noPerpNew,
      fastenerDiameter,
      axialForce,
      timberGrade,
      sheetNo,
      chi,
      sheetThickness
    );
  // console.log("A_net, f_ct0k, f_ctd, force, sigma_ct0d, befct, etaAxialCheck: ", A_net, f_ct0k, f_ctd, force, sigma_ct0d, befct, etaAxialCheck)

  // 10 - block faiure
  const [Lh, Lv, Ant, Anv, VeffRd, etaBlockFailure] = blockFailureCheckAxial(
    fastenerGrade,
    noPerpNew,
    noAxialNew,
    fastenerDiameter,
    sheetThickness,
    distancesFinal,
    axialForce,
    sheetNo
  );
  // console.log("Lh, Lv, Ant, Anv, VeffRd, etaBlockFailure: ", Lh, Lv, Ant, Anv, VeffRd, etaBlockFailure)

  // 11 - stability
  const [
    L_lamb,
    L_lamb_rel,
    lamb_relm,
    L_ky,
    L_kc,
    k_crit,
    L_sigma_md,
    L_eta,
    nw,
    L_eta123,
    etaStability,
  ] = calcStability(timberGrade, elementLength, width, height, axialForce, chi);
  // console.log("L_lamb, L_lamb_rel, lamb_relm, L_ky, L_kc, k_crit, L_sigma_md, L_eta, nw, L_eta123: ", L_lamb, L_lamb_rel, lamb_relm, L_ky, L_kc, k_crit, L_sigma_md, L_eta, nw, L_eta123)

  // Define the output object
  const connectionDesignerOutput: TimberBarConnectionDesignerOutput = {
    element: element,
    beamAngle: beamAngle,
    kMod: kMod,
    gamma: gamma,
    chi: chi,
    minDistancesListTimber: minDistancesListTimber,
    minDistancesListSteel: minDistancesListSteel,
    distancesListRequired: distancesListRequired,
    coordinatesX: coordinatesX,
    coordinatesY: coordinatesY,
    fub: f_ub,
    Myrk: M_yrk,
    fh0k: f_h0k,
    fhalphak: f_halphak,
    Fvrd: F_vrd,
    Fvrd_1: F_vrd1,
    Fvrd_2: F_vrd2,
    Fvrk_1: F_vrk1,
    Fvrk_2: F_vrk2,
    Fvrk_f: F_vrkf,
    Fvrk_g: F_vrkg,
    Fvrk_h: F_vrkh,
    Fvrk_l: F_vrkl,
    Fvrk_m: F_vrkm,
    sheetNo: sheetNo,
    sheetLength: sheetLengthNew,
    noTotal: noTotal,
    noTotalEffective: noTotalEffective,
    noAxial: noAxial,
    noAxialEffective: noAxialEffective,
    noPerp: noPerp,
    FvrdTotal: F_vrdTotal,
    etaFastenerCheck: etaFastenerCheckNew,
    distancesFinal: distancesFinal,
    Anet: A_net,
    fct0k: f_ct0k,
    fctd: f_ctd,
    force: force,
    sigmact0d: sigma_ct0d,
    befct: befct,
    etaAxialCheck: etaAxialCheck,
    Lh: Lh,
    Lv: Lv,
    Ant: Ant,
    Anv: Anv,
    VeffRd: VeffRd,
    etaBlockFailure: etaBlockFailure,
    L_lamb: L_lamb,
    L_lamb_rel: L_lamb_rel,
    lamb_relm: lamb_relm,
    L_ky: L_ky,
    L_kc: L_kc,
    k_crit: k_crit,
    L_sigma_md: L_sigma_md,
    L_eta: L_eta,
    nw: nw,
    L_eta123: L_eta123,
    etaStability: etaStability,
  };

  return connectionDesignerOutput;
}
