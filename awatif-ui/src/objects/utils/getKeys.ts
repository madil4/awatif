export function getKeys(outputs: object[]) {
  const keys: string[] = [];

  outputs.forEach((output) => {
    keys.push(...Object.getOwnPropertyNames(output));
  });

  return [...new Set(keys.filter((v) => v !== "node" && v !== "element"))];
}
