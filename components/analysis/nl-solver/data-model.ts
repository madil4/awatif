// Settings for the nonlinear solve. The hosted solver caps `maximum_iter` at 500,
// so the default matches that ceiling rather than exceeding it.
export type SimSettings = {
  tol: number;
  maximum_iter: number;
};

export const defaultSimSettings: SimSettings = {
  tol: 1e-3,
  maximum_iter: 500,
};
