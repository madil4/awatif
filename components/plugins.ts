import { ComponentsType } from "./data-model";
import { templates as builtInTemplates } from "./templates";

// The registry every consumer reads: component type -> template id -> template.
// `getMesh`, `getLoads`, `getSupports`, `getDesigns`, the viewer and the
// components bar all take one of these, so anything in it behaves exactly
// like a built-in component.
export type ComponentTemplates = Map<ComponentsType, Map<string, any>>;

// What a third-party package ships. Authoring format is plain objects, the
// registry format is Maps; `resolveTemplates` converts.
//
// Template ids are global, so prefix them with the plugin's own namespace
// (`acme:wind-load`, not `wind-load`) to stay collision-free as the
// ecosystem grows.
export type Plugin = {
  // Package name, shown in collision errors
  name: string;
  version?: string;
  templates: Partial<Record<ComponentsType, Record<string, any>>>;
};

// Identity function: gives a plugin author type checking and autocomplete
// without importing the type explicitly
export function definePlugin(plugin: Plugin): Plugin {
  return plugin;
}

// Built-ins plus every plugin's templates, in one registry. The base map is
// never mutated, so two apps on the same page can load different plugins.
//
// Ids must be unique within a component type: a plugin that shadows a
// built-in or another plugin is a mistake, not a feature, so it throws.
export function resolveTemplates(
  plugins: Plugin[] = [],
  base: ComponentTemplates = builtInTemplates,
): ComponentTemplates {
  const resolved: ComponentTemplates = new Map(
    [...base].map(([type, byId]) => [type, new Map(byId)]),
  );
  // template id -> plugin that contributed it, for the error message
  const owners = new Map<string, string>();

  for (const plugin of plugins) {
    for (const [type, byId] of Object.entries(plugin.templates)) {
      const componentType = Number(type) as ComponentsType;
      const target = resolved.get(componentType) ?? new Map<string, any>();
      resolved.set(componentType, target);

      for (const [templateId, template] of Object.entries(byId ?? {})) {
        if (target.has(templateId)) {
          const owner = owners.get(`${componentType}:${templateId}`) ?? "awatif";
          throw new Error(
            `Plugin "${plugin.name}" defines template "${templateId}", which ${owner} already defines. Namespace it, e.g. "${plugin.name}:${templateId}".`,
          );
        }

        target.set(templateId, template);
        owners.set(`${componentType}:${templateId}`, `"${plugin.name}"`);
      }
    }
  }

  return resolved;
}
