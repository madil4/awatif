import { render } from "solid-js/web";
import { App } from "./App/App";

import "./index.css";

export const staging = localStorage.getItem("staging") ? true : false;

// @ts-ignore
render(() => <App />, document.getElementById("root"));
