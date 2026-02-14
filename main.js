const box = document.getElementById("box");
const target = document.getElementById("target");
const message = document.getElementById("message");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let locked = false;

box.addEventListener("pointerdown", (e) => {
  if (locked) return;

  isDragging = true;
  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;
  box.setPointerCapture(e.pointerId);
});

box.addEventListener("pointermove", (e) => {
  if (!isDragging || locked) return;

  box.style.left = (e.clientX - offsetX) + "px";
  box.style.top = (e.clientY - offsetY) + "px";
});

box.addEventListener("pointerup", (e) => {
  if (locked) return;

  isDragging = false;
  box.releasePointerCapture(e.pointerId);

  checkDrop();
});

function checkDrop() {
  const boxRect = box.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  const isInside =
    boxRect.left < targetRect.right &&
    boxRect.right > targetRect.left &&
    boxRect.top < targetRect.bottom &&
    boxRect.bottom > targetRect.top;

  if (isInside) {
    locked = true;
    message.style.display = "block";
    target.style.borderColor = "#22c55e";
  }
}
