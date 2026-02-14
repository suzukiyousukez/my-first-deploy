const cards = document.querySelectorAll(".card");
const field = document.getElementById("field");
const message = document.getElementById("message");

let currentCard = null;
let offsetX = 0;
let offsetY = 0;
let summoned = false;

cards.forEach(card => {

  card.addEventListener("pointerdown", (e) => {
    if (summoned) return;

    currentCard = card;

    card.style.position = "absolute";
    card.style.zIndex = 1000;

    offsetX = e.clientX - card.offsetLeft;
    offsetY = e.clientY - card.offsetTop;

    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", (e) => {
    if (!currentCard || summoned) return;

    card.style.left = (e.clientX - offsetX) + "px";
    card.style.top = (e.clientY - offsetY) + "px";
  });

  card.addEventListener("pointerup", (e) => {
    if (!currentCard || summoned) return;

    card.releasePointerCapture(e.pointerId);

    checkSummon(card);

    currentCard = null;
  });

});

function checkSummon(card) {

  const cardRect = card.getBoundingClientRect();
  const fieldRect = field.getBoundingClientRect();

  const isInside =
    cardRect.left < fieldRect.right &&
    cardRect.right > fieldRect.left &&
    cardRect.top < fieldRect.bottom &&
    cardRect.bottom > fieldRect.top;

  if (isInside) {
    summoned = true;

    message.style.display = "block";
    field.style.borderColor = "#22c55e";

    // 他カードロック
    cards.forEach(c => {
      if (c !== card) {
        c.classList.add("locked");
      }
    });
  }
}
