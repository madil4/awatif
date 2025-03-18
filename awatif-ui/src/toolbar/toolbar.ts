import { Pane } from "tweakpane";

import "./styles.css";

export function toolbar(buttons: string[]) {
  const container = document.createElement("div");
  container.classList.add("custom-pane"); // Add your custom class
  document.body.appendChild(container);

  const pane = new Pane({ container, expanded: true });
  const f1 = pane.addFolder({
    title: "awatif.co",
    expanded: false,
  });

  const btnGithub = f1.addButton({ title: "github" });
  const btnLinkedin = f1.addButton({ title: "linkedIn" });
  const btnNewsletter = f1.addButton({ title: "newsletter" });

  btnGithub.on("click", () => {
    window.open("https://github.com/madil4/awatif", "_blank"); // Opens in a new tab
  });

  btnLinkedin.on("click", () => {
    window.open("https://www.linkedin.com/company/awatifsoftware", "_blank"); // Opens in a new tab
  });

  btnNewsletter.on("click", () => {
    window.open(
      "https://awatif.us19.list-manage.com/subscribe?u=80eec59eb329b1c9c00258524&id=95cfe71596",
      "_blank"
    ); // Opens in a new tab
  });

  const f2 = pane.addFolder({
    title: "design",
    expanded: true,
  });
  const buttonsElm = buttons.map((button) => f2.addButton({ title: button }));

  return buttonsElm;
}
