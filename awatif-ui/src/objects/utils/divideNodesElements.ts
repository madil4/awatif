export function divideNodesElements(outputs: Map<string, object>) {
  const nodeOutputs: object[] = [];
  const elementOutputs: object[] = [];

  outputs.forEach((o, key) => {
    if (key.includes("node")) nodeOutputs.push(o);
    if (key.includes("element")) elementOutputs.push(o);
  });

  return { nodeOutputs, elementOutputs };
}
