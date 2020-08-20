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
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSucess(input);
    } else {
        showError(input, `Please provide a valid Email`)
    }
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

// Function to check length of input field
function checkLength(input,min,max) {
    if ( input.value.length < min ) {
        showError(input, `${getFeild(input)} needs to be atlesat ${min}`);
    } else if ( input.value.length > max ) {
        showError(input, `${getFeild(input)} needs to be less than ${max}`);   
    } else {
        showSucess(input);
    }
}

// Function to check if password is equal to confirm password
function checkPasswordMatch(input1, input2) {
    if ( input1.value !== input2.value) {
        showError(input2, "Passwords are not matched");
    }
}

// Function to get id of the input field
function getFeild(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
} 


// This is an event listener for the form on submit button
form.addEventListener('submit',function(e) {
    e.preventDefault();
    
 
    checkRequired([username,email,password,password2]);
    checkLength(username,3,10);
    checkLength(password,6,30);
    checkEmail(email);
    checkPasswordMatch(password,password2);
})



