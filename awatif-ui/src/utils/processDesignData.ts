export function processDesignData(data: any[]): Map<number, any> {
  const map = new Map<number, any>();

  data.forEach((i) => map.set(i.element, i));

  return map;
}
