import { w2toolbar } from "w2ui";
import "w2ui/w2ui-2.0.min.css";
import "./styles.css";

export function getDrawingToolbar({
  onToolbarClick,
}: {
  onToolbarClick: (floor: string) => void;
}): HTMLElement {
  const container = document.createElement("div");
  container.id = "drawing-toolbar";

  new w2toolbar({
    name: "toolbar",
    box: container,
    items: [
      {
        type: "radio",
        id: "1st-floor",
        text: "Columns",
        checked: true,
        tooltip: "Create Columns",
      },
      {
        type: "radio",
        id: "2nd-floor",
        text: "Slab",
        tooltip: "Create Slab",
      },
    ],
    onClick(event) {
      onToolbarClick(event.target);
    },
  });

  return container;
}
