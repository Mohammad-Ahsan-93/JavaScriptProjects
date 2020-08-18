const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// All fundtions
// function to shoe error
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
}



// This is an event listener for the form on submit button
form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    if (username.value === '') {
        showError(username,'Username is required')
    }
})

