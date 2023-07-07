import { children, onMount, ParentComponent } from "solid-js";
import { Login } from "../Login/Login";

export const Layouter: ParentComponent = (props: any) => {
  let container: HTMLDivElement;
  let leftView: HTMLDivElement;
  let resizerHorizontal: HTMLDivElement;

  const c = children(() => props.children).toArray();

  onMount(() => {
    let x = 0;
    let dx = 0;
    let leftViewWidth = 0;

    container.style.height = `${window.innerHeight}px`;

    // on pointer down
    resizerHorizontal.addEventListener("pointerdown", (e) => {
      x = e.clientX;
      leftViewWidth = leftView.getBoundingClientRect().width;

      document.addEventListener("pointermove", pointerMoveHandlerHorizontal);
    });

    // on pointer move
    const pointerMoveHandlerHorizontal = (e: PointerEvent): void => {
      dx = e.clientX - x;
      leftView.style.width = `${leftViewWidth + dx}px`;
      document.body.style.cursor = "col-resize";
      resizerHorizontal.style.cursor = "col-resize";

      container.style.userSelect = "none";
      container.style.pointerEvents = "none";
    };

    // on pointer up
    document.addEventListener("pointerup", () => {
      document.body.style.removeProperty("cursor");
      document.removeEventListener("pointermove", pointerMoveHandlerHorizontal);
      container.style.removeProperty("user-select");
      container.style.removeProperty("pointer-events");
    });
  });

  return (
    <div class="flex flex-col-reverse md:flex-row" ref={container!}>
      <div
        class="flex flex-col w-full md:w-1/2 min-w-[350px] min-h-[200px]"
        ref={leftView!}
      >
        {c[0]}
        {c[1]}
        <Login />
      </div>
      <div
        class="bg-primary w-[2px] cursor-ew-resize"
        ref={resizerHorizontal!}
      ></div>
      <div class="relative flex-1 min-w-[350px]">
        {c[2]}
        {c[3]}
        {c[4]}
      </div>
    </div>
  );
};
