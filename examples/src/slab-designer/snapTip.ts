export function initSnapTip(): void {
  const snapTip: HTMLDivElement = createSnapTip();
  
  // Show on first interaction
  snapTip.classList.add('show');
  
  // Hide when Ctrl is pressed (since user now knows)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey) snapTip.classList.remove('show');
  });
}


function createSnapTip(): HTMLDivElement{
    const tip: HTMLDivElement = document.createElement('div');
    tip.className = 'snap-tip';
    tip.innerHTML = `
      <span>Tip: Hold</span>
      <span class="key">Ctrl</span>
      <span>to snap to grid points</span>
    `;
    
    // Add to document body
    document.body.appendChild(tip);
    
    return tip;
}