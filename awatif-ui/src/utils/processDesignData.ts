export function processDesignData(data: any[]): Map<string, any> {
  const map = new Map<string, any>();

  data.forEach((i) => {
    if (i.element != undefined) return map.set("element " + i.element, i);
    if (i.node != undefined) return map.set("node " + i.node, i);
  });

  return map;
}
