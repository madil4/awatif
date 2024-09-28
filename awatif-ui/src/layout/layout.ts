import { w2layout } from "w2ui";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

type Panel = {
  element: HTMLElement;
  title?: string;
};

export function layout({
  topLeft,
  topRight,
  main,
  preview,
  right,
}: {
  topLeft?: Panel;
  topRight?: Panel;
  main: Panel;
  preview?: Panel;
  right?: Panel;
}): HTMLDivElement {
  // init
  const layoutElm = document.createElement("div");

  const style = "border: 1px solid #efefef";

  const topLayout = new w2layout({
    name: "topLayout",
    panels: [
      ...(topLeft
        ? [{ type: "left", size: "50%", html: getW2Elm(topLeft.element) }]
        : []),
      ...(topRight
        ? [{ type: "right", html: getW2Elm(topRight.element) }]
        : []),
    ],
  });

  new w2layout({
    box: layoutElm,
    name: "layout",
    panels: [
      ...(topLeft || topRight
        ? [{ type: "top", size: 60, style, html: topLayout }]
        : []),
      {
        type: "main",
        style,
        html: getW2Elm(main.element),
        ...(main.title ? { title: main.title } : {}),
      },
      ...(preview
        ? [
            {
              type: "preview",
              size: "50%",
              resizable: true,
              style,
              html: getW2Elm(preview.element),
              ...(preview.title ? { title: preview.title } : {}),
            },
          ]
        : []),
      ...(right
        ? [
            {
              type: "right",
              size: "65%",
              resizable: true,
              style,
              html: getW2Elm(right.element),
              ...(right.title ? { title: right.title } : {}),
            },
          ]
        : []),
    ],
  });

  // update
  layoutElm.id = "layout";

  return layoutElm;
}

// Utils
function getW2Elm(elm: HTMLElement): { render: () => void } {
  return {
    render: function () {
      this.box.append(elm);
    },
  };
}
