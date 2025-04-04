import { Pane } from "tweakpane";
import van, { State } from "vanjs-core";
import "../styles.css";

export const levelState = van.state(1);
export const supportState = van.state("pinned");
export const serviceClassState = van.state(1);
export const loadDurationClassState = van.state("instantaneous");
export const gradeState = van.state("GL24h");
export const showGeoState = van.state(false);
export const showNedState = van.state(false);

// default
export const paramsSupport = {
  support: "pinned",
};

export const paramsServiceClass = {
  serviceClass: 1,
};

export const paramsLoadDurationClass = {
  loadDurationClass: "instantaneous",
};

export const paramsGrade = {
  grade: "GL24h",
};

// view
export const paramsLevel = { level: 1 };
export const paramsShowNed = { show_Ned: false };
export const paramsShowGeo = { show_geometry: false };

// container
const container = document.createElement("div");
container.classList.add("parameters-pane"); // Add your custom class
document.body.appendChild(container);
export const parametersPane = new Pane({ container });

// tab
const tab = parametersPane.addTab({
  pages: [{ title: "global inputs" }, { title: "view" }],
});

tab.pages[0]
  .addBinding(paramsSupport, "support", {
    options: {
      pinned: "pinned",
      cantilever: "cantilever",
      fixed_top: "fixed (top)",
      fixed_bottom: "fixed (bottom)",
    },
  })
  .on("change", () => (supportState.val = paramsSupport.support));

tab.pages[0]
  .addBinding(paramsServiceClass, "serviceClass", {
    options: {
      one: 1,
      two: 2,
      three: 3,
    },
  })
  .on(
    "change",
    () => (serviceClassState.val = paramsServiceClass.serviceClass)
  );

tab.pages[0]
  .addBinding(paramsLoadDurationClass, "loadDurationClass", {
    options: {
      permanent: "permanent",
      long_term: "long-term",
      medium_term: "medium-term",
      short_term: "short-term",
      instantaneous: "instantaneous",
    },
  })
  .on(
    "change",
    () =>
      (loadDurationClassState.val = paramsLoadDurationClass.loadDurationClass)
  );

tab.pages[0]
  .addBinding(paramsGrade, "grade", {
    options: {
      gl20h: "GL20h",
      gl22h: "GL22h",
      gl24h: "GL24h",
      gl26h: "GL26h",
      gl28h: "GL28h",
      gl30h: "GL30h",
    },
  })
  .on("change", () => (gradeState.val = paramsGrade.grade));

tab.pages[1]
  .addBinding(paramsLevel, "level", { options: { 1: 1, 2: 2, 3: 3 } })
  .on("change", () => (levelState.val = paramsLevel.level));

tab.pages[1]
  .addBinding(paramsShowGeo, "show_geometry" )
  .on("change", () => (showGeoState.val = paramsShowGeo.show_geometry));

  tab.pages[1]
  .addBinding(paramsShowNed, "show_Ned" )
  .on("change", () => (showNedState.val = paramsShowNed.show_Ned));

