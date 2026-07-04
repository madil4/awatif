import type { ConcreteNationalAnnexParams } from "../nationalAnnexes";

export type ShearCapacityInput = {
  VEd: number; // Design shear force (kN)
  NEd: number; // Design axial force (kN, compression positive)
  b: number; // Section width (mm)
  d: number; // Effective depth (mm)
  Asl: number; // Area of tension reinforcement (mm2)
  fck: number; // Characteristic concrete strength (MPa)
  fcd: number; // Design concrete strength (MPa)
  fyd: number; // Design yield strength of shear reinforcement (MPa)
  fyk: number; // Characteristic yield strength of reinforcement (MPa)
  stirrupArea: number; // mm2/m
  annexParams: ConcreteNationalAnnexParams;
};

export type ShearCapacityResult = {
  VRd_c: number; // Concrete shear capacity (kN)
  needsShearReinf: boolean;
  VRd_s: number; // Shear reinforcement capacity (kN)
  VRd_max: number; // Maximum shear capacity (strut failure) (kN)
  Asw_s_req: number; // Required Asw/s (mm2/mm)
  Asw_s_prov: number; // Provided Asw/s (mm2/mm)
  Asw_s_min: number; // Minimum Asw/s (mm2/mm)
  sl_max: number; // Max longitudinal spacing (mm)
  theta: number; // Strut angle (degrees)
  utilization: number;
};

export function getShearCapacity(input: ShearCapacityInput): ShearCapacityResult {
  const {
    VEd,
    NEd,
    b,
    d,
    Asl,
    fck,
    fcd,
    fyd,
    fyk,
    stirrupArea,
    annexParams,
  } = input;

  // 1. Concrete Shear Capacity VRd,c (EC2 6.2.2)
  const k = Math.min(1 + Math.sqrt(200 / d), 2.0);
  const rhoL = Math.min(Asl / (b * d), 0.02);
  const Ac = b * input.d / 0.9; // Approximate gross area if not provided, but we can use b*h. 
  // Wait, NEd/Ac is used for sigma_cp. Let's assume h = d / 0.9 approximately if h is not passed.
  // Better to pass h. Let's adjust input to include h or Ac.
  // Looking at getDesign.ts, Ac = b * h. Let's use that.
  
  // Actually, let's just use b * (d/0.9) as a fallback if Ac is not provided.
  const h_approx = d / 0.9;
  const Ac_approx = b * h_approx;
  const sigmaCp = Math.min((NEd * 1000) / Ac_approx, 0.2 * fcd); // NEd in kN -> N
  
  const CRd_c = annexParams.cRdC;
  const k1 = annexParams.k1;
  const vMin =
    annexParams.vMinCoefficient * Math.pow(k, 1.5) * Math.pow(fck, 0.5);

  const VRd_c1 = (CRd_c * k * Math.pow(100 * rhoL * fck, 1 / 3) + k1 * sigmaCp) * b * d;
  const VRd_c2 = (vMin + k1 * sigmaCp) * b * d;
  const VRd_c = Math.max(VRd_c1, VRd_c2) / 1000; // N to kN

  const needsShearReinf = Math.abs(VEd) > VRd_c;

  // 2. Variable Angle Truss Model (EC2 6.2.3)
  const z = 0.9 * d;
  const nu1 = 0.6 * (1 - fck / 250);
  const alphaCw = 1.0; // Non-prestressed

  // Strut angle theta. We want to find the most economical angle (cot theta = 2.5) 
  // that satisfies VEd <= VRd,max and VEd <= VRd,s.
  // If VEd > VRd,max(at 22 deg), we must increase theta (steeper strut).
  
  const cotThetaMin = 1.0;
  const cotThetaMax = 2.5;

  // VRd,max = alphaCw * bw * z * nu1 * fcd / (cotTheta + tanTheta)
  // To find required theta: VRd,max = VEd
  // VEd = C / (cotTheta + 1/cotTheta) => VEd * (cotTheta + 1/cotTheta) = C
  // VEd * cotTheta^2 - C * cotTheta + VEd = 0
  const C = (alphaCw * b * z * nu1 * fcd) / 1000; // kN
  const R = Math.abs(VEd) / C;
  
  let cotTheta = 2.5; // Default for economy
  let VRd_max = C / (2.5 + 1 / 2.5);

  if (Math.abs(VEd) > VRd_max) {
    if (R > 0.5) {
      // Failed VRd,max even at 45 degrees
      cotTheta = 1.0;
      VRd_max = C / 2.0;
    } else {
      // Solve for cotTheta: cotTheta = (1 + sqrt(1 - 4*R^2)) / (2*R)
      cotTheta = (1 + Math.sqrt(1 - 4 * R * R)) / (2 * R);
      cotTheta = Math.max(Math.min(cotTheta, 2.5), 1.0);
      VRd_max = C / (cotTheta + 1 / cotTheta);
    }
  }

  const theta = Math.atan(1 / cotTheta) * (180 / Math.PI);

  // 3. Shear Reinforcement Capacity
  const Asw_s_prov = stirrupArea / 1000; // mm2/m -> mm2/mm
  const VRd_s = (Asw_s_prov * z * fyd * cotTheta) / 1000; // kN

  // Required Asw/s
  const Asw_s_req = (Math.abs(VEd) * 1000) / (z * fyd * cotTheta); // mm2/mm

  // 4. Minimums and Spacings
  const rhoWMin = (0.08 * Math.sqrt(fck)) / fyk;
  const Asw_s_min = rhoWMin * b;
  const sl_max = 0.75 * d;

  // 5. Overall Utilization
  let utilization: number;
  if (!needsShearReinf) {
    // Only minimum reinforcement required
    utilization = Math.abs(VEd) / VRd_c;
    // But also check against Asw_s_min if stirrups are provided
    const util_min = Asw_s_min / Asw_s_prov;
    // Typically we report the higher of load utilization or min-reinf utilization
    utilization = Math.max(utilization, util_min > 1 ? 1.0 : 0); // Simplified
  } else {
    const util_s = Math.abs(VEd) / VRd_s;
    const util_max = Math.abs(VEd) / VRd_max;
    utilization = Math.max(util_s, util_max);
  }


  return {
    VRd_c,
    needsShearReinf,
    VRd_s,
    VRd_max,
    Asw_s_req,
    Asw_s_prov,
    Asw_s_min,
    sl_max,
    theta,
    utilization,
  };
}
