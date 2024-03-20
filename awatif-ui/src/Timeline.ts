import van from "vanjs-core";

export default function TimeLine(modelState) {
    const frame = van.State(0); // the frame in consideration
    const isPlayed = false:
  
    // render the slider with vanjs rendering system instead of pure html and append it to body
    slider = input({ type: "range", min: "0", max: "100" });
  
    // change the frame state according to slider.value
    slider.oninput(() => {
      frame.val = slider.value;
    });
  
    // change nodes positions according to frame state
    van.derive(() => {
      modelState.val.nodes = modelState.val.analysisResults[frame.val].position;
    });
  
    // animate slider value
    setInterval(() => {
      if (isPlayed) slider.val = frame.val + 1; // this assumes the steps from the analysis results are incremented by 1
    }, 1000/30); // 30 fps, the animation is handled by the viewer, which is triggered when changing the position 
  }