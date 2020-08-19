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

// FUnction to show success
function showSucess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}



// This is an event listener for the form on submit button
form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    if (username.value === '') {
        showError(username,'Username is required')
    } else {
        showSucess(username);
    }

    if (email.value === '') {
        showError(email,'email is required')
    } else {
        showSucess(email);
    }

    if (password.value === '') {
        showError(password,'password is required')
    } else {
        showSucess(password);
    }
    
    if (password2.value === '') {
        showError(password2,'password2 is required')
    } else {
        showSucess(password2);
    }
})

