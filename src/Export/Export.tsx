import { For, createEffect, createSignal, on } from "solid-js";
import { exportToJSON } from "./exportToJSON";
import FileSaver from "file-saver";
import { ExportOptions, FileType, ExportProps } from "./export.types";
import { createStore } from "solid-js/store";
import { exportToDXF } from "./exportToDXF";

export function Export(props: ExportProps) {
  const [disabled, setDisabled] = createSignal(false);
  const [fileType, setFileType] = createSignal<FileType>(FileType.JSON);
  const [exportOptions, SetExportOptions] = createStore<ExportOptions>({
    nodes: true,
    elements: true,
    supports: true,
    loads: true,
    properties: true,
    analysisResults: true,
  });

  function onFileTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    setFileType(target.value as FileType);
  }

  function onExportOptionsChange(key: string, event: Event) {
    const target = event.target as HTMLInputElement;
    /* @ts-ignore */
    SetExportOptions(key, target.checked);
  }

  function onExportClick() {
    const exporters = {
      [FileType.JSON]: exportToJSON,
      [FileType.DXF]: exportToDXF,
    };

    const string = exporters[fileType()](
      props.nodes,
      props.elements,
      props.assignments,
      props.analysisResults,
      exportOptions
    );
    var blob = new Blob([string], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, `awatif-model.${fileType()}`);

    document?.getElementById("ExportModal_closeButton")?.click();
  }

  // on fileType change: disable and reset export options according to type
  createEffect(
    on(fileType, () => {
      if (fileType() === FileType.DXF) {
        setDisabled(true);
        SetExportOptions({
          nodes: true,
          elements: true,
          supports: false,
          loads: false,
          properties: false,
          analysisResults: false,
        });
      } else {
        setDisabled(false);
        SetExportOptions({
          nodes: true,
          elements: true,
          supports: true,
          loads: true,
          properties: true,
          analysisResults: true,
        });
      }
    })
  );

  return (
    <>
      <button
        /* @ts-ignore */
        onclick="ExportModal.showModal()"
        class="flex align-baseline  items-center justify-center gap-1 absolute top-1 right-3"
      >
        <span class="text-sm">Export</span>
      </button>

      <dialog id="ExportModal" class="modal ">
        <form method="dialog" class="w-8/12 modal-box max-w-2xl">
          <button
            id="ExportModal_closeButton"
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <div class="orm-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">File Type:</span>
            </div>

            <select
              value={fileType()}
              onChange={onFileTypeChange}
              class="select select-bordered w-full max-w-xs"
            >
              <For each={Object.values(FileType)}>
                {(filetype) => <option>{filetype}</option>}
              </For>
            </select>
          </div>

          <div class="form-control ">
            <div class="label">
              <span class="label-text">Include:</span>
            </div>
            <div class="grid grid-cols-2">
              <For each={Object.entries(exportOptions)}>
                {([key, value]) => (
                  <label class="label cursor-pointer justify-start m-2">
                    <input
                      type="checkbox"
                      checked={value}
                      class="checkbox"
                      onchange={(e) => onExportOptionsChange(key, e)}
                      disabled={disabled()}
                    />

                    <span class="label-text ml-2">{key}</span>
                  </label>
                )}
              </For>
            </div>
          </div>

          <div class="flex justify-end">
            <label onClick={onExportClick} class="btn btn-sm btn-primary ">
              Export
            </label>
          </div>
        </form>

        <form method="dialog" class="modal-backdrop">
          <button />
        </form>
      </dialog>
    </>
  );
}
