import { EnRcColumnParams } from "./enRcColumn";
import { LineElementForces } from "../data-model";
import { DesignResult } from "../../data-model";

export function getDesign({
  params,
  lineElementForces,
}: {
  params: EnRcColumnParams;
  lineElementForces: LineElementForces;
}): DesignResult {
  // Extract maximum forces across all elements
  let maxN = 0;
  let maxMz = 0;

  for (const forces of lineElementForces.elementForces) {
    const N1 = Math.abs(forces.N[0]);
    const N2 = Math.abs(forces.N[1]);
    const Mz1 = Math.abs(forces.Mz[0]);
    const Mz2 = Math.abs(forces.Mz[1]);

    maxN = Math.max(maxN, N1, N2);
    maxMz = Math.max(maxMz, Mz1, Mz2);
  }

  // Get material properties based on grades
  const fck = getConcreteStrength(params.concreteGrade); // MPa
  const fyk = getSteelStrength(params.steelGrade); // MPa

  // Partial safety factors (Eurocode)
  const gammaC = 1.5; // Concrete
  const gammaS = 1.15; // Steel

  // Design strengths
  const fcd = fck / gammaC; // MPa
  const fyd = fyk / gammaS; // MPa

  // Section properties
  const b = params.width; // mm
  const h = params.depth; // mm
  const As = params.steelArea; // mm²
  const d = h - params.cover - 10; // Effective depth (assuming 10mm bar radius)

  // Cross-sectional area
  const Ac = b * h; // mm²

  // Simplified capacity calculations (for illustration)
  // Pure axial capacity: NRd = Ac * fcd + As * fyd
  const NRd = (Ac * fcd + As * fyd) * 1000; // Convert to N

  // Simplified moment capacity (assuming rectangular section)
  // MRd ≈ As * fyd * (d - 0.4x) where x is neutral axis depth
  // For simplification, assume x = 0.2d
  const leverArm = d - 0.4 * 0.2 * d;
  const MRd = (As * fyd * leverArm) / 1e6; // Convert to Nm

  // Calculate utilization ratios
  const utilizationN = maxN / NRd;
  const utilizationM = maxMz / MRd;

  // Combined utilization (simplified interaction)
  // For combined axial and bending: (N/NRd) + (M/MRd) <= 1.0
  const utilization = utilizationN + utilizationM;

  return {
    utilization,
    status: utilization <= 1.0 ? "pass" : "fail",
  };
}

// Helper functions to get material strengths
function getConcreteStrength(grade: string): number {
  const gradeMap: Record<string, number> = {
    C20: 20,
    C25: 25,
    C30: 30,
    C35: 35,
    C40: 40,
    C45: 45,
    C50: 50,
  };
  return gradeMap[grade] || 30; // Default to C30
}

function getSteelStrength(grade: string): number {
  const gradeMap: Record<string, number> = {
    S400: 400,
    S500: 500,
  };
  return gradeMap[grade] || 500; // Default to S500
}
