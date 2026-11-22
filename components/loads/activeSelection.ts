import { Components, ComponentsType } from "../data-model";
import { LoadCombinationParams } from "../load-combinations/data-model";

// The single load case or load combination currently being viewed and analysed
export type ActiveLoadSelection =
  | { kind: "case"; id: string }
  | { kind: "combination"; id: string }
  | null;

export function getCombinationFactors(
  components: Components["val"],
  combinationId: string,
): Map<string, number> {
  const combination = (
    components.get(ComponentsType.LOAD_COMBINATIONS) ?? []
  ).find((c) => c.id === combinationId);

  const entries =
    (combination?.params as LoadCombinationParams | undefined)?.entries ?? [];

  return new Map(entries.map((e) => [e.loadCaseId, e.factor]));
}

// Loads with no resolvable case belong to nothing, so they only apply when no
// case or combination is selected at all.
export function resolveLoadInclusion(
  loadCaseId: string | undefined,
  activeSelection: ActiveLoadSelection,
  combinationFactors?: Map<string, number>,
): { included: boolean; factor: number } {
  if (!activeSelection) return { included: true, factor: 1 };

  if (activeSelection.kind === "case")
    return { included: loadCaseId === activeSelection.id, factor: 1 };

  const factor =
    loadCaseId !== undefined ? combinationFactors?.get(loadCaseId) : undefined;

  return factor !== undefined
    ? { included: true, factor }
    : { included: false, factor: 0 };
}

export function getSelectionName(
  components: Components["val"],
  selection: ActiveLoadSelection,
): string | null {
  if (!selection) return null;

  const type =
    selection.kind === "case"
      ? ComponentsType.LOAD_CASES
      : ComponentsType.LOAD_COMBINATIONS;

  return (components.get(type) ?? []).find((c) => c.id === selection.id)?.name ?? null;
}

// e.g. "Dead×1.35 + Live×1.5 + Wind×0.9"
export function getCombinationBreakdown(
  components: Components["val"],
  combinationId: string,
): string | null {
  const combination = (
    components.get(ComponentsType.LOAD_COMBINATIONS) ?? []
  ).find((c) => c.id === combinationId);
  if (!combination) return null;

  const entries =
    (combination.params as LoadCombinationParams | undefined)?.entries ?? [];
  if (entries.length === 0) return null;

  const loadCases = components.get(ComponentsType.LOAD_CASES) ?? [];

  return entries
    .map((entry) => {
      const name =
        loadCases.find((c) => c.id === entry.loadCaseId)?.name ?? "Unknown case";
      return `${name}×${entry.factor}`;
    })
    .join(" + ");
}
