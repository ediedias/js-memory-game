const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
     if (lockBoard) return;
     if (this === firstCard) return;

     this.classList.add('flip');

     if (!hasFlippedCard) {
          hasFlippedCard = true;
          firstCard = this;
     } else {
          hasFlippedCard = false;
          secondCard = this;

          checkForMatch();
     }
}

function checkForMatch() {
     // Chck if the cards match by comparing their dataset attribute
     if (firstCard.dataset.framework === secondCard.dataset.framework) {
          // Cards match
          disableCards();
     } else {
          // Cards don't match
          unflipCards();
     }
}

function disableCards() {
     // Remove the event listeners to prevent further clicking
     firstCard.removeEventListener('click', flipCard);
     secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
     lockBoard = true;

     setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');

          lockBoard = false;
     }, 1000);
}

cards.forEach(card => card.addEventListener('click', flipCard));

(function shuffle() {
     cards.forEach(card => {
          let randomPos = Math.floor(Math.random() * 12);
          card.style.order = randomPos;
     });
})();
