import van from "vanjs-core";
import "./platform.css";
import { createApp } from "./createApp";
import type { AppConfig } from "./data-model";
import * as modelExports from "./models";

const { a, h1, main, nav } = van.tags;

// Every model exported from ./models; plugins (a name plus templates) are
// exports of the same module but not models
const models = Object.entries(modelExports).filter(
  ([, value]) => !("name" in value && "templates" in value),
) as [string, AppConfig][];

const defaultModel = "demo";

// portalFrame -> Portal Frame
const getLabel = (id: string) =>
  id
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();

const requested = new URLSearchParams(location.search).get("model");
const [activeId, activeModel] =
  models.find(([id]) => id === requested) ??
  models.find(([id]) => id === defaultModel) ??
  models[0];

document.title = `${getLabel(activeId)} · Awatif`;

const app = main();

document.body.append(
  van.tags.div(
    { id: "platform" },
    nav(
      h1("Models"),
      models.map(([id]) =>
        a(
          {
            href: `?model=${id}`,
            class: id === activeId ? "active" : "",
          },
          getLabel(id),
        ),
      ),
    ),
    app,
  ),
);

// One app per page load: createApp has no teardown, so switching models
// navigates instead of remounting
await createApp({ ...activeModel, container: app });
