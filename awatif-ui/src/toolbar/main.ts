import van from "vanjs-core";

import { getToolbar } from "./getToolbar";

const clickedButton = van.state("");

const toolbarElm = getToolbar({
  buttons: ["Report", "Tables"],
  sourceCode: "http://localhost:4600/toolbar/index.html",
  author: "https://www.linkedin.com/in/madil4/",
  clickedButton,
});

van.derive(() => console.log(clickedButton.val));

document.body.appendChild(toolbarElm);
