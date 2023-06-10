self.onmessage = async (event) => {
  const algorithmURL = URL.createObjectURL(
    new Blob([event.data], { type: "application/javascript" })
  );

  const module = await import(algorithmURL);
  const nodes = module.nodes || [];
  const elements = module.elements || [];
  const nodeSupports: any = [];
  const nodeLoads: any = [];
  const elementResults: any = [];
  const nodeResults: any = [];

  if (module.assignments) {
    (module.assignments as []).forEach((a) => {
      if ("support" in a) nodeSupports.push(a);
      if ("load" in a) nodeLoads.push(a);
    });
  }

  if (module.results) {
    (module.results as []).forEach((a) => {
      if ("element" in a) elementResults.push(a);
      if ("node" in a) nodeResults.push(a);
    });
  }

  self.postMessage({
    nodes,
    elements,
    nodeSupports,
    nodeLoads,
    elementResults,
    nodeResults,
  });
};
