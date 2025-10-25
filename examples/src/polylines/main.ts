import van from "vanjs-core";
import { getViewer } from "@awatif/ui";

const polylines = van.state([]);

document.body.append(getViewer({ polylines }));
