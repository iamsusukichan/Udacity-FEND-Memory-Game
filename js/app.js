const SHOULD_SHUFFLE = true;
const PERFECT_GAME_MOVES_COUNT = 8;
const RATING_WORST_CASE = 2 * PERFECT_GAME_MOVES_COUNT;
const WIN_CONDITON = 8;

//-- Dom Handles ------------------------------------------------------
const $deck = document.querySelector(".deck");
const $resetButton = document.querySelector(".reset");
const $moves = document.querySelector(".moves");
const $stars = document.querySelector(".stars");
const $timerOutput = document.querySelector(".timer-output");

let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

let gameState = {
  playing: "playing",
  idle: "idle",
  won: "won"
};

let globalGameState = gameState.idle;

let openedCards = [];
let globalCardMatchCount = 0;
let globalSetTimeOutId = null;
let globalMovesCount = 0;
let globalSetIntervalId = null;
let globalGameStartTime = null;

//-- Program ----------------------------------------------------------
const stopGameTime = () => {
  if (globalSetIntervalId !== null) {
    clearInterval(globalSetIntervalId);
  }
};

const startGameTime = () => {
  globalGameStartTime = new Date();
  stopGameTime();
  globalSetIntervalId = setInterval(() => {
    // Seconds since the game started
    const deltaTimeInSec = Math.floor(
      (new Date() - globalGameStartTime) / 1000
    );

    // Getting whole minutes descarding the fraction part
    const minutes = Math.floor(deltaTimeInSec / 60)
      .toString()
      .padStart(2, "0");

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder_()
    const seconds = (deltaTimeInSec % 60).toString().padStart(2, "0");

    $timerOutput.textContent = `${minutes}:${seconds}`;
  }, 1000);
};

const restartGame = () => {
  globalGameState = gameState.idle;
  globalMovesCount = 0;
  globalCardMatchCount = 0;
  stopGameTime();
  makeGame();
};

const setDefaultStars = () => {
  $stars.innerHTML = "";
  $stars.appendChild(createStar(false));
  $stars.appendChild(createStar(false));
  $stars.appendChild(createStar(false));
};

const setRating = (moves, worstcase) => {
  $stars.innerHTML = "";

  if (moves > worstcase) {
    $stars.appendChild(createStar(false));
    $stars.appendChild(createStar(true));
    $stars.appendChild(createStar(true));
  } else if (moves > 0.5 * worstcase) {
    $stars.appendChild(createStar(false));
    $stars.appendChild(createStar(false));
    $stars.appendChild(createStar(true));
  } else {
    setDefaultStars();
  }
};

const handleWon = () => {
  gameState = gameState.won;
  stopGameTime();

  alert(`
    You won the game!
    
    Your time was: ${$timerOutput.textContent} and you used ${
    $moves.textContent
  } moves
  
  `);
};

const handleCardClick = event => {
  if (globalSetTimeOutId !== null || globalGameState === gameState.won) {
    return;
  }

  if (globalGameState === gameState.idle) {
    startGameTime();
    globalGameState = gameState.playing;
  }

  const card = event.target;
  //if no card was clicked
  if (openedCards.length === 0) {
    displayCard(card);
    openedCards.push(card);
  } else if (openedCards.length === 1) {
    const openedCard = openedCards[0];

    if (isCardItself(card, openedCard)) {
      return;
    }

    globalMovesCount += 1;
    $moves.textContent = globalMovesCount;
    setRating(globalMovesCount, RATING_WORST_CASE);

    displayCard(card);

    if (isSameCardClass(card, openedCard)) {
      card.classList.add("match");
      openedCard.classList.add("match");
      globalCardMatchCount += 1;
    } else {
      card.classList.add("unmatch");
      openedCard.classList.add("unmatch");
    }

    globalSetTimeOutId = setTimeout(() => {
      closeUnmatchedCards();
      openedCards = [];
      globalSetTimeOutId = null;

      if (globalCardMatchCount === WIN_CONDITON) {
        handleWon();
      }
    }, 1000);
  }
};

const createStar = isEmpty => {
  const $ele = document.createElement("li");
  $ele.innerHTML = `<i class="fa ${isEmpty ? "fa-star-o" : "fa-star"}"></i>`;
  return $ele;
};

const createCard = (cardClass, idx) => {
  const $ele = document.createElement("li");
  $ele.dataset.cardId = idx;
  $ele.dataset.cardClass = cardClass;
  $ele.className = "card";
  $ele.innerHTML = `<i class="fa ${cardClass}"></i>`;
  return $ele;
};

const makeGame = () => {
  $deck.innerHTML = "";
  $timerOutput.textContent = "00:00";
  $moves.textContent = "0";

  setDefaultStars();

  if (SHOULD_SHUFFLE) {
    shuffle(cards);
  }

  cards.forEach((cardClass, idx) => {
    const $card = createCard(cardClass, idx);

    $card.addEventListener("click", handleCardClick);
    $deck.appendChild($card);
  });
};

const isSameCardClass = (card1, card2) =>
  card1.dataset.cardClass === card2.dataset.cardClass;

const isCardItself = (card1, card2) =>
  card1.dataset.cardId === card2.dataset.cardId;

const displayCard = el => {
  el.classList.add("open", "show");
};

const closeUnmatchedCards = () => {
  let els = document.getElementsByClassName("unmatch");
  Array.from(els).forEach(el => {
    el.classList.remove("unmatch");
    el.classList.remove("show");
    el.classList.remove("open");
  });
};

const main = () => {
  makeGame();
  $resetButton.addEventListener("click", restartGame);
};

main();

//-- Helpers ----------------------------------------------------------

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
