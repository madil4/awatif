import { w2layout } from "w2ui";

import "w2ui/w2ui-2.0.min.css";

import "./styles.css";

export function layout({
  topLeft,
  topRight,
  main,
  preview,
  right,
}: {
  topLeft?: HTMLElement;
  topRight?: HTMLElement;
  main?: HTMLElement;
  preview?: HTMLElement;
  right?: HTMLElement;
}): HTMLElement {
  // init
  const layoutElm = document.createElement("div");

  const style = "border: 1px solid #efefef";

  const topLayout = new w2layout({
    name: "topLayout",
    panels: [
      { type: "left", html: getW2Elm(topLeft) },
      { type: "right", html: getW2Elm(topRight) },
    ],
  });

  new w2layout({
    box: layoutElm,
    name: "layout",
    panels: [
      { type: "top", size: 60, style, html: topLayout },
      { type: "main", style, html: getW2Elm(main) },
      {
        type: "preview",
        size: "50%",
        resizable: true,
        style,
        html: getW2Elm(preview),
      },
      {
        type: "right",
        size: "60%",
        resizable: true,
        style,
        html: getW2Elm(right),
      },
    ],
  });

  // update
  layoutElm.id = "layout";

  return layoutElm;
}

// Utils
function getW2Elm(elm?: HTMLElement): { render: () => void } {
  return {
    render: function () {
      if (elm) this.box.append(elm);
    },
  };
}
