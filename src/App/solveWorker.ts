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

  self.postMessage({
    parameters: e.data.key ? undefined : parameters,
    nodes: onChangeResults?.nodes || module?.nodes || [],
    elements: onChangeResults?.elements || module?.elements || [],
    assignments: onChangeResults?.assignments || module?.assignments || [],
    analysisResults: onChangeResults?.analysisResults ||
      module?.analysisResults || { default: [] },
    designResults:
      onChangeResults?.designResults || module?.designResults || [],
    settings: module?.settings || {},
  });
};

const createURL = (text: string): string =>
  URL.createObjectURL(new Blob([text], { type: "application/javascript" }));
