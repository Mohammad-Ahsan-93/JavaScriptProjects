// Getting Dom Elements
const cardContainer = document.getElementById('card-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn')
const currentCard = document.getElementById('current-card');
const addCardContainer = document.getElementById('add-card-container');
const addCardBtn = document.getElementById('add-card');
const closeCardBtn = document.getElementById('close-card');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const addNewCardBtn = document.getElementById('add-card-btn');
const clearBtn = document.getElementById('clear-btn');

// Track Current Card
let currentActiveCard = 0;

// Collection of card DOM Elements
const cardElements = [];

// Collection of card data
const cardsData = getCardsData();

// All Functions
// 1. Function to create all cards
function createCards() {
    cardsData.forEach( (data, index) => createCard(data, index) );
}

// 2. Function to create a card
function createCard(data, index) {
    // Create the div for the card
    const card = document.createElement('div');
    // Assign the card class
    card.classList.add('card');
    // Check for the first card and assign active class
    if ( index === 0 ) {
        card.classList.add('active');
    }
    // Create the innerHTML for a card
    card.innerHTML = `
        <div class="inner-card">
            <div class="card-front">
                <p>${data.question}</p>
            </div>
            <div class="card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    // Event Listner to flip the card on click
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    // Add the newly created card to the collection of card DOM
    cardElements.push(card);
    // Add the card to the DOM
    cardContainer.appendChild(card);
    // Display the current card / total card value
    updateCurrentCardText();
}

// 3. Function to show the current card / total number of cards in navigation
function updateCurrentCardText() {
    currentCard.innerHTML = `<p>${currentActiveCard + 1} / ${cardElements.length}</p>`; 
}

// 4. Get Cards Data from Local Storga 
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Function to Save Card Data to local Storage
function saveCardData(cards) {
    // Save card data to local Storage
    localStorage.setItem('cards', JSON.stringify(cards));
    // Reload Window
    window.location.reload();
}

createCards();

// 1. Event Listner for next button
nextBtn.addEventListener('click', () => {
    // Hide the current card and move to left
    cardElements[currentActiveCard].className = 'card left';
    // Increment the current active card tracker 
    currentActiveCard++;
    // Check id last card
    if ( currentActiveCard > cardElements.length - 1 ) {
        currentActiveCard = cardElements.length - 1;
    }
    // Display the new Card
    cardElements[currentActiveCard].className = 'card active';
    // Update the Current Card Number
    updateCurrentCardText();
})

// 2. Event Listner for next button
prevBtn.addEventListener('click', () => {
    // Hide the current card and move to right
    cardElements[currentActiveCard].className = 'card right';
    // Decrement the current active card tracker
    currentActiveCard--;
    // Check id last card
    if ( currentActiveCard < 0 ) {
        currentActiveCard = 0;
    }
    // Display the new Card
    cardElements[currentActiveCard].className = 'card active';
    // Update the Current Card Number
    updateCurrentCardText();
})

// 3. Create event listner to Add New Card Form
addCardBtn.addEventListener('click', () => {
    addCardContainer.classList.add('show');
})

// 4. Close the Add New Card Form
closeCardBtn.addEventListener('click' , () => {
    addCardContainer.classList.remove('show');
})

// 5. Event Listner to Submit Form
addNewCardBtn.addEventListener('click', () => {
    // User the User Inout from Text fields
    const questionInput = question.value;
    const answerInput = answer.value;  
    // Check to make sure input are not null
    if ( questionInput.trim() && answerInput.trim() ) {
        // Create a new objrct using the user Inputs
        const newCard = { question: questionInput, answer: answerInput }
        // Using the newCard Object, create a card element using the createCard function
        createCard(newCard);
        // Reset Form fields
        question.value = '';
        answer.value = '';
        // Hide Card after Submit
        addCardContainer.classList.remove('show');
        // Add the new card object to the cardsData
        cardsData.push(newCard);
        // Save Data to local Storage and reload page
        saveCardData(cardsData);
    }
})

// 6. Event Listner to Clear ALl Cards
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardContainer.innerHTML = '';
    window.location.reload();
    currentCard.innerHTML = '<p></p>';
})