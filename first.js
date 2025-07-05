const slider = document.querySelector('input[type="range"]');
const root = document.querySelector("article");

const span = (text, index) => {
  const node = document.createElement("span");
  node.textContent = text;
  node.style.setProperty("--index", index);
  return node;
};

const byLetter = (text) => [...text].map(span);
const byWord = (text) => text.split(" ").map(span);

const { matches: motionOK } = window.matchMedia(
  "(prefers-reduced-motion: no-preference)"
);

if (motionOK) {
  const splitTargets = document.querySelectorAll("[split-by]");

  splitTargets.forEach((node) => {
    const type = node.getAttribute("split-by");
    let nodes = null;

    if (type === "letter") nodes = byLetter(node.textContent);
    else if (type === "word") nodes = byWord(node.textContent);

    if (nodes) node.firstChild.replaceWith(...nodes);
  });
}

function onInput() {
  const value = slider.value;
  root.style.setProperty("--speed", `${value}ms`);
}

slider.addEventListener("input", debounce(onInput, 10));

function debounce(func, wait) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
