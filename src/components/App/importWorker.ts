self.onmessage = async (ev) => {
  let module = [];

  try {
    module = await import(createURL(ev.data));
  } catch (e) {
    self.postMessage({ error: e });
    return;
  }

  const nodes = module.nodes || [];
  const elements = module.elements || [];
  const nodeSupports: any = [];
  const nodeLoads: any = [];
  const nodeResults: any = [];
  const elementResults: any = [];
  const parameters = module.parameters || {};

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
    parameters,
  });
};

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
