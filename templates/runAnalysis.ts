import van, { type State } from "vanjs-core";
import {
  ComponentsType,
  applyLocalAxesToForces,
  applyLocalAxesToProps,
  getDesigns,
  getElementsProps,
  getLoads,
  getLocalAxes,
  getMesh,
  getNlPositionsAndForcesRemote,
  getPositionsAndForcesCpp,
  getReactions,
  getReleases,
  getSupports,
  templates as builtInTemplates,
  type ComponentTemplates,
  type Components,
  type Geometry,
  type Mesh,
} from "@awatif/components";
import type { AnalysisStatus, Display } from "@awatif/ui";

// The full mesh -> solve -> design pipeline of the app, re-run whenever any
// state it reads changes
export function runAnalysis({
  geometry,
  components,
  mesh,
  display,
  analysisStatus,
  activeAnalysis,
  templates = builtInTemplates,
}: {
  geometry: Geometry;
  components: Components;
  mesh: Mesh;
  display: Display;
  analysisStatus: AnalysisStatus;
  activeAnalysis: State<"linear" | "nonlinear">;
  // Built-ins plus any plugin templates; see `resolveTemplates`
  templates?: ComponentTemplates;
}): void {
  let latestAnalysis = 0;

  van.derive(async () => {
    const analysis = ++latestAnalysis;
    const assignedLineIds = new Set<number>();
    (components.val.get(ComponentsType.DESIGN) ?? []).forEach((c) => {
      // Only line-kind design components reference line IDs (polygon designs
      // reference polygon IDs, an independent number space)
      const template = templates
        .get(ComponentsType.DESIGN)
        ?.get(c.templateId);
      if (template?.geometryKind !== "line") return;
      c.geometry.forEach((id) => assignedLineIds.add(id));
    });
    const unassignedLines = [...geometry.lines.val.keys()].filter(
      (id) => !assignedLineIds.has(id),
    );
    const warningPayload = unassignedLines.length > 0 ? { unassignedLines } : {};

    try {
      // Mesh events
      const meshData = getMesh({
        geometry: {
          points: geometry.points.val,
          lines: geometry.lines.val,
          polygons: geometry.polygons.val,
        },
        components: components.val,
        templates,
      });

      mesh.nodes.val = meshData.nodes;
      mesh.elements.val = meshData.elements;
      mesh.geometryMapping.val = meshData.geometryMapping;

      // Loads events
      mesh.loads.val = getLoads({
        components: components.val,
        geometryMapping: mesh.geometryMapping.val,
        templates,
        activeSelection: display.activeLoadSelection?.val,
        nodes: mesh.nodes.val,
        elements: mesh.elements.val,
      });

      // Supports events
      mesh.supports.val = getSupports({
        components: components.val,
        geometryMapping: mesh.geometryMapping.val,
        templates,
      });

      // Releases events
      mesh.releases.val = getReleases({
        components: components.val,
        geometryMapping: mesh.geometryMapping.val,
        templates,
      });

      // Local axes events
      const localAxes = getLocalAxes({
        components: components.val,
        geometryMapping: mesh.geometryMapping.val,
        templates,
      });

      // Elements properties events
      // A 90° section rotation is modelled by swapping Iz/Iy before the solve
      mesh.elementsProps.val = applyLocalAxesToProps(
        getElementsProps({
          components: components.val,
          geometryMapping: mesh.geometryMapping.val,
          templates,
          elements: mesh.elements.val,
        }),
        localAxes,
      );

      // Positions events
      const selectedAnalysis = activeAnalysis.val;
      if (selectedAnalysis === "nonlinear") {
        analysisStatus.val = {
          success: true,
          loading: true,
          ...warningPayload,
        };
      }

      const result: {
        positions: Mesh["positions"]["val"];
        internalForces: Mesh["internalForces"]["val"];
        iterationCount?: number;
      } =
        selectedAnalysis === "nonlinear"
          ? await getNlPositionsAndForcesRemote(
              mesh.nodes.val,
              mesh.elements.val,
              mesh.loads.val,
              mesh.supports.val,
              mesh.elementsProps.val,
              mesh.releases.val,
            )
          : getPositionsAndForcesCpp(
              mesh.nodes.val,
              mesh.elements.val,
              mesh.loads.val,
              mesh.supports.val,
              mesh.elementsProps.val,
              mesh.releases.val,
            );

      if (analysis !== latestAnalysis) return;

      mesh.positions.val = result.positions;

      mesh.displacements.val = mesh.nodes.val.flat().map((n_coord, i) => {
        return result.positions[i] - n_coord;
      });
      mesh.internalForces.val = result.internalForces;
      // getReactions transforms with the coordinate-derived (fixed) local frame,
      // so it must see the solver's raw forces, not the section-frame ones
      mesh.reactions.val = getReactions(
        mesh.nodes.val,
        mesh.elements.val,
        result.internalForces,
        mesh.loads.val,
        mesh.supports.val,
      );
      mesh.internalForces.val = applyLocalAxesToForces(
        result.internalForces,
        localAxes,
      );

      analysisStatus.val = {
        success: true,
        iterations:
          selectedAnalysis === "nonlinear" ? result.iterationCount : undefined,
        ...warningPayload,
      };
    } catch (e) {
      if (analysis !== latestAnalysis) return;

      mesh.positions.val = [];
      mesh.displacements.val = [];
      mesh.reactions.val = [];
      mesh.internalForces.val = new Map();

      const message = e instanceof Error ? e.message : String(e);
      analysisStatus.val = { success: false, error: message, ...warningPayload };
    }
  });

  // Designs events
  van.derive(() => {
    geometry.designs.val = getDesigns({
      mesh: {
        nodes: mesh.nodes.val,
        elements: mesh.elements.val,
        geometryMapping: mesh.geometryMapping.val,
        internalForces: mesh.internalForces.val,
      },
      components: components.val,
      templates,
    });
  });
}
