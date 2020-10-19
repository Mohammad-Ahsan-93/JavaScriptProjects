const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const description = document.getElementById('description');
const amount  = document.getElementById('amount');

// Populate UI
function populateUI() {
    const saved = JSON.parse(localStorage.getItem('abc'));
    console.log(saved);
};

// Fucntion for History
function savedTransactions() {
    localStorage.setItem('abc', JSON.stringify(transactions));
}

// Dummy Transactions
const savedTransaction = [
];

let transactions = savedTransaction;
console.log(savedTransaction);

// Function to generate an ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}


//function to add New Transaction from the form
function addTransaction(e) {
    e.preventDefault();

    if ( description.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter a valid description and transaction amount.')
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
        transactions.push(transaction);
        addTransactionUI(transaction);
        updateSums();

        savedTransactions()
        
        description.value = '';
        amount.value = '';
    }
}

// Function to remove transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id != id);

    init();
}


// Function to Display Transactions in Transaction History 
function addTransactionUI(transaction) {
    // Classify if Income or Expense
    const type = transaction.amount > 0 ? '+' : '-';

    // Create DOM Element for list 
    const item = document.createElement('li');

    // Add class for list item based on type
    item.classList.add( transaction.amount > 0 ? 'plus' : 'minus');

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);
}

// Function to update the balance, income and expense summaries
function updateSums() {
    // Create array of transaction amounts from transaction array
    const amounts = transactions.map( transaction => transaction.amount );

    // Calculate total value for balance
    const total = amounts
                    .reduce( (acc, amount) => ( acc += amount ), 0)
                    .toFixed(2);

    // Calculate total income      
    const income = amounts
                    .filter( amount => amount > 0)
                    .reduce( (acc, amount) => ( acc += amount ), 0)
                    .toFixed(2);
    
    // Calculate total expense      
    const expense = amounts
                    .filter( amount => amount < 0)
                    .reduce( (acc, amount) => ( acc += amount ), 0)
                    .toFixed(2);                   

    // Update Balance in DOM
    balance.innerText = `${total} PKR`;    

    // Update Income in DOM
    money_plus.innerText = `${income} PKR`;

    // Update Expense in DOM
    money_minus.innerText = `${expense} PKR`;
}


// function to initialize app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionUI);
    updateSums();
}

// Event Listeners
// 1. Event Listener for form Submit
form.addEventListener('submit', addTransaction);

init();