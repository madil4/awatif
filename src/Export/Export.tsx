import { For, Ref, Show, createEffect, createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { exportToJSON } from "./exportToJSON";
import FileSaver from "file-saver";
import {
  ExportOptions,
  ExportOptionsEnum,
  FileType,
  exportProps,
} from "./export.types";
import { CheckBoxWithLabel } from "./CheckBoxWithLabel";

export function Export(props: exportProps) {
  const [fileName, setFileName] = createSignal("awatif-file");
  const [fileType, setFileType] = createSignal<FileType>(FileType.JSON);
  const [exportOptions, SetExportOptions] = createStore<ExportOptions>({
    nodes: true,
    elements: true,
    supports: true,
    loads: false,
    properties: false,
    analysisResults: false,
  });

  async function onExport(event: any) {
    let jsonObject = exportToJSON(
      props.nodes,
      props.elements,
      props.assignments,
      props.analysisResults,
      exportOptions
    );

    var blob = new Blob([jsonObject], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, `${fileName()}.${fileType()}`);

    document?.getElementById("ExportModal_closeButton")?.click();
  }

  function fileTypeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    setFileType(target.value as FileType);
  }

  function setOptions(event: Event, option: ExportOptionsEnum) {
    const target = event.target as HTMLInputElement;

    switch (option) {
      case ExportOptionsEnum.Loads:
        SetExportOptions("loads", target.checked);
        break;
      case ExportOptionsEnum.Nodes:
        SetExportOptions("nodes", target.checked);
        break;
      case ExportOptionsEnum.AnalysisResults:
        SetExportOptions("analysisResults", target.checked);
        break;
      case ExportOptionsEnum.Elements:
        SetExportOptions("elements", target.checked);
        break;
      case ExportOptionsEnum.Properties:
        SetExportOptions("properties", target.checked);
        break;
      case ExportOptionsEnum.Supports:
        SetExportOptions("supports", target.checked);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <button
        /* @ts-ignore */
        onclick="ExportModal.showModal()"
        class="flex align-baseline  items-center justify-center gap-1   absolute top-1 right-5 "
      >
        <span class="text-sm uppercase  ">Export</span>
      </button>

      <dialog id="ExportModal" class="modal ">
        <form method="dialog" class="w-8/12 modal-box  max-w-2xl">
          <button
            id="ExportModal_closeButton"
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">File Name:</span>
            </div>
            <input
              type="text"
              value={fileName()}
              oninput={(e) => setFileName(e.target.value)}
              placeholder="awatif-file-1"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
          <div class="orm-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">File Type:</span>
            </div>

            <select
              value={fileType()}
              onChange={fileTypeChange}
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

            <div class="grid  grid-cols-2">
              <CheckBoxWithLabel
                Label={ExportOptionsEnum.Nodes}
                Property={exportOptions.nodes}
                OnChange={(e: Event) => setOptions(e, ExportOptionsEnum.Nodes)}
              />
              <CheckBoxWithLabel
                Label={ExportOptionsEnum.Elements}
                Property={exportOptions.elements}
                OnChange={(e: Event) =>
                  setOptions(e, ExportOptionsEnum.Elements)
                }
              />

              <CheckBoxWithLabel
                Label={ExportOptionsEnum.Supports}
                Property={exportOptions.supports}
                OnChange={(e: Event) =>
                  setOptions(e, ExportOptionsEnum.Supports)
                }
              />

              <CheckBoxWithLabel
                Label={ExportOptionsEnum.Loads}
                Property={exportOptions.loads}
                OnChange={(e: Event) => setOptions(e, ExportOptionsEnum.Loads)}
              />

              <CheckBoxWithLabel
                Label={ExportOptionsEnum.Properties}
                Property={exportOptions.properties}
                OnChange={(e: Event) =>
                  setOptions(e, ExportOptionsEnum.Properties)
                }
              />

              <CheckBoxWithLabel
                Label={ExportOptionsEnum.AnalysisResults}
                Property={exportOptions.analysisResults}
                OnChange={(e: Event) =>
                  setOptions(e, ExportOptionsEnum.AnalysisResults)
                }
              />
            </div>
          </div>
          <div class="flex justify-end">
            <label onClick={(e) => onExport(e)} class="btn btn-sm btn-primary ">
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
