import van from "vanjs-core";
import { getViewer } from "@awatif/ui";

const geometry = {
  points: van.state([]),
  lines: van.state([]),
};

document.body.append(getViewer({ geometry }));
