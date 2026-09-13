// Settings for the nonlinear solve.
export type SimSettings = {
  tol: number;
  maximum_iter: number;
};

export const defaultSimSettings: SimSettings = {
  tol: 1e-3,
  maximum_iter: 500,
};
