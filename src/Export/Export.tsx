import { Show, createSignal, onMount } from "solid-js";
export function Export() {

function  onExport(event:Event){
event.preventDefault();
  }

  return (
    <>
      {/* @ts-ignore */}
      <button onclick="ExportModal.showModal()"
        class="btn btn-xs btn-neutral absolute top-1 right-5 rounded-md "
      >
        Export
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M23.04 24H.96a.959.959 0 0 1-.96-.96V.96C0 .429.429 0 .96 0h10.8a.24.24 0 0 1 .24.24v1.68a.24.24 0 0 1-.24.24h-9.6v19.68h19.68v-9.6a.24.24 0 0 1 .24-.24h1.68a.24.24 0 0 1 .24.24v10.8c0 .531-.429.96-.96.96ZM19.766 2.614 18.2 1.048a.24.24 0 0 1 .141-.408l5.382-.63a.24.24 0 0 1 .267.267l-.63 5.382a.24.24 0 0 1-.408.14l-1.572-1.57-7.686 7.686a.24.24 0 0 1-.339 0l-1.272-1.272a.24.24 0 0 1 0-.34l7.683-7.688Z"
          />
        </svg>
      </button>

      <dialog id="ExportModal" class="modal ">
        <form method="dialog" class="w-8/12 modal-box  max-w-2xl">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">File Name:</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

  <div class="form-control">

 
          <div class="label">
              <span class="label-text">File Type:</span>
            </div>
            <label class="label cursor-pointer justify-start m-2">
              <input
                type="radio"
                name="radio-10"
                class="radio checked:bg-blue-500 mr-2"
                checked
              />
              <span class="label-text">JSON</span>
            </label>
                
            <label class="label cursor-pointer justify-start m-2">
              <input
                type="radio"
                name="radio-10"
                class="radio checked:bg-blue-500 mr-2"
                checked
              />
              <span class="label-text">IFC</span>
            </label>

            </div>
            <div class="flex justify-end">

         
            <label onClick={(e)=>onExport(e)} class="btn btn-sm btn-primary ">
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
