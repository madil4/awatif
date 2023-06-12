self.onmessage = async (ev) => {
  const module = await import(createURL(ev.data));

  const nodes = module.nodes || [];
  const elements = module.elements || [];
  const nodeSupports: any = [];
  const nodeLoads: any = [];
  const nodeResults: any = [];
  const elementResults: any = [];

  if (module.assignments) {
    (module.assignments as []).forEach((a) => {
      if ("support" in a) nodeSupports.push(a);
      if ("load" in a) nodeLoads.push(a);
    });
  }

  if (module.results) {
    (module.results as []).forEach((a) => {
      if ("node" in a) nodeResults.push(a);
      if ("element" in a) elementResults.push(a);
    });
  }

  self.postMessage({
    nodes,
    elements,
    nodeSupports,
    nodeLoads,
    nodeResults,
    elementResults,
  });
};

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
