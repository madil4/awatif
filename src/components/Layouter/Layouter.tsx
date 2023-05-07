import { children, onMount, ParentComponent } from "solid-js";

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

    // pointer down
    resizerHorizontal.addEventListener("pointerdown", (e) => {
      x = e.clientX;
      leftViewWidth = leftView.getBoundingClientRect().width;

      document.addEventListener("pointermove", pointerMoveHandlerHorizontal);
    });

    // pointer move
    const pointerMoveHandlerHorizontal = (e: PointerEvent): void => {
      dx = e.clientX - x;
      leftView.style.width = `${leftViewWidth + dx}px`;
      document.body.style.cursor = "col-resize";
      resizerHorizontal.style.cursor = "col-resize";

      container.style.userSelect = "none";
      container.style.pointerEvents = "none";
    };

    //  clean up
    document.addEventListener("pointerup", () => {
      document.body.style.removeProperty("cursor");
      document.removeEventListener("pointermove", pointerMoveHandlerHorizontal);
      container.style.removeProperty("user-select");
      container.style.removeProperty("pointer-events");
    });
  });

  return (
    <div class="flex" ref={container!}>
      <div class="w-1/2 min-w-[200px]" ref={leftView!}>
        {c[0]}
      </div>
      <div
        class="bg-[#cbd5e0] w-[2px] cursor-ew-resize"
        ref={resizerHorizontal!}
      ></div>
      <div class="flex-1 min-w-[200px]">{c[1]}</div>
    </div>
  );
};
