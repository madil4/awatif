import { Index, Show, batch, createEffect, createSignal, on } from "solid-js";
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
import { supabase } from "../MyProjects/MyProjects";
import { EditorBar } from "../EditorBar/EditorBar";
import { Parameters, ParametersType } from "../Parameters/Parameters";
import { TpChangeEvent } from "tweakpane";

type AppProps = {
  algorithm?: string;
  settings?: Partial<SettingsType>;
};

export function App(props: AppProps) {
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
  const [algorithm, setAlgorithm] = createSignal("");
  const [initAlgorithm, setInitAlgorithm] = createSignal("");
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

  const nodes = () =>
    settings.deformedShape ? deformedNodes() : undeformedNodes();

  const importWorker = new Worker(
    new URL("./importWorker.ts", import.meta.url),
    {
      type: "module",
    }
  );

  // on algorithm change
  createEffect(
    on(algorithm, async () => {
      importWorker.postMessage(algorithm());

      importWorker.onmessage = (e) => {
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

      if (projectId())
        await supabase
          .from("projects")
          .update({ algorithm: algorithm() })
          .eq("id", projectId());
    })
  );

  // on parameter change
  function onParameterChange(e: any) {
    importWorker.postMessage({ key: e.presetKey, value: e.value });
  }

  // on settings element results change
  createEffect(
    on(
      () => settings.elementResults,
      () => {
        setRenderAction((c) => c + 1);
      }
    )
  );

  // on settings node results change
  createEffect(
    on(
      () => settings.nodeResults,
      () => {
        setRenderAction((c) => c + 1);
      }
    )
  );

  // on undeformed node change
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

  async function setInitAlgorithmOnInit() {
    const defaultAlgorithm = `// Default Template, customize to begin 
import { analyzing } from 'https://unpkg.com/awatif';

export const parameters = {
  xPosition: {
    value: -3,
    min:-3,
    max:2,
    label: "support xPosition"
  }
}

export function onParameterChange(parameters) {
  const nodes = [[parameters.xPosition.value, 1, 3], [3, 1, 3], [0, -3, 3], [0, 0, 0]];
  const elements = [[0, 3], [2, 3], [1, 3]]

  const assignments = [
    {
      node: 0,
      support: [true, true, true]
    },
    {
      node: 1,
      support: [true, true, true]
    },
    {
      node: 2,
      support: [true, true, true]
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
    },
    {
      element: 2,
      area: 1.2,
      elasticity: 200
    },
    {
      node: 3,
      load: [0, 0, -250]
    },
  ]

  const results = analyzing(nodes, elements, assignments);

  return {nodes,elements,assignments,results}
}`;
    const urlParams = new URL(window.location.href).searchParams;
    let algorithmFromURL = "";

    if (urlParams.get("user_id") && urlParams.get("slug")) {
      const { data, error } = await supabase
        .from("projects")
        .select("algorithm,id")
        .eq("user_id", urlParams.get("user_id"))
        .eq("slug", urlParams.get("slug"));

      algorithmFromURL = data?.length ? data[0].algorithm : "";
      setProjectId(data?.length ? data[0].id : undefined);
    }

    const algorithm = props.algorithm || algorithmFromURL || defaultAlgorithm;
    setInitAlgorithm(algorithm);
    setAlgorithm(algorithm);
  }

  setInitAlgorithmOnInit();

  return (
    <Layouter>
      <EditorBar error={error()} />

      <Editor
        text={initAlgorithm()}
        onTextChange={(text) => setAlgorithm(text)}
      />

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
                    (elementResult() as any)[settings.elementResults] || [
                      0, 0, 0,
                    ]
                  }
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

const computeCenter = (point1: number[], point2: number[]): number[] =>
  point1?.map((v, i) => (v + point2[i]) * 0.5);
