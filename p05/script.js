// Getting DOM Elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMellionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');
const reset = document.getElementById('reset');

// initializing Data Array
let data = [];

// FUnction to fetch Random User from API
// API: randomuser.me/api
async function generateRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
 
    const user = data.results[0];
    console.log(user);
    
    const newUser = {
        image: user.picture.thumbnail,
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random()*1000000)
    }
    addData(newUser);
}

// Add Newly Generated User into Data Array 
function addData(newUser) {
    data.push(newUser);
    updateDom();
}

// Function to Double the Net Worth of Each User 
function doubleWorth() {
    data = data.map( item => {
        return { ...item, worth: item.worth * 2 }
    });
    updateDom();
}

// Function to Sort the Users by Richest Users
function sortRichest() {
    data.sort( (a, b) => b.worth - a.worth) ;
    // (a, b) => b.worth - a.worth its a compare function use in sort method for numerics
    updateDom();
} 

// Function to Filter the Users and Only Show Millionaires
function showMillionaires() {
    data = data.filter(
        item => item.worth > 1000000
    );
    updateDom();
} 

// Function to Calculate Total Net Worth of all Users
function calculateTotalNetWorth() {
    const totalWorth = data.reduce(
        (acc, item) => (acc += item.worth), 0
    );
    const totalNetWorth = document.createElement('div');
    totalNetWorth.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild(totalNetWorth);
} 

// Function to Rest DOM
function resetDom() {
    main.innerHTML = '<h2> <strong> Picture </strong> <strong> Name </strong> Net Worth</h2>'
}

// Function to Update the UI with DOM
function updateDom(inputData = data) {
    main.innerHTML = '<h2> <strong> Picture </strong> <strong> Name </strong> Net Worth</h2>'

    inputData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('name');
        element.innerHTML = `<img src=${item.image}> <strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);
    } );
}

// Function to format a number as a currency
function formatCurrency(num) {
    return 'PKR ' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listners
// 1. Add User Event Listner 
addUserButton.addEventListener('click', generateRandomUser);

// 2. Add Double Money Event Listner
doubleMoneyButton.addEventListener('click', doubleWorth);

// 3. Add Sort Event Listner
sortButton.addEventListener('click', sortRichest);

// 4. Add Show Millionaires Event Listner
showMellionairesButton.addEventListener('click', showMillionaires);

// 5. Add Calculate Total Wealth Event Listner
totalButton.addEventListener('click', calculateTotalNetWorth);

// 6. Add Reset Event Listner
reset.addEventListener('click', resetDom);