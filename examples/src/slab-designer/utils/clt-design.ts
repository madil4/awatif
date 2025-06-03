export type Glulam = {
  grade: string;
  f_mk: number; // Characteristic bending strength
  E_mean: number; // Mean modulus of elasticity
};

export interface CltDesignResults {
  slabHeight: number;
  thicknesses: number[];
  zCordsFromMid: number[];
  inertiaList: number[];
  inertia: number;
  bendingStress: number[];
  bendingStressMax: number;
  f_md: number;
  eta: number[];
  etaMax: number;
}

export function cltBendingDesign(
  glulam: Glulam,
  thk1: number,
  layerParNo: number,
  thk2: number,
  Myd: number,
  chi: number
): CltDesignResults {

  const layerPerpNo = layerParNo - 1;
  const slabHeight = thk1 * layerParNo + thk2 * layerPerpNo;

  // Generate thickness array
  const thicknesses = Array.from({ length: layerParNo + layerPerpNo }, (_, i) =>
    i % 2 === 0 ? thk1 : thk2
  );

  // Compute neutral axis location
  let zCords = [0];
  let accumulated = 0;
  for (let thk of thicknesses) {
    accumulated += thk;
    zCords.push(accumulated);
  }
  const zCordsFromMid = zCords.map((z) => z - slabHeight / 2);

  // Calculate moment of inertia
  let inertia = 0;
  let inertiaList: number[] = [];
  const width = 1000; // Assume 1m width
  for (let i = 0; i < thicknesses.length; i++) {
    let thk = thicknesses[i];
    let I_i = (width * thk ** 3) / 12;
    let A = width * thk;
    let y = zCordsFromMid[i + 1]; // Layer middle
    let I = I_i + A * y ** 2;
    inertiaList.push(I);
    inertia += I;
  }

  
  // Calculate bending stress
  const bendingStresses = zCordsFromMid.map((z) =>
    Number(((Myd * 1e6 * z) / inertia).toFixed(2))
);
const bendingStressMax = Math.max(...bendingStresses)

  // Bending resistance
  const f_md = glulam.f_mk * chi;

  // Bending check (utilization ratio)
  const eta = bendingStresses.map((sigma) => Number((sigma / f_md).toFixed(2)));
  const etaMax = Math.max(...eta)


  // output
  const cltDesignResults: CltDesignResults = {
    slabHeight: slabHeight,
    thicknesses: thicknesses,
    zCordsFromMid: zCordsFromMid,
    inertiaList: inertiaList,
    inertia: inertia,
    bendingStress: bendingStresses,
    bendingStressMax: bendingStressMax,
    f_md: f_md,
    eta: eta,
    etaMax: etaMax,
  };

  return cltDesignResults 
}
