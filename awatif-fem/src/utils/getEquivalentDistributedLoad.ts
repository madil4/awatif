export const getEquivalentDistributedLoad = (
  wY: number,
  wZ: number,
  L: number
) => [
  0,
  (wY * L) / 2,
  (wZ * L) / 2,
  0,
  (-wZ * L ** 2) / 12,
  (wY * L ** 2) / 12,
  0,
  (wY * L) / 2,
  (wZ * L) / 2,
  0,
  (wZ * L ** 2) / 12,
  (-wY * L ** 2) / 12,
];
