const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const popup = document.getElementById('popup-container');
const message = document.getElementById('win-lose');
const restartButton = document.getElementById('restart');
const notification = document.getElementById('slider-container');

const hangmanParts = document.querySelectorAll('.hangman-part');

// An array of words to select from
const wordPool = ['javascript', 'computer', 'hangman', 'facebook', 'youtube'];

// Selecting a word at random from the pool 
let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];

// Arrays to classify the input of the user
const correctLetters = [];
const incorrectLetters = [];


// Functions to display the word on the screen
function displaySelectedWord() {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(
                letter => `
                    <span class="letter">
                        ${correctLetters.includes(letter) ? letter : ''}
                    </span>
                `
            )
            .join('')
        }
    `;

    const wordText = word.innerText.replace(/\n/g, '');

    if( wordText === selectedWord ) {
        message.innerText = 'You Won!';
        popup.style.display = 'flex';
    }

}

// Function to display the sliding notification
function showNotification() {
    notification.classList.add('show');
    setTimeout( () => {notification.classList.remove('show');}, 3000);
}

// Function to Update Incorrect Letters 
function updateWrongLetters() {
    // Update wrong letters
    wrongLetters.innerHTML = `
        ${incorrectLetters.length > 0 ? `<p>Wrong Guess</p>` : ''}
        ${incorrectLetters.map( letter => `<span>${letter}</span>`)}
    `;

    // Update Hangman body parts
    hangmanParts.forEach( (part, index) => {
        const errors = incorrectLetters.length;

        if (index < errors ) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Show Pop-up is loss
    if (incorrectLetters.length === hangmanParts.length) {
        message.innerText = 'You Lost';
        popup.style.display = 'flex';
    }


}


// Event Listners
//1. Event Listner for KeyBoard Button Press
window.addEventListener('keydown', e => {
    if ( e.keyCode >= 65 && e.keyCode <= 90 ) {
        const letter = e.key;

        if (selectedWord.includes(letter) ) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displaySelectedWord();
            } else {
                showNotification();
            }
        } else {
            if (!incorrectLetters.includes(letter)) {
                incorrectLetters.push(letter);
                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})

//2. Event Listener for Restart Button
restartButton.addEventListener('click', () => {
    // Empty Arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);

    // Get a New selected word from word pool
    let selectedWord = wordPool[Math.floor(Math.random() * wordPool.length)];
    displaySelectedWord();

    // Clear the Wrong letters Div
    updateWrongLetters();

    // Hide the Popup
    popup.style.display = 'none';

}) 


displaySelectedWord();