const box = document.getElementById("box");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// ===== マウス操作 =====
box.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - box.offsetLeft;
  offsetY = e.clientY - box.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  box.style.left = (e.clientX - offsetX) + "px";
  box.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// ===== タッチ操作 =====
box.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  offsetX = touch.clientX - box.offsetLeft;
  offsetY = touch.clientY - box.offsetTop;
});

document.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const touch = e.touches[0];
  box.style.left = (touch.clientX - offsetX) + "px";
  box.style.top = (touch.clientY - offsetY) + "px";

  e.preventDefault(); // スクロール防止
}, { passive: false });

document.addEventListener("touchend", () => {
  isDragging = false;
});
