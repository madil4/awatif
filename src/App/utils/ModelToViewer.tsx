import { Index, Show, createEffect, createSignal, on } from "solid-js";
import { SettingsType } from "../../Settings/Settings";
import {
  DeformationResult,
  LoadAssignment,
  Model,
  NormalResult,
  ReactionResult,
  SupportAssignment,
} from "../App.types";
import { Node } from "../../Viewer/objects/Node";
import { Element } from "../../Viewer/objects/Element";
import { Text } from "../../Viewer/objects/Text";
import { NodeSupport } from "../../Viewer/objects/NodeSupport";
import { NodeLoad } from "../../Viewer/objects/NodeLoad";
import { ElementResult } from "../../Viewer/objects/ElementResult";
import { NodeResult } from "../../Viewer/objects/NodeResults";

type ModelToViewerProps = {
  model: Model;
  settings: SettingsType;
};

export function ModelToViewer(props: ModelToViewerProps) {
  const [nodeSupports, setNodeSupports] = createSignal<SupportAssignment[]>([]);
  const [nodeLoads, setNodeLoads] = createSignal<LoadAssignment[]>([]);
  const [nodeResults, setNodeResults] = createSignal<
    (DeformationResult | ReactionResult)[]
  >([]);
  const [elementResults, setElementResults] = createSignal<NormalResult[]>([]);

  const [deformedNodes, setDeformedNodes] = createSignal<any>([]);

  const displayScale = () =>
    props.settings.displayScale === 0
      ? 1
      : props.settings.displayScale > 0
      ? props.settings.displayScale
      : -1 / props.settings.displayScale;

  // on setting deformedShape change: set nodes
  const nodes = () =>
    props.settings.deformedShape ? deformedNodes() : props.model.nodes;

  // on assignments change: parse them
  createEffect(() => {
    // you can do better than this with stores
    const nodeSupports: SupportAssignment[] = [];
    const nodeLoads: LoadAssignment[] = [];

    props.model.assignments?.forEach((a) => {
      if ("support" in a) nodeSupports.push(a);
      if ("load" in a) nodeLoads.push(a);
    });

    setNodeSupports(nodeSupports);
    setNodeLoads(nodeLoads);
  });

  // on analysis or design results change: parse them
  createEffect(() => {
    // you can do better than this with stores
    const nodeResults: (DeformationResult | ReactionResult)[] = [];
    const elementResults: NormalResult[] = [];

    props.model.analysisResults["default"]?.forEach((a) => {
      if ("node" in a) nodeResults.push(a);
      if ("element" in a) elementResults.push(a);
    });

    setNodeResults(nodeResults);
    setElementResults(elementResults);
  });

  // on undeformed node change: compute deformed nodes
  createEffect(
    on(
      () => props.model.nodes,
      () => {
        const deformation = new Map<number, number[]>();
        if (props.model.analysisResults.length) {
          props.model.analysisResults["default"].forEach((result) => {
            if ("deformation" in result)
              deformation.set(result.node, result.deformation);
          });
        }

        setDeformedNodes(
          props.model.nodes.map((v, i) => {
            const dis = deformation.get(i) || [0, 0, 0];
            return v.map((vv: any, ii: any) => vv + dis[ii]);
          })
        );
      }
    )
  );

  return (
    <>
      <Show when={props.settings.nodes}>
        <Index each={props.model.nodes}>
          {(node) => (
            <Node
              position={node()}
              size={0.04 * props.settings.gridSize * displayScale()}
            />
          )}
        </Index>
      </Show>

      <Show when={props.settings.elements}>
        <Index each={props.model.elements}>
          {(element) => (
            <Element
              start={props.model.nodes[element()[0]]}
              end={props.model.nodes[element()[1]]}
            />
          )}
        </Index>
      </Show>

      <Show when={props.settings.nodesIndices}>
        <Index each={props.model.nodes}>
          {(node, index) => (
            <Text
              text={`${index}`}
              position={node()}
              size={0.04 * props.settings.gridSize * displayScale()}
            />
          )}
        </Index>
      </Show>

      <Show when={props.settings.elementsIndices}>
        <Index each={props.model.elements}>
          {(element, index) => (
            <Text
              text={`${index}`}
              position={computeCenter(
                props.model.nodes[element()[0]],
                props.model.nodes[element()[1]]
              )}
              size={0.04 * props.settings.gridSize * displayScale()}
            />
          )}
        </Index>
      </Show>

      <Show when={props.settings.supports}>
        <Index each={nodeSupports()}>
          {(support) => (
            <NodeSupport
              position={props.model.nodes[(support() as any).node]}
              support={(support() as any).support}
              size={0.04 * props.settings.gridSize * displayScale()}
            />
          )}
        </Index>
      </Show>

      <Show when={props.settings.loads}>
        <Index each={nodeLoads()}>
          {(pointLoad) => (
            <NodeLoad
              position={props.model.nodes[(pointLoad() as any).node]}
              load={(pointLoad() as any).load}
              size={0.07 * props.settings.gridSize * displayScale()}
            />
          )}
        </Index>
      </Show>

      <Show when={props.settings.elementResults !== "none"}>
        <Index each={elementResults()}>
          {(elementResult) => (
            <Show when={props.model.elements[(elementResult() as any).element]}>
              <ElementResult
                start={
                  props.model.nodes[
                    props.model.elements[(elementResult() as any).element][0]
                  ]
                }
                end={
                  props.model.nodes[
                    props.model.elements[(elementResult() as any).element][1]
                  ]
                }
                result={
                  (elementResult() as any)[props.settings.elementResults][0] ||
                  0
                }
                size={0.04 * props.settings.gridSize * displayScale()}
              />
            </Show>
          )}
        </Index>
      </Show>

      <Show when={props.settings.nodeResults !== "none"}>
        <Index each={nodeResults()}>
          {(nodeResult) => (
            <Show when={props.model.nodes[(nodeResult() as any).node]}>
              <NodeResult
                position={props.model.nodes[(nodeResult() as any).node]}
                result={
                  (nodeResult() as any)[props.settings.nodeResults] || [0, 0, 0]
                }
                size={0.07 * props.settings.gridSize * displayScale()}
              />
            </Show>
          )}
        </Index>
      </Show>
    </>
  );
}

function computeCenter(point1: number[], point2: number[]): number[] {
  return point1?.map((v, i) => (v + point2[i]) * 0.5);
}
