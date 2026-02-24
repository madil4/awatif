import "./styles.css";

const TIPS = [
  "Left-click to draw structure; click a node to connect a beam",
  "Right-click a node to delete it",
  "Click and drag a node to reposition it",
  "Click a component in the list, then drag to assign geometry; drag the opposite way to unassign",
  `Need help? <a href="mailto:mohamed@awatif.co">mohamed@awatif.co</a>`,
];

export function getTooltips(): HTMLElement {
  let current = 0;
  let intervalId: ReturnType<typeof setInterval>;

  const counter = document.createElement("span");
  counter.className = "tip-counter";

  const text = document.createElement("span");
  text.className = "tip-text";

  const prev = document.createElement("button");
  prev.className = "tip-nav";
  prev.textContent = "‹";

  const next = document.createElement("button");
  next.className = "tip-nav";
  next.textContent = "›";

  function show(index: number) {
    text.style.opacity = "0";
    setTimeout(() => {
      text.innerHTML = TIPS[index];
      counter.textContent = `${index + 1}/${TIPS.length}`;
      text.style.opacity = "1";
    }, 150);
  }

  function go(delta: number) {
    current = (current + delta + TIPS.length) % TIPS.length;
    show(current);
    resetInterval();
  }

  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      current = (current + 1) % TIPS.length;
      show(current);
    }, 10000);
  }

  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));

  show(0);
  resetInterval();

  const container = document.createElement("div");
  container.id = "tooltips";
  container.append(prev, counter, text, next);

  return container;
}
