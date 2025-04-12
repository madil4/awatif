export function handleNumericalData(
  data: any,
  numCols: number,
  isPostive: boolean = false
): any {
  // empty data
  if (data.length == 0) {
    return [new Array(numCols).fill(0)];
  }

  // filter out empty values and convert to numbers
  const filledData = data.map((row) => {
    return row.map((cell) => (cell === "" ? 0 : Number(cell)));
  });

  if (isPostive) {
    return filledData.map((row) => {
      return row.map((cell) => (cell < 0 ? 0 : cell));
    });
  }

  return filledData;
}
