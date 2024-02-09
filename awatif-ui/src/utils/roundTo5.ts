export function roundTo5(number: number): number {
  return Math.round(number * 10000) / 10000;
}
