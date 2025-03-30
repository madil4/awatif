import { getDialog } from "./getDialog";
import van from "vanjs-core";

const span = document.createElement("span");
span.textContent = "Hello World";

const bold = document.createElement("b");
bold.textContent = "Mohamed Adil";

const dialogBody = van.state(span);

setTimeout(() => {
  dialogBody.val = bold;
}, 1000);

const dialogElm = getDialog({ dialogBody });

document.body.appendChild(dialogElm);