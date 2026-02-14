const box = document.getElementById("box");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

box.addEventListener("pointerdown", (e) => {
  isDragging = true;
  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;
  box.setPointerCapture(e.pointerId);
});

box.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  box.style.left = (e.clientX - offsetX) + "px";
  box.style.top = (e.clientY - offsetY) + "px";
});

box.addEventListener("pointerup", (e) => {
  isDragging = false;
  box.releasePointerCapture(e.pointerId);
});

box.addEventListener("pointercancel", () => {
  isDragging = false;
});
