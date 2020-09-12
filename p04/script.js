// Getting Elements from DOM
const currOnePicker = document.getElementById('currency-one');
const currTwoPicker = document.getElementById('currency-two');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const flipbutton = document.getElementById('flip');
const rate = document.getElementById('rate');
const reset = document.getElementById('button');

// Fetch Exchange rate from 3rd party API and update DOM
// www.exchangerate-api.com
function calculate() {
    const currencyOneCode = currOnePicker.value;
    const currencyTwoCode = currTwoPicker.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/e6b30a4ddf004ae1a6aa110d/latest/${currencyOneCode}`)
        .then( res => res.json() )
        .then( data => {
            const exchangeRate = data.conversion_rates[currencyTwoCode];
            console.log(exchangeRate);

            // Display the conversion rate
            rate.innerText = `1 ${currencyOneCode} = ${exchangeRate} ${currencyTwoCode}`;

            // Apply Conversion Rate and Update Amount of Currency Two
            currTwoAmount.value = (exchangeRate * currOneAmount.value).toFixed(2);

        })
}

// Flip Function for the Flip Button to reverse currency exchange
function flip() {
    const temp = currOnePicker.value; 
    currOnePicker.value = currTwoPicker.value;
    currTwoPicker.value = temp;
    calculate();
}

// Reset Function for default Currencies
function resetFunc() {
    currOneAmount.value = 1
    currOnePicker.value = 'USD';
    currTwoPicker.value = 'PKR';
    calculate();

}

// Event Listners 
currOnePicker.addEventListener('change', calculate);
currTwoPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
flipbutton.addEventListener('click', flip);
reset.addEventListener('click', resetFunc);

calculate();