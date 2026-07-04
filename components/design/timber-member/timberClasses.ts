/**
 * EN 338:2016 solid timber and EN 14080:2013 glulam strength classes.
 *
 * All strengths and stiffnesses in N/mm² (MPa).
 * Densities in kg/m³.
 */

export type TimberClassProps = {
  type: "solid" | "glulam";
  fm_k: number; // Characteristic bending strength
  ft_0_k: number; // Characteristic tension parallel
  fc_0_k: number; // Characteristic compression parallel
  fv_k: number; // Characteristic shear strength
  E0_mean: number; // Mean MOE parallel (N/mm²)
  E0_05: number; // 5th-percentile MOE parallel (N/mm²)
  G_mean: number; // Mean shear modulus (N/mm²) — EN 338: E0_mean/16; EN 14080: E0_mean/16
  rho_k: number; // Characteristic density (kg/m³)
  rho_mean: number; // Mean density (kg/m³)
};

export const TIMBER_CLASSES: Record<string, TimberClassProps> = {
  // ── Solid timber (EN 338:2016, Table 1) ───────────────────────────
  C14: { type: "solid", fm_k: 14, ft_0_k: 8, fc_0_k: 16, fv_k: 3.0, E0_mean: 7000, E0_05: 4700, G_mean: 440, rho_k: 290, rho_mean: 350 },
  C16: { type: "solid", fm_k: 16, ft_0_k: 10, fc_0_k: 17, fv_k: 3.2, E0_mean: 8000, E0_05: 5400, G_mean: 500, rho_k: 310, rho_mean: 370 },
  C18: { type: "solid", fm_k: 18, ft_0_k: 11, fc_0_k: 18, fv_k: 3.4, E0_mean: 9000, E0_05: 6000, G_mean: 560, rho_k: 320, rho_mean: 380 },
  C20: { type: "solid", fm_k: 20, ft_0_k: 12, fc_0_k: 19, fv_k: 3.6, E0_mean: 9500, E0_05: 6400, G_mean: 590, rho_k: 330, rho_mean: 390 },
  C22: { type: "solid", fm_k: 22, ft_0_k: 13, fc_0_k: 20, fv_k: 3.8, E0_mean: 10000, E0_05: 6700, G_mean: 630, rho_k: 340, rho_mean: 410 },
  C24: { type: "solid", fm_k: 24, ft_0_k: 14, fc_0_k: 21, fv_k: 4.0, E0_mean: 11000, E0_05: 7400, G_mean: 690, rho_k: 350, rho_mean: 420 },
  C27: { type: "solid", fm_k: 27, ft_0_k: 16, fc_0_k: 22, fv_k: 4.0, E0_mean: 11500, E0_05: 7700, G_mean: 720, rho_k: 370, rho_mean: 450 },
  C30: { type: "solid", fm_k: 30, ft_0_k: 18, fc_0_k: 23, fv_k: 4.0, E0_mean: 12000, E0_05: 8000, G_mean: 750, rho_k: 380, rho_mean: 460 },
  C35: { type: "solid", fm_k: 35, ft_0_k: 21, fc_0_k: 25, fv_k: 4.0, E0_mean: 13000, E0_05: 8700, G_mean: 810, rho_k: 400, rho_mean: 480 },
  C40: { type: "solid", fm_k: 40, ft_0_k: 24, fc_0_k: 26, fv_k: 4.0, E0_mean: 14000, E0_05: 9400, G_mean: 880, rho_k: 420, rho_mean: 500 },
  C45: { type: "solid", fm_k: 45, ft_0_k: 27, fc_0_k: 27, fv_k: 4.0, E0_mean: 15000, E0_05: 10000, G_mean: 940, rho_k: 440, rho_mean: 520 },
  C50: { type: "solid", fm_k: 50, ft_0_k: 30, fc_0_k: 29, fv_k: 4.0, E0_mean: 16000, E0_05: 10700, G_mean: 1000, rho_k: 460, rho_mean: 550 },

  // ── Glulam homogeneous (EN 14080:2013) ────────────────────────────
  GL24h: { type: "glulam", fm_k: 24, ft_0_k: 19.2, fc_0_k: 24, fv_k: 3.5, E0_mean: 11500, E0_05: 9600, G_mean: 720, rho_k: 385, rho_mean: 420 },
  GL28h: { type: "glulam", fm_k: 28, ft_0_k: 22.3, fc_0_k: 28, fv_k: 3.5, E0_mean: 12600, E0_05: 10500, G_mean: 790, rho_k: 425, rho_mean: 460 },
  GL32h: { type: "glulam", fm_k: 32, ft_0_k: 25.6, fc_0_k: 32, fv_k: 3.5, E0_mean: 14200, E0_05: 11800, G_mean: 890, rho_k: 440, rho_mean: 480 },
};
