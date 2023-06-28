export function Upgrade() {
  return (
    <>
      {/* @ts-ignore */}
      <button class="btn btn-xs btn-primary" onclick="my_modal_2.showModal()">
        Upgrade to Pro
      </button>
      <dialog id="my_modal_2" class="modal">
        <form method="dialog" class="modal-box">
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click outside to close</p>
        </form>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
