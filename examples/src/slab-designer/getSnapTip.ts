export function getSnapTip(): HTMLDivElement {
  // Init
  const snapTip: HTMLDivElement = document.createElement("div");
  const isMac = navigator.userAgent.includes("Macintosh");

  // Update
  snapTip.className = "snap-tip";
  snapTip.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">${isMac ? "Cmd" : "Ctrl"}</span>
      <span>to snap to grid points</span>
    `;

  // Show on first interaction
  snapTip.classList.add("show");

  // Events
  // Hide when Ctrl is pressed (since user now knows)
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey) snapTip.classList.remove("show");
  });

  return snapTip;
}
