type EditorBarProps = {
  error?: string;
};

export function EditorBar(props: EditorBarProps) {
  return (
    <div class="tabs">
      <a class="tab tab-bordered tab-active bg-[#1e1e1e]">main.js</a>
      <div class="badge badge-sm mb-auto mt-2 ml-3">In Alpha Testing</div>
      <div class="text-xl ml-auto mr-2 mb-[0.1rem]">
        {props.error ? (
          <>
            <div class="tooltip tooltip-bottom" data-tip={props.error}>
              😔
            </div>
          </>
        ) : (
          <>👌</>
        )}
      </div>
    </div>
  );
}
