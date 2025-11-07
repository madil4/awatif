import van from "vanjs-core";
import { getViewer } from "@awatif/ui";

const polylines = {
  points: van.state([]),
  segments: van.state([]),
};

document.body.append(getViewer({ polylines }));
