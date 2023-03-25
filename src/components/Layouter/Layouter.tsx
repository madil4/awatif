import { onMount, ParentComponent } from "solid-js";
import "./Layouter.css";

export const Layouter: ParentComponent = (props: any) => {
  let container: HTMLDivElement;
  let leftView: HTMLDivElement;
  let topView: HTMLDivElement;
  let resizerHorizontal: HTMLDivElement;
  let resizerVertical: HTMLDivElement;

  onMount(() => {
    let x = 0;
    let dx = 0;
    let leftViewWidth = 0;
    let y = 0;
    let dy = 0;
    let topVieHeight = 0;

    container.style.height = `${window.innerHeight}px`;

    // mouse down
    resizerHorizontal.addEventListener("mousedown", (e) => {
      x = e.clientX;
      leftViewWidth = leftView.getBoundingClientRect().width;

      document.addEventListener("mousemove", mouseMoveHandlerHorizontal);
    });
    resizerVertical.addEventListener("mousedown", (e) => {
      y = e.clientY;
      topVieHeight = topView.getBoundingClientRect().height;

      document.addEventListener("mousemove", mouseMoveHandlerVertical);
    });

    // mouse move
    const mouseMoveHandlerHorizontal = (e: MouseEvent): void => {
      dx = e.clientX - x;
      leftView.style.width = `${leftViewWidth + dx}px`;
      document.body.style.cursor = "col-resize";
      resizerHorizontal.style.cursor = "col-resize";

      container.style.userSelect = "none";
      container.style.pointerEvents = "none";
    };
    const mouseMoveHandlerVertical = (e: MouseEvent): void => {
      dy = e.clientY - y;
      topView.style.height = `${topVieHeight + dy}px`;
      document.body.style.cursor = "row-resize";
      resizerVertical.style.cursor = "row-resize";

      container.style.userSelect = "none";
      container.style.pointerEvents = "none";
    };

    //  clean up
    document.addEventListener("mouseup", () => {
      document.body.style.removeProperty("cursor");
      document.removeEventListener("mousemove", mouseMoveHandlerHorizontal);
      document.removeEventListener("mousemove", mouseMoveHandlerVertical);
      container.style.removeProperty("user-select");
      container.style.removeProperty("pointer-events");
    });
  });

  return (
    <div class="container" ref={container!}>
      <div class="containerLeft" ref={leftView!}>
        <div class="containerTop" ref={topView!}>
          {props.children[0]}
        </div>
        <div class="resizerVertical" ref={resizerVertical!}></div>
        <div class="containerBottom">{props.children[1]}</div>
      </div>
      <div class="resizerHorizontal" ref={resizerHorizontal!}></div>
      <div class="containerRight">{props.children[2]}</div>
    </div>
  );
};
