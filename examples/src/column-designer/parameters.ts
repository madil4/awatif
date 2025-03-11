import { Pane } from "tweakpane";
import "./styles.css";

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

export const parametersPane = new Pane({
});

// Add custom class and inline styles
// parametersPane.element.classList.add("parameters");

parametersPane
  .addBinding(paramsSupport, "support", {
    options: {
      pinned: "pinned",
      cantilever: "cantilever",
      fixed_top: "fixed (top)",
      fixed_bottom: "fixed (bottom)",
    },
  })
  .on("change", (ev) => {
    paramsSupport.support = ev.value;
    console.log("Updated support:", paramsSupport.support);
  });

parametersPane
  .addBinding(paramsServiceClass, "serviceClass", {
    options: {
      one: 1,
      two: 2,
      three: 3,
    },
  })
  .on("change", (ev) => {
    paramsServiceClass.serviceClass = ev.value;
    console.log("Updated service class:", paramsServiceClass.serviceClass);
  });

parametersPane
  .addBinding(paramsLoadDurationClass, "loadDurationClass", {
    options: {
      permanent: "permanent",
      long_term: "long-term",
      medium_term: "medium-term",
      short_term: "short-term",
      instantaneous: "instantaneous",
    },
  })
  .on("change", (ev) => {
    paramsLoadDurationClass.loadDurationClass = ev.value;
    console.log(
      "Updated load duration class:",
      paramsLoadDurationClass.loadDurationClass
    );
  });

parametersPane
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
  .on("change", (ev) => {
    paramsGrade.grade = ev.value;
    console.log("Updated grade:", paramsGrade.grade);
  });
