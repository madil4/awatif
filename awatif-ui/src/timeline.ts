import van from "vanjs-core";
import { ModelState, SettingsState } from "./types";

import "./styles/timeline.css";

// todo: convert from vanjs templates to lit-html
export function timeline(modelState: ModelState, settingsState: SettingsState) {
  const { button, div, input } = van.tags;

  const frame = van.state(0); // the frame in consideration
  const isPlayed = van.state(false);
  const fps = 30; // default value
  const dt = settingsState.dynamicSettings.val.timeStep;
  const frameIncrement = Math.floor(1 / dt / fps);

  const numFrames = modelState.val.analysisOutputs.position.size - 1;

  const slider = () =>
    div(
      { class: "slidecontainer" },
      input({
        type: "range",
        min: "0",
        max: numFrames,
        value: "0",
        class: "slider",
        id: "playerBar",
        oninput: (e) => {
          frame.val = Number(e.target.value);
          isPlayed.val = false;
        },
      })
    );

  const playButton = () =>
    div(
      { class: "player-button", onclick: () => (isPlayed.val = !isPlayed.val) },
      button({
        role: "play",
        class: () => (isPlayed.val ? "play hidden" : "play"),
      }),
      button({
        role: "pause",
        class: () => (isPlayed.val ? "pause" : "pause hidden"),
      })
    );

  const player = () => div({ class: "player" }, playButton(), slider());
  van.add(document.body, player());

  // events -----------------------------------

  // change nodes positions according to frame state (note. state.val is immutable)
  van.derive(() => {
    let newModel = structuredClone(modelState.val);
    newModel.nodes =
      modelState.val.analysisOutputs.position.get(frame.val) ?? [];
    modelState.val = newModel;
  });

  // animate slider value
  setInterval(() => {
    if (isPlayed.val) {
      const playBar = document.getElementById("playerBar") as HTMLInputElement;
      const newFrameVal = Math.min(numFrames, frame.val + frameIncrement); // cap frame value to numFrames
      if (newFrameVal === numFrames) isPlayed.val = false;
      playBar.value = newFrameVal.toString();
      frame.val = newFrameVal;
    }
  }, 1000 / fps);
}
