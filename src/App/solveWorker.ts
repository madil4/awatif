let parameters: any;
let onParameterChange: any;

self.onmessage = async (e) => {
  let module: any;
  let onChangeResults: any;

  // @ts-ignore
  self.$k = e.data.$e;

  // two cases: either running onParameterChange function or importing as js
  if (e.data.key) {
    parameters[e.data.key].value = e.data.value;
    try {
      onChangeResults = onParameterChange(parameters);
    } catch (e) {
      self.postMessage({ error: e });
      return;
    }
  } else {
    try {
      module = await import(createURL(e.data.script));
    } catch (e) {
      self.postMessage({ error: e });
      return;
    }

    parameters = module?.parameters || {};
    onParameterChange = module?.onParameterChange || undefined;

    if (onParameterChange) {
      try {
        onChangeResults = onParameterChange(parameters);
      } catch (e) {
        self.postMessage({ error: e });
        return;
      }
    }
  }

  const nodes = onChangeResults?.nodes || module?.nodes || [];
  const elements = onChangeResults?.elements || module?.elements || [];
  const assignments = onChangeResults?.assignments || module?.assignments || [];
  const analysisResults = onChangeResults?.analysisResults ||
    module?.analysisResults || { default: [] };

  const nodeSupports: any[] = [];
  const nodeLoads: any[] = [];
  assignments?.forEach((a: any) => {
    if ("support" in a) nodeSupports.push(a);
    if ("load" in a) nodeLoads.push(a);
  });

  const nodeResults: any[] = [];
  const elementResults: any[] = [];
  analysisResults["default"]?.forEach((a: any) => {
    if ("node" in a) nodeResults.push(a);
    if ("element" in a) elementResults.push(a);
  });

  self.postMessage({
    parameters: e.data.key ? undefined : parameters,
    nodes,
    elements,
    nodeSupports,
    nodeLoads,
    nodeResults,
    elementResults,
    settings: module?.settings || {},
  });
};

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
