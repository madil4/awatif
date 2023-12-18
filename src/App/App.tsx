import { batch, createEffect, createSignal, on, onMount } from "solid-js";
import { createMutable, createStore } from "solid-js/store";
import { Layouter } from "../Layouter/Layouter";
import { Editor } from "../Editor/Editor";
import { Viewer, setRenderAction } from "../Viewer/Viewer";
import { Grid } from "../Viewer/objects/Grid";
import { Settings, SettingsType } from "../Settings/Settings";
import { EditorBar } from "../EditorBar/EditorBar";
import { Parameters, ParametersType } from "../Parameters/Parameters";
import { Login, supabase } from "../Login/Login";
import { Axes } from "../Viewer/objects/Axes";
import { Export } from "../Export/Export";
import { Model } from "./App.types";
import { ModelToViewer } from "./utils/ModelToViewer";

// todo: refactor App to take model, parameter, onParameterChange, settings
// todo: isolate dynamic script loading from static
// todo: refactor editor to be toggled through source-code menu
type AppProps = {
  script?: string;
};

export function App(props: AppProps) {
  const settings = createMutable<SettingsType>({
    gridSize: 25,
    displayScale: 1,
    nodes: true,
    elements: true,
    nodesIndices: false,
    elementsIndices: false,
    supports: true,
    loads: true,
    deformedShape: true,
    elementResults: "none",
    nodeResults: "none",
  });
  const [parameters, setParameters] = createSignal<ParametersType>({});
  const [model, setModel] = createStore<Model>({
    nodes: [],
    elements: [],
    assignments: [],
    analysisResults: {},
    designResults: [],
  });

  const solveWorker = new Worker(new URL("./solveWorker.ts", import.meta.url), {
    type: "module",
  });
  const defaultScript = `import { analyze } from 'https://unpkg.com/awatif';

export const nodes = [[8, 12.5, 0], [15, 12.5, 0], [8, 12.5, 8]];;
export const elements = [[0, 1], [1, 2]]

export const assignments = [
  {
    node: 0,
    support: [true, true, true]
  },
  {
    node: 2,
    support: [true, true, true]
  },
  {
    node: 1,
    load: [0, 0, -10]
  },
  {
    element: 0,
    area: 1.2,
    elasticity: 200
  },
  {
    element: 1,
    area: 1.2,
    elasticity: 200
  }
]

export const analysisResults = analyze(nodes, elements, assignments);`;

  const [script, setScript] = createSignal("");
  const [currentScript, setCurrentScript] = createSignal("");
  const [showSave, setShowSave] = createSignal(false);
  const [error, setError] = createSignal(undefined);

  const [projectId, setProjectId] = createSignal(undefined);
  const [awatifKey, setAwatifKey] = createSignal("");
  const [userPlan, setUserPlan] = createSignal("");

  onMount(async () => {
    // set user plan
    const urlParams = new URL(window.location.href).searchParams;
    setUserPlan(
      (await supabase.auth.getSession()).data.session?.user?.phone
        ? "pro"
        : "free"
    );

    // set Awatif key
    if (
      userPlan() === "pro" ||
      (urlParams.get("user_id") === "1e9e6f54-bc8d-4dd7-8554-ffa7124f8d81" &&
        urlParams.get("slug") === "2d-truss") ||
      (urlParams.get("user_id") === "1e9e6f54-bc8d-4dd7-8554-ffa7124f8d81" &&
        urlParams.get("slug") === "3d-tower") ||
      (urlParams.get("user_id") === "1e9e6f54-bc8d-4dd7-8554-ffa7124f8d81" &&
        urlParams.get("slug") === "truss-designer")
    ) {
      setAwatifKey(import.meta.env.VITE_AWATIF_KEY);
    }

    // set script
    let scriptFromURL = "";
    if (urlParams.get("user_id") && urlParams.get("slug")) {
      const { data } = await supabase
        .from("projects")
        .select("script,id")
        .eq("user_id", urlParams.get("user_id"))
        .eq("slug", urlParams.get("slug"));

      scriptFromURL = data?.length ? data[0].script : "";
      setProjectId(data?.length ? data[0].id : undefined);
    }
    const script = props.script || scriptFromURL || defaultScript;
    setScript(script);
    setCurrentScript(script);

    solveModel({ script: script });

    // add save shortcut
    document.addEventListener("keydown", (event) => {
      if (
        (event.ctrlKey && event.key === "s") ||
        (event.metaKey && event.key === "s")
      ) {
        event.preventDefault();
        onSave();
      }
    });
  });

  // on settings change: render the scene
  createEffect(
    on(
      [
        () => settings.gridSize,
        () => settings.displayScale,
        () => settings.nodeResults,
        () => settings.elementResults,
      ],
      () => {
        setRenderAction((c) => c + 1);
      }
    )
  );

  // on script change: define saving status
  createEffect(
    on([currentScript, script], () =>
      setShowSave(currentScript() === script() ? false : true)
    )
  );

  // on save: solve model from the script, then sync the script
  async function onSave() {
    solveModel({ script: currentScript() });

    // sync with memory
    setScript(currentScript());

    // sync with the cloud
    if (projectId())
      await supabase
        .from("projects")
        .update({ script: currentScript() })
        .eq("id", projectId());
  }

  function solveModel(
    message: { key: string; value: any } | { script: string }
  ) {
    solveWorker.postMessage({ ...message, $e: awatifKey() });
    solveWorker.onmessage = (e) => {
      if (e.data.error) {
        setError(e.data.error);
      } else {
        batch(() => {
          if (e.data.parameters) setParameters(e.data.parameters);

          setError(undefined);

          setModel({
            nodes: e.data.nodes,
            elements: e.data.elements,
            assignments: e.data.assignments,
            analysisResults: e.data.analysisResults,
            designResults: e.data.designResults,
          });

          Object.assign(settings, e.data.settings);
        });
      }
    };
  }

  return (
    <Layouter>
      <EditorBar
        error={error()}
        userPlan={userPlan()}
        showSave={showSave()}
        onSave={onSave}
      />

      <Editor text={script()} onTextChange={(text) => setCurrentScript(text)} />

      <Login />

      <Viewer gridSize={settings.gridSize}>
        <Grid
          position={[0.5 * settings.gridSize, 0.5 * settings.gridSize, 0]}
          size={settings.gridSize}
        />
        <Axes position={[0, 0, 0]} size={0.07 * settings.gridSize} />

        <ModelToViewer model={model} settings={settings} />
      </Viewer>

      <Settings settings={settings} />

      <Parameters
        parameters={parameters()}
        onChange={(e) =>
          solveModel({ key: (e.target as any).tag, value: e.value })
        }
      />

      <Export model={model} />
    </Layouter>
  );
}
