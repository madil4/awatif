import { createEffect, createSignal } from "solid-js";
import "./Report.css";

type ReportProps = {
  nodes: any;
  elements: any;
  assignments: any[];
  analysisResults: any[];
  designResults: any[];
};

// TODO: refactor modal into own Component store in common/Modal.tsx
export function Report(props: ReportProps) {
  const [elementIndex, setElementIndex] = createSignal(0);

  return (
    <>
      <button
        /* @ts-ignore */
        onclick="ReportModal.showModal()"
        // remove all classes and keep only absolute and top/right
        class="flex align-baseline s-center justify-center gap-1 absolute top-1 right-16"
      >
        <span class="text-sm">Report</span>
      </button>

      <dialog id="ReportModal" class="modal">
        <form
          method="dialog"
          class=" flex flex-col h-screen modal-box max-w-3xl"
        >
          <button
            id="ReportModal_closeButton"
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          {/* code begin */}
          <div class="flex mt-4">
            <div class="flex-grow">
              <button
                class="btn btn-sm"
                onclick={() => setElementIndex((c) => c - 1)}
                disabled={elementIndex() === 0}
              >
                «
              </button>
              <span class="mt-3 px-2">
                Element {elementIndex()} fo {props.analysisResults.length - 1}
              </span>
              <button
                class="btn btn-sm"
                onclick={() => setElementIndex((c) => c + 1)}
                disabled={elementIndex() === props.analysisResults.length - 1}
              >
                »
              </button>
            </div>

            <a class="btn btn-sm btn-primary" onclick={() => window.print()}>
              Print
            </a>
          </div>
          <div
            id="printArea"
            class="flex-grow mt-5 p-4 bg-white text-slate-500"
          >
            <p>The report goes here:</p>
            <ul>
              <li>
                Utilization factor:
                {props.designResults[elementIndex()]?.utilizationFactor}
              </li>
              <li>
                Effective Length:
                {props.designResults[elementIndex()]?.effectiveLength}
              </li>
            </ul>
          </div>
        </form>

        <form method="dialog" class="modal-backdrop">
          <button />
        </form>
      </dialog>
    </>
  );
}
