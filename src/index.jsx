import { render } from "solid-js/web";
import { App } from "./components/App";

import "./index.css";

// a dirty trick to the app disposing
let HMRdata = {};
if (import.meta.hot) HMRdata = import.meta.hot.data;
if (HMRdata["appDisposer"]) HMRdata["appDisposer"]();
HMRdata["appDisposer"] = render(() => <App />, document.getElementById("root"));
