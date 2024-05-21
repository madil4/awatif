import { getTimberProperties } from "./getMaterialProperties"; // Importing functions for material properties (assuming they are defined elsewhere)

export function calcStability(
  timberGrade: string,
  length: number,
  width: number,
  height: number,
  axialForce: number,
  chi: number
): [
  number,
  number[],
  number[],
  number,
  number[],
  number[],
  number,
  number[],
  number[],
  string,
  number[],
  number
] {
  // Material parameters
  const [
    grade,
    rho_k,
    f_myzk,
    f_c0k,
    f_t0k,
    f_t90k,
    f_c90k,
    f_vk,
    E_0mean,
    E_05,
    G_05,
  ] = getTimberProperties(timberGrade);
  const f_myk = f_myzk * 1;
  const f_mzk = f_myzk * 1.2;

  // Prepare lists
  const L_bh: [number, number][] = [
    [width / 1000, height / 1000],
    [height / 1000, width / 1000],
  ];
  const L_fmk = [f_myk, f_mzk];
  const L_k_crit = [1, 1];
  const L_lamb: number[] = [];
  const L_lamb_rel: number[] = [];
  const L_ky: number[] = [];
  const L_kc: number[] = [];
  const L_sigma_md: number[] = [];
  const L_eta: number[] = [];
  const L_nw: string[] = [];
  const L_w: number[] = [];
  const L_I: number[] = [];
  const L_km = [
    [1, 0.7],
    [0.7, 1],
  ];
  const beta = 1;

  // Effective length
  const l_ef = length * beta;
  const e_0 = 0.0025 * l_ef;

  // Moment
  axialForce = Math.abs(axialForce);
  const M_yd = axialForce * e_0;
  const M_zd = axialForce * e_0;
  const L_M = [M_yd, M_zd];

  // Strength values
  const f_c0d = f_c0k * chi * 1000;
  const f_myd = f_myk * chi * 1000;
  const f_mzd = f_mzk * chi * 1000;

  // Calculate results for moments around y and z axes
  for (let n = 0; n < L_M.length; n++) {
    const M = L_M[n];
    const A = L_bh[n][0] * L_bh[n][1];
    const I = (L_bh[n][0] * L_bh[n][1] ** 3) / 12;
    const w = (L_bh[n][0] * L_bh[n][1] ** 2) / 6;
    const i = L_bh[n][1] / Math.sqrt(12);

    L_w.push(w);
    L_I.push(I);

    // Buckling
    const lamb = (beta * l_ef) / i;
    const lamb_rel = (lamb / Math.PI) * Math.sqrt(f_c0k / E_05);
    const k_y = 0.5 * (1 + 0.1 * (lamb_rel - 0.3) + lamb_rel ** 2);
    const k_c = 1 / (k_y + Math.sqrt(k_y ** 2 - lamb_rel ** 2));

    // Stresses
    const sigma_cd = axialForce / A;
    const sigma_md = M / w;

    L_lamb.push(lamb);
    L_lamb_rel.push(lamb_rel);
    L_ky.push(k_y);
    L_kc.push(k_c);
    L_sigma_md.push(sigma_md);
  }

  // Torsional stability
  const index = L_w.indexOf(Math.max(...L_w));
  let w = L_w[index];
  width = L_bh[index][0];
  height = L_bh[index][1];
  const f_mk = L_fmk[index];

  const lamb_relm =
    Math.sqrt(l_ef / (Math.PI * width ** 2)) *
    Math.sqrt(f_mk / Math.sqrt(E_05 * G_05));

  // Stability coefficient
  let k_crit: number;
  if (lamb_relm <= 0.75) {
    k_crit = 1;
  } else if (lamb_relm > 0.75 && lamb_relm < 1.4) {
    k_crit = 1.56 - 0.75 * lamb_relm;
  } else {
    k_crit = 1 / lamb_relm ** 2;
  }

  if (index === 0) {
    L_k_crit[0] = k_crit;
    L_k_crit[1] = 1;
  } else {
    L_k_crit[0] = 1;
    L_k_crit[1] = k_crit;
  }

  const L_Md = [M_yd, M_zd];
  const L_pot = [
    [1, 2],
    [2, 1],
  ];

  const L_eta123: number[] = [];
  let nw = "";
  let etaMax = 0;

  for (let n = 0; n < L_Md.length; n++) {
    const M = L_Md[n];
    let eta: number;

    if (k_crit === 1 && L_lamb_rel[n] < 0.3) {
      eta =
        (axialForce / f_c0d) ** 2 +
        (L_km[n][0] * L_sigma_md[0]) / f_myd +
        (L_km[n][1] * L_sigma_md[1]) / f_mzd;
      nw = "Sp";
    } else if (k_crit === 1 && L_lamb_rel[n] > 0.3) {
      eta =
        axialForce / (f_c0d * L_kc[n]) +
        (L_km[n][0] * L_sigma_md[0]) / f_myd +
        (L_km[n][1] * L_sigma_md[1]) / f_mzd;
      nw = "Kn";
    } else if (k_crit < 1 && L_lamb_rel[n] < 0.3) {
      eta =
        axialForce / (f_c0d * L_kc[n]) +
        (L_sigma_md[0] / (f_myd * L_k_crit[0])) ** L_pot[n][0] +
        (L_sigma_md[1] / (f_mzd * L_k_crit[1])) ** L_pot[n][1];
      nw = "Kn/Ki";
    } else {
      eta = 0;
      nw = "N/A";
    }

    L_eta.push(eta);
    const eta1 =
      (axialForce / f_c0d) ** 2 +
      (L_km[n][0] * L_sigma_md[0]) / f_myd +
      (L_km[n][1] * L_sigma_md[1]) / f_mzd;
    const eta2 =
      axialForce / (f_c0d * L_kc[n]) +
      (L_km[n][0] * L_sigma_md[0]) / f_myd +
      (L_km[n][1] * L_sigma_md[1]) / f_mzd;
    const eta3 =
      axialForce / (f_c0d * L_kc[n]) +
      (L_sigma_md[0] / (f_myd * L_k_crit[0])) ** L_pot[n][0] +
      (L_sigma_md[1] / (f_mzd * L_k_crit[1])) ** L_pot[n][1];

    L_eta123.push(eta1, eta2, eta3);
    etaMax = Math.max(...L_eta123);
  }

  return [
    E_05,
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
    etaMax,
  ];
}
