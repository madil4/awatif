import van from "vanjs-core";
import { ModelState, SettingsState } from "./types";

export function Timeline(modelState: ModelState, settingsState: SettingsState) {
  const { button, div, input } = van.tags;

  const frame = van.state(0); // the frame in consideration
  const isPlayed = van.state(false);
  const fps = 30; // default value
  const dt = settingsState.dynamicSettings.val.timeStep;
  const frameIncrement = Math.floor(1 / dt / fps);

  const numFrames = modelState.val.analysisResults.position.size - 1;

  // render the slider with vanjs rendering system instead of pure html and append it to body
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
          frame.val = Number(e.target.value); // change the frame state according to slider.value
          isPlayed.val = false; // stop playing clicked
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

  // events -----------------------------------

  // change nodes positions according to frame state (note. state.val is immutable)
  van.derive(() => {
    let newModel = structuredClone(modelState.val);
    newModel.nodes =
      modelState.val.analysisResults.position.get(frame.val) ?? [];
    modelState.val = newModel;
  });

  // animate slider value
  setInterval(() => {
    if (isPlayed.val) {
      if (frame.val === numFrames) frame.val = 0; // reset to start

      const playBar = document.getElementById("playerBar") as HTMLInputElement;
      const newFrameVal = Math.min(numFrames, frame.val + frameIncrement); // cap frame value to numFrames
      if (newFrameVal === numFrames) isPlayed.val = false;
      playBar.value = newFrameVal.toString();
      frame.val = newFrameVal;
    }
  }, 1000 / fps); // 30 fps, the animation is handled by the viewer, which is triggered when changing the position

  van.add(document.body, player());
}
