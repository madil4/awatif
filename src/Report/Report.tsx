import "./Report.css";

type ReportProps = {
  nodes: any;
  elements: any;
  assignments: any[];
  analysisResults: any;
};

// TODO: refactor modal into own Component store in common/Modal.tsx
export function Report(props: ReportProps) {
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
              <a class="btn btn-sm">«</a>
              <span class="mt-3 px-2">Element 22 fo 100</span>
              <a class="btn btn-sm">»</a>
            </div>

            <a class="btn btn-sm btn-primary" onclick={() => window.print()}>
              Print
            </a>
          </div>
          <div
            id="printArea"
            class="flex-grow mt-5 p-4 bg-white text-slate-500"
          >
            The report goes here
          </div>
        </form>

        <form method="dialog" class="modal-backdrop">
          <button />
        </form>
      </dialog>
    </>
  );
}
