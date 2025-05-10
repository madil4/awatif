export function bisection(
  a: number,
  b: number,
  f: Function,
  epsilon: number,
  maxIterations: number
): null | number {
  if (f(a) * f(b) >= 0) {
    return null;
  }

  let mid = a;
  let numIterations = 0;
  while (b - a >= epsilon && numIterations < maxIterations) {
    // Find middle point
    mid = (a + b) / 2;

    // Check if middle point is root
    if (f(mid) == 0.0) break;
    // Decide the side to repeat the steps
    else if (f(a) * f(mid) < 0) b = mid;
    else a = mid;

    numIterations++;
  }

  return mid;
}
