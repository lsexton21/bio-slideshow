const loadingScreen = document.getElementById("loadingScreen");
const mainDisplay = document.getElementById("mainDisplay");
const cardRow = document.getElementsByClassName("cardRow");
const allQuarters = document.getElementsByClassName("quarter");
const allNavHashtags = document.getElementsByClassName("hashtag");
const allCourses = document.getElementsByClassName("course");
const biology = document.getElementById("biology");
const forensics = document.getElementById("forensics");
const biologyList = document.getElementById("biologyList");
const forensicsList = document.getElementById("forensicsList");

const toggleBackwards = document.getElementById("toggleBackwards");
const toggleForwards = document.getElementById("toggleForwards");
const togglePhoneBackwards = document.getElementById("togglePhoneBackwards");
const togglePhoneForwards = document.getElementById("togglePhoneForwards");
const playPauseControls = document.getElementById("playPauseBtn");

const playPausePhoneControls = document.getElementById("togglePhonePlayPause");
const playSymbol = document.getElementById("playSymbol");
const pauseSymbol = document.getElementById("pauseSymbol");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const fullScreenIcon = document.getElementById("fullScreenIcon");
const compressScreenIcon = document.getElementById("compressScreenIcon");

const imgCard1Front = document.getElementsByClassName("imgCard1Front");
const imgCard2Front = document.getElementsByClassName("imgCard2Front");
const imgCard3Front = document.getElementsByClassName("imgCard3Front");
const imgCard1Back = document.getElementsByClassName("imgCard1Back");
const imgCard2Back = document.getElementsByClassName("imgCard2Back");
const imgCard3Back = document.getElementsByClassName("imgCard3Back");
const imgCardFront = document.getElementsByClassName("imgCardFront");
const imgCardBack = document.getElementsByClassName("imgCardBack");
const card1 = document.getElementsByClassName("card1");
const card2 = document.getElementsByClassName("card2");
const card3 = document.getElementsByClassName("card3");
const card1Front = document.getElementsByClassName("card1Front");
const card2Front = document.getElementsByClassName("card2Front");
const card3Front = document.getElementsByClassName("card3Front");
const card1Back = document.getElementsByClassName("card1Back");
const card2Back = document.getElementsByClassName("card2Back");
const card3Back = document.getElementsByClassName("card3Back");

for (hashtag of allNavHashtags) {
  if (document.URL.includes(hashtag.href)) {
    hashtag.style.color = "#000";
  }
}

if (document.URL.includes("biology")) {
  biology.style.color = "#000";
  biologyList.style.display = "flex";
} else if (document.URL.includes("forensics")) {
  forensics.style.color = "#000";
  forensicsList.style.display = "flex";
}

for (course of allCourses) {
  course.addEventListener("click", () => {
    loadingScreen.style.display = "flex";
    mainDisplay.style.display = "none";
  });
}
for (hashtag of allNavHashtags) {
  hashtag.addEventListener("click", () => {
    loadingScreen.style.display = "flex";
    mainDisplay.style.display = "none";
  });
}

const nextRowDelay = 40000;
const flippedDelay = 20000;

let currentRowCounter = 0;

let rotatingRowsIntervalID = 0;
let cardsFlippedIntervalID = 0;
let intervalHandler = 1;
let cardsRotating = false;
let cardsFlipped = false;

function cardsFlippedFunc() {
  if (cardsFlipped === false) {
    cardsFlipped = true;
    console.log(`Cards Flipped: ${cardsFlipped}`);
  } else {
    cardsFlipped = false;
    console.log(`Cards Flipped: ${cardsFlipped}`);
  }
}

function rotatingRows() {
  cardRow[currentRowCounter].style.display = "none";
  currentRowCounter = (currentRowCounter + 1) % cardRow.length;
  cardRow[currentRowCounter].style.display = "flex";
  console.log(`Current Row Number: ${currentRowCounter}`);
}

function runRotatingCards() {
  cardsRotating = true;
  cardsFlipped = false;
  console.log("Animation Started");
  console.log(`Current Row Number: ${currentRowCounter}`);
  cardsFlippedIntervalID = setInterval(cardsFlippedFunc, flippedDelay);
  cardRow[currentRowCounter].style.display = "flex";
  intervalID = setInterval(rotatingRows, nextRowDelay);
}

function playPauseFunc() {
  if (cardsRotating === true) {
    clearInterval(intervalID);
    clearInterval(cardsFlippedIntervalID);
    for (let img of imgCard1Front) {
      img.style.animationPlayState = "paused";
    }
    for (let img of imgCard2Front) {
      img.style.animationPlayState = "paused";
    }
    for (let img of imgCard3Front) {
      img.style.animationPlayState = "paused";
    }
    for (let img of imgCard1Back) {
      img.style.animationPlayState = "paused";
    }
    for (let img of imgCard2Back) {
      img.style.animationPlayState = "paused";
    }
    for (let img of imgCard3Back) {
      img.style.animationPlayState = "paused";
    }
    for (let card of card1) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card2) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card3) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card1Front) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card2Front) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card3Front) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card1Back) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card2Back) {
      card.style.animationPlayState = "paused";
    }
    for (let card of card3Back) {
      card.style.animationPlayState = "paused";
    }
    playPauseControls.innerText = "Play";
    pauseSymbol.style.display = "none";
    playSymbol.style.display = "inline";
    cardsRotating = false;
    console.log("Animation Paused");
  } else {
    runRotatingCards();
    for (let card of card1) {
      card.style.animation = "none";
      card.style.animation = "cardPlacement1 ease-in-out 40s infinite";
    }
    for (let card of card2) {
      card.style.animation = "none";
      card.style.animation = "cardPlacement2 ease-in-out 40s infinite";
    }
    for (let card of card3) {
      card.style.animation = "none";
      card.style.animation = "cardPlacement3 ease-in-out 40s infinite";
    }
    for (let card of card1Front) {
      card.style.animation = "none";
      card.style.animation = "card1FrontFlip ease-in-out 40s infinite";
    }
    for (let card of card2Front) {
      card.style.animation = "none";
      card.style.animation = "card2FrontFlip ease-in-out 40s infinite";
    }
    for (let card of card3Front) {
      card.style.animation = "none";
      card.style.animation = "card3FrontFlip ease-in-out 40s infinite";
    }
    for (let card of card1Back) {
      card.style.animation = "none";
      card.style.animation = "card1BackFlip ease-in-out 40s infinite";
    }
    for (let card of card2Back) {
      card.style.animation = "none";
      card.style.animation = "card2BackFlip ease-in-out 40s infinite";
    }
    for (let card of card3Back) {
      card.style.animation = "none";
      card.style.animation = "card3BackFlip ease-in-out 40s infinite";
    }
    playPauseControls.innerText = "Pause";
    pauseSymbol.style.display = "inline";
    playSymbol.style.display = "none";
  }
}

function rotatingRowsForwards() {
  cardsRotating = true;
  playPauseFunc();
  if (cardsFlipped === false) {
    for (let card of card1Front) {
      card.style.animation =
        "allCardsFlipBackForwards ease-in-out 0.5s forwards";
    }
    for (let card of card1Back) {
      card.style.animation =
        "allCardsFlipFrontForwards ease-in-out 0.5s forwards";
    }
    for (let card of card2Front) {
      card.style.animation =
        "allCardsFlipBackForwards ease-in-out 0.5s forwards";
    }
    for (let card of card2Back) {
      card.style.animation =
        "allCardsFlipFrontForwards ease-in-out 0.5s forwards";
    }
    for (let card of card3Front) {
      card.style.animation =
        "allCardsFlipBackForwards ease-in-out 0.5s forwards";
    }
    for (let card of card3Back) {
      card.style.animation =
        "allCardsFlipFrontForwards ease-in-out 0.5s forwards";
    }
    cardsFlipped = true;
    console.log(`Current Row Number: ${currentRowCounter}`);
  } else {
    for (let card of card1) {
      card.style.animation = "allCardsPositionDown ease-in-out 0.5s";
    }
    for (let card of card2) {
      card.style.animation = "allCardsPositionDown ease-in-out 0.5s";
    }
    for (let card of card3) {
      card.style.animation = "allCardsPositionDown ease-in-out 0.5s";
    }
    setTimeout(() => {
      cardRow[currentRowCounter].style.display = "none";
      currentRowCounter = (currentRowCounter + 1) % cardRow.length;
      cardRow[currentRowCounter].style.display = "flex";
      for (let card of card1) {
        card.style.animation = "allCardsPositionUp ease-in-out 0.5s";
      }
      for (let card of card2) {
        card.style.animation = "allCardsPositionUp ease-in-out 0.5s";
      }
      for (let card of card3) {
        card.style.animation = "allCardsPositionUp ease-in-out 0.5s";
      }
      console.log(`Current Row Number: ${currentRowCounter}`);
    }, 500);
    cardsFlipped = false;
  }
}

function rotatingRowsBackwards() {
  cardsRotating = true;
  playPauseFunc();
  if (cardsFlipped === false) {
    for (let card of card1) {
      card.style.animation = "allCardsPositionDown ease-in-out 0.5s";
    }
    for (let card of card2) {
      card.style.animation = "allCardsPositionDown ease-in-out 0.5s";
    }
    for (let card of card3) {
      card.style.animation = "allCardsPositionDown ease-in-out 0.5s";
    }
    setTimeout(() => {
      cardRow[currentRowCounter].style.display = "none";
      if (currentRowCounter > 0) {
        currentRowCounter = (currentRowCounter - 1) % cardRow.length;
      } else {
        currentRowCounter = cardRow.length - 1;
      }
      cardRow[currentRowCounter].style.display = "flex";
      for (let card of card1Front) {
        card.style.animation =
          "allCardsFlipBackForwards ease-in-out 0.1s forwards";
      }
      for (let card of card1Back) {
        card.style.animation =
          "allCardsFlipFrontForwards ease-in-out 0.1s forwards";
      }
      for (let card of card2Front) {
        card.style.animation =
          "allCardsFlipBackForwards ease-in-out 0.1s forwards";
      }
      for (let card of card2Back) {
        card.style.animation =
          "allCardsFlipFrontForwards ease-in-out 0.1s forwards";
      }
      for (let card of card3Front) {
        card.style.animation =
          "allCardsFlipBackForwards ease-in-out 0.1s forwards";
      }
      for (let card of card3Back) {
        card.style.animation =
          "allCardsFlipFrontForwards ease-in-out 0.1s forwards";
      }
      for (let card of card1) {
        card.style.animation = "allCardsPositionUp ease-in-out 0.5s";
      }
      for (let card of card2) {
        card.style.animation = "allCardsPositionUp ease-in-out 0.5s";
      }
      for (let card of card3) {
        card.style.animation = "allCardsPositionUp ease-in-out 0.5s";
      }
      console.log(`Current Row Number: ${currentRowCounter}`);
    }, 500);
    cardsFlipped = true;
    console.log(`Current Row Number: ${currentRowCounter}`);
    console.log(`Cards flipped: ${cardsFlipped}`);
  } else {
    for (let card of card1Front) {
      card.style.animation =
        "allCardsFlipFrontBackwards ease-in-out 0.5s forwards";
    }
    for (let card of card1Back) {
      card.style.animation =
        "allCardsFlipBackBackwards ease-in-out 0.5s forwards";
    }
    for (let card of card2Front) {
      card.style.animation =
        "allCardsFlipFrontBackwards ease-in-out 0.5s forwards";
    }
    for (let card of card2Back) {
      card.style.animation =
        "allCardsFlipBackBackwards ease-in-out 0.5s forwards";
    }
    for (let card of card3Front) {
      card.style.animation =
        "allCardsFlipFrontBackwards ease-in-out 0.5s forwards";
    }
    for (let card of card3Back) {
      card.style.animation =
        "allCardsFlipBackBackwards ease-in-out 0.5s forwards";
    }
    cardsFlipped = false;
    console.log(`Current Row Number: ${currentRowCounter}`);
    console.log(`Cards flipped: ${cardsFlipped}`);
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullScreenIcon.style.display = "none";
    compressScreenIcon.style.display = "block";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullScreenIcon.style.display = "block";
      compressScreenIcon.style.display = "none";
    }
  }
}

window.onload = playPauseFunc();

toggleBackwards.addEventListener("click", rotatingRowsBackwards);
toggleForwards.addEventListener("click", rotatingRowsForwards);
togglePhoneBackwards.addEventListener("click", rotatingRowsBackwards);
togglePhoneForwards.addEventListener("click", rotatingRowsForwards);
playPauseControls.addEventListener("click", playPauseFunc);
playPausePhoneControls.addEventListener("click", playPauseFunc);
fullScreenBtn.addEventListener("click", toggleFullScreen);
