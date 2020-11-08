const filter = document.getElementById('filter');
const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');

let limit = 25;
let page = 1;

// Get Post from the API
async function getPost() {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
}

// Show Post after fetch
async function showPost() {
    const posts = await getPost();
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>
        `;
        hideLoader()
        postContainer.appendChild(postElement);
    });
}

// Function to show Loader and add more posts from API
function showLoader() {
    loader.classList.add('show');
    
    setTimeout(()=> {
        page++;
        showPost();
    }, 1000)
    
    setTimeout(()=> {
        hideLoader()
    },1000);
}

// Function to Hide Loader
function hideLoader() {
    loader.classList.remove('show');
}

// Function to  filter displayed posts based on input
function filterPosts(e) {
    const filterTerm  = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach ( post => {
        const title = post.querySelector('.post-title').innerHTML.toUpperCase();
        const body = post.querySelector('.post-body').innerHTML.toUpperCase();

        if( title.indexOf(filterTerm) >-1 || body.indexOf(filterTerm) >-1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
    
}

// Display the initial fetch API posts
showPost();

// Event Handler
// 1. Create Event Handler for page Scroll
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight === scrollHeight)  {
        showLoader();
    }
    else if (scrollTop + clientHeight < scrollHeight - 50)  {
        hideLoader();
    }
})

// 2. Filter Posts that are already display
filter.addEventListener('input',filterPosts);




