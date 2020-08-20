const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// All fundtions
// function to show error
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Function to show success
function showSucess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Function to check is email is valid 
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Function to check if required fields have data
function checkRequired(inputArray) {
   inputArray.forEach(function(input) {
       if (input.value === '') {
           showError(input,`${getFeild(input)} is required`);
       } else {
           showSucess(input);
       }
   });
}

// Function to get id of the inout field
function getFeild(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
} 


// This is an event listener for the form on submit button
form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    checkRequired([username,email,password,password2]);
})

