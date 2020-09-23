const currPicker = document.getElementById('currency');
const currOneAmount = document.getElementById('amount-one');
const currTwoAmount = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const reset = document.getElementById('button');

// Fetch Exchange rate from 3rd Party API and update DOM
// https://min-api.cryptocompare.com/data/price
async function calculate () {
    const currOneCode = currPicker.value;
    
    const res = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD');
    const data = await res.json();
    const resp = await fetch(`https://v6.exchangerate-api.com/v6/e6b30a4ddf004ae1a6aa110d/latest/USD`);
    const data1 = await resp.json();
    
    const exchangeRate = data1.conversion_rates[currOneCode];
    console.log(exchangeRate);
    const usdRate = data.USD;
    console.log(usdRate);  
    
    totalExchangeValue = (usdRate * exchangeRate).toFixed(0);
    rate.innerHTML = `1 Bitcoin = ${(totalExchangeValue)} ${currOneCode}`;
    currTwoAmount.value = (totalExchangeValue * currOneAmount.value);
    
}

// Reset Function for default Currencies
function resetFunc() {
    currOneAmount.value = 1
    currPicker.value = 'USD';
    calculate();

}

// Event Listners 
currPicker.addEventListener('change', calculate);
currOneAmount.addEventListener('input', calculate);
currTwoAmount.addEventListener('input', calculate);
reset.addEventListener('click', resetFunc);


calculate();