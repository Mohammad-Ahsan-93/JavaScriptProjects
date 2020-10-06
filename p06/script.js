const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');


// Add EventListners
// 1. Toggle the NAV
toggle.addEventListener('click', () => 
    document.body.classList.toggle('show-nav')
);

// 2. Show the Modal
open.addEventListener('click', () => 
    modal.classList.add('show-modal')
);

// 3. Close the Modal
close.addEventListener('click', () =>
    modal.classList.remove('show-modal')
);

// 4. Close the Modal on click outside Modal
window.addEventListener('click', e =>
    e.target === modal ? modal.classList.remove('show-modal') : false
);