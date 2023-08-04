import {
  Index,
  Show,
  batch,
  createEffect,
  createSignal,
  on,
  onMount,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Layouter } from "../Layouter/Layouter";
import { Editor } from "../Editor/Editor";
import { Viewer, setRenderAction } from "../Viewer/Viewer";
import { Node } from "../Viewer/objects/Node";
import { Text } from "../Viewer/objects/Text";
import { Grid } from "../Viewer/objects/Grid";
import { Element } from "../Viewer/objects/Element";
import { NodeSupport } from "../Viewer/objects/NodeSupport";
import { NodeLoad } from "../Viewer/objects/NodeLoad";
import { Settings, SettingsType } from "../Settings/Settings";
import { ElementResult } from "../Viewer/objects/ElementResult";
import { NodeResult } from "../Viewer/objects/NodeResults";
import { EditorBar } from "../EditorBar/EditorBar";
import { Parameters, ParametersType } from "../Parameters/Parameters";
import { Login, supabase } from "../Login/Login";
import { ElementResult2 } from "../Viewer/objects/ElementResult2";

export const staging = localStorage.getItem("staging") ? true : false;

type AppProps = {
  script?: string;
  settings?: Partial<SettingsType>;
};

export function App(props: AppProps) {
  const solveWorker = new Worker(new URL("./solveWorker.ts", import.meta.url), {
    type: "module",
  });
  const defaultScript = `import { analyzing } from 'https://unpkg.com/awatif';

export const nodes = [[0, 0, 0], [5, 0, 0], [0, 0, 5]];
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

export const analysisResults = analyzing(nodes, elements, assignments);`;
  const defaultSettings: SettingsType = {
    nodes: true,
    elements: true,
    nodesIndices: false,
    elementsIndices: false,
    supports: true,
    loads: true,
    deformedShape: true,
    elementResults: "none",
    nodeResults: "none",
    ...props.settings,
  };
  const [currentScript, setCurrentScript] = createSignal("");
  const [script, setScript] = createSignal("");
  const [showSave, setShowSave] = createSignal(false);
  const [settings, setSettings] = createStore<SettingsType>(defaultSettings);
  const [undeformedNodes, setUndeformedNodes] = createSignal([]);
  const [deformedNodes, setDeformedNodes] = createSignal<any>([]);
  const [elements, setElements] = createSignal([]);
  const [nodeSupports, setNodeSupports] = createSignal([]);
  const [nodeLoads, setNodeLoads] = createSignal([]);
  const [elementResults, setElementResults] = createSignal([]);
  const [nodeResults, setNodeResults] = createSignal([]);
  const [error, setError] = createSignal(undefined);
  const [projectId, setProjectId] = createSignal(undefined);
  const [parameters, setParameters] = createSignal<ParametersType>({});
  const [awatifKey, setAwatifKey] = createSignal("");
  const [userPlan, setUserPlan] = createSignal("");
  const nodes = () =>
    settings.deformedShape ? deformedNodes() : undeformedNodes();

  onMount(async () => {
    // set User plan and Awatif key
    const urlParams = new URL(window.location.href).searchParams;
    setUserPlan(
      (await supabase.auth.getSession()).data.session?.user?.phone
        ? "pro"
        : "free"
    );

    if (
      userPlan() === "pro" ||
      (urlParams.get("user_id") === "1e9e6f54-bc8d-4dd7-8554-ffa7124f8d81" &&
        urlParams.get("slug") === "2d-truss") ||
      (urlParams.get("user_id") === "1e9e6f54-bc8d-4dd7-8554-ffa7124f8d81" &&
        urlParams.get("slug") === "3d-tower")
    ) {
      setAwatifKey(import.meta.env.VITE_AWATIF_KEY);
    }

    // set script
    let scriptFromURL = "";
    if (urlParams.get("user_id") && urlParams.get("slug")) {
      const { data, error } = await supabase
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

  // on script change: define saving status
  createEffect(
    on([currentScript, script], () =>
      setShowSave(currentScript() === script() ? false : true)
    )
  );

  // on settings node/element results change: render the scene
  createEffect(
    on([() => settings.nodeResults, () => settings.elementResults], () => {
      setRenderAction((c) => c + 1);
    })
  );

  // on undeformed node change: compute deformed nodes
  createEffect(
    on(undeformedNodes, () => {
      const displacement = new Map<number, number[]>();
      if (nodeResults().length) {
        nodeResults().forEach((nodeResult: any) => {
          if ("displacement" in nodeResult)
            displacement.set(nodeResult.node, nodeResult.displacement);
        });
      }
      setDeformedNodes(
        undeformedNodes().map((v: any, i) => {
          const dis = displacement.get(i) || [0, 0, 0];
          return v.map((vv: any, ii: any) => vv + dis[ii]);
        })
      );
    })
  );

  // on parameter change: solve model by running onParameterChange function
  function onParameterChange(e: any) {
    solveModel({ key: e.presetKey, value: e.value });
  }

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
          setUndeformedNodes(e.data.nodes);
          setElements(e.data.elements);
          setNodeSupports(e.data.nodeSupports);
          setNodeLoads(e.data.nodeLoads);
          setNodeResults(e.data.nodeResults);
          setElementResults(e.data.elementResults);
        });
      }
    };
  }

  function computeCenter(point1: number[], point2: number[]): number[] {
    return point1?.map((v, i) => (v + point2[i]) * 0.5);
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

      <Viewer>
        <Grid />

        <Show when={settings.nodes}>
          <Index each={nodes()}>{(node) => <Node position={node()} />}</Index>
        </Show>

        <Show when={settings.elements}>
          <Index each={elements()}>
            {(element) => (
              <Element
                start={nodes()[element()[0]]}
                end={nodes()[element()[1]]}
              />
            )}
          </Index>
        </Show>

        <Show when={settings.nodesIndices}>
          <Index each={nodes()}>
            {(node, index) => (
              <Text text={`${index}`} position={node()} size={0.4} />
            )}
          </Index>
        </Show>

        <Show when={settings.elementsIndices}>
          <Index each={elements()}>
            {(element, index) => (
              <Text
                text={`${index}`}
                position={computeCenter(
                  nodes()[element()[0]],
                  nodes()[element()[1]]
                )}
                size={0.4}
              />
            )}
          </Index>
        </Show>

        <Show when={settings.supports}>
          <Index each={nodeSupports()}>
            {(support) => (
              <NodeSupport
                position={nodes()[(support() as any).node]}
                support={(support() as any).support}
              />
            )}
          </Index>
        </Show>

        <Show when={settings.loads}>
          <Index each={nodeLoads()}>
            {(pointLoad) => (
              <NodeLoad
                position={nodes()[(pointLoad() as any).node]}
                load={(pointLoad() as any).load}
              />
            )}
          </Index>
        </Show>

        <Show when={settings.elementResults !== "none"}>
          <Index each={elementResults()}>
            {(elementResult) => (
              <Show when={elements()[(elementResult() as any).element]}>
                <ElementResult
                  start={
                    nodes()[elements()[(elementResult() as any).element][0]]
                  }
                  end={nodes()[elements()[(elementResult() as any).element][1]]}
                  result={
                    (elementResult() as any)[settings.elementResults] || 0
                  }
                />
              </Show>
            )}
          </Index>
        </Show>

        <Show when={settings.elementResults == "normal"}>
          <Index each={elementResults()}>
            {(elementResult) => (
              <Show when={elements()[(elementResult() as any).element]}>
                <ElementResult2
                  start={
                    nodes()[elements()[(elementResult() as any).element][0]]
                  }
                  end={nodes()[elements()[(elementResult() as any).element][1]]}
                  result={
                    (elementResult() as any)[settings.elementResults] || 0
                  }
                  degree={0}
                />
              </Show>
            )}
          </Index>
        </Show>

        <Show when={settings.elementResults == "shearMajor"}>
          <Index each={elementResults()}>
            {(elementResult) => (
              <Show when={elements()[(elementResult() as any).element]}>
                <ElementResult2
                  start={
                    nodes()[elements()[(elementResult() as any).element][0]]
                  }
                  end={nodes()[elements()[(elementResult() as any).element][1]]}
                  result={
                    (elementResult() as any)[settings.elementResults] || 0
                  }
                  degree={0}
                />
              </Show>
            )}
          </Index>
        </Show>

        <Show when={settings.elementResults == "bendingMajor"}>
          <Index each={elementResults()}>
            {(elementResult) => (
              <Show when={elements()[(elementResult() as any).element]}>
                <ElementResult2
                  start={
                    nodes()[elements()[(elementResult() as any).element][0]]
                  }
                  end={nodes()[elements()[(elementResult() as any).element][1]]}
                  result={
                    (elementResult() as any)[settings.elementResults] || 0
                  }
                  degree={1}
                />
              </Show>
            )}
          </Index>
        </Show>

        <Show when={settings.nodeResults !== "none"}>
          <Index each={nodeResults()}>
            {(nodeResult) => (
              <Show when={nodes()[(nodeResult() as any).node]}>
                <NodeResult
                  position={nodes()[(nodeResult() as any).node]}
                  result={
                    (nodeResult() as any)[settings.nodeResults] || [0, 0, 0]
                  }
                />
              </Show>
            )}
          </Index>
        </Show>
      </Viewer>

      <Settings
        settings={Object.assign({}, settings)}
        onChange={(ev) => {
          setSettings(ev.presetKey as any, ev.value);
        }}
      />

      <Parameters
        parameters={parameters()}
        onChange={(e) => onParameterChange(e)}
      />
    </Layouter>
  );
}
