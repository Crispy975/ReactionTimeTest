const mainMenu =document.querySelector(".main-screen");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(".end-screen .reaction-time-text");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;
let scores;

const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
    scores = [];
};

init();

const setGreenColor = () => {
    clickableArea.style.backgroundColor = "LimeGreen";
    message.innerHTML = "TO SLOW CHUCKLE NUTS! Click NOW!";
    message.style.color = "#111";
    greenDisplayed = true;
    timeNow = Date.now();
};

const startGame = () => {
    clickableArea.style.backgroundColor = "Red";
    message.innerHTML = "WAIT FOR IT...";
    message.style.color = "white";

    let randomNumber =Math.floor(Math.random() * 3000 + 5000);
    timer = setTimeout(setGreenColor, randomNumber);

    waitingForStart = false;
    waitingForGreen = true;

};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

const endGame = () => {
    endScreen.classList.add("active");
    clearTimeout(timer);

    let total = 0;

    scores.forEach((s) => {
        total += s;
    });

    let averageScore = Math.round(total / scores.length);

    reactionTimeText.innerHTML = `${averageScore} ms`;
};

const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "pink";
    message.innerHTML = `<div class="reaction-time-text">${rt} ms</div>Click to continue.
    `;
    greenDisplayed = false;
    waitingForStart = true;
    scores.push(rt);

    if (scores.length >= 3) {
        endGame();
    }
};
const displayTooSoon = () => {
    clickableArea.style.backgroundColor = "Orange";
    message.innerHTML = "Too soon! Chuckle NUTS! Try AGAIN!";
    message.style.color = "Black";
    waitingForStart = true;
    clearTimeout(timer);
};

clickableArea.addEventListener("click", () => {
    if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        displayReactionTime(reactionTime);
        return;
    }

    if (waitingForStart) {
        startGame();
        return;
    }

    if (waitingForGreen) {
        displayTooSoon();
    }
});

playAgainBtn.addEventListener("click", () => {
    endScreen.classList.remove("active");
    init();
    startGame();
});