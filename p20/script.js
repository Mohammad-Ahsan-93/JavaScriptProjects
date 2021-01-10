// Getting DOM elements
const welcomeScreen = document.getElementById("welcomeScreen");
const gameArea = document.getElementById("gameArea");
const newGameButton = document.getElementById("newGameButton");
const easyModeButton = document.getElementById("easy");
const hardModeButton = document.getElementById("hard");
const textOutput = document.getElementById("textOutput");
const inputBox = document.getElementById("inputBox");
const attemptFrequency = document.getElementById("attempts");
const previousGuesses = document.getElementById("guesses");
const rangeOutput = document.getElementById("rangeOutput");
const lowValue = document.getElementById("low");
const space = document.getElementById("space");
const highValue = document.getElementById("high");


let computerGuess;
let userGuesses = [];
let attempts = 0;
let maxGuesses;

let low = 1;
let high = 100;

init();

function updateRange() {
    rangeOutput.innerText = `${low} - ${high}`;
    rangeOutput.style.marginLeft = low + "%";
    rangeOutput.style.marginRight = 100 - high + "%";
    rangeOutput.classList.add("flash");

    lowValue.style.flex = low + "%";
    lowValue.style.background = "#ef7b54";

    space.style.flex = high - low + "%";
    space.style.background = "#83E1D0";

    if (high == 100) highValue.style.flex = 0;
    highValue.style.flex = 100 - high + "%";
    highValue.style.background = "#ef7b54";
}

function gameEnded() {
    newGameButton.style.display = "inline";
    inputBox.setAttribute("readonly", "readonly"); // (attr name, attr value)
}

function newGame() {
    window.location.reload();
}

function init() {
    computerGuess = Math.floor(Math.random() * 100 + 1);
    newGameButton.style.display = "none";
    gameArea.style.display = "none";
}

function startGameView() {
    welcomeScreen.style.display = "none";
    gameArea.style.display = "block";
}

function easyMode() {
    maxGuesses = 10;
    startGameView();
}

function hardMode() {
    maxGuesses = 5;
    startGameView();
}

function compareGuess() {
    const userGuess = Number(inputBox.value);
    userGuesses.push(" " + userGuess);
    previousGuesses.innerHTML = userGuesses;
    attempts++;
    attemptFrequency.innerHTML = attempts;

    if (attempts < maxGuesses) {
        if (userGuess > computerGuess) {
            if (userGuess < high) high = userGuess;
            textOutput.innerHTML = "Your guess is too high";
            inputBox.value = "";
        } else if (userGuess < computerGuess) {
            if (userGuess > low) low = userGuess;
            textOutput.innerHTML = "Your guess is too low";
            inputBox.value = "";
        } else {
            textOutput.innerHTML = "Correct! you got it in " + attempts + " attempts";
            gameEnded();
        }
    } else {
        if (userGuess > computerGuess) {
            textOutput.innerHTML = "YOU LOSE!, <br> The number was " + computerGuess;
            gameEnded();
        } else if (userGuess < computerGuess) {
            textOutput.innerHTML = "YOU LOSE!, <br> The number was " + computerGuess;
            gameEnded();
        } else {
            textOutput.innerHTML = "Correct! You got it in " + attempts + " attempts";
            gameEnded();
        }
    }
    updateRange();
}

// Event Listners 
// 1. Event Listener for Easy Mode
easyModeButton.addEventListener('click', easyMode);

// 2. Event Listener for Hard Mode
hardModeButton.addEventListener('click', hardMode);

// 3. Event Listener for New Game Button
newGameButton.addEventListener('click', newGame);

// 4. Event Listner for inputBox
inputBox.addEventListener('change', compareGuess);