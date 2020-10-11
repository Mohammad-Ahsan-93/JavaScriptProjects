const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealContainer = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');
const refresh = document.getElementById('refresh');

// Function to search meal from api and fetch the data
function searchMeal(e) {
    e.preventDefault()

    // Clear Selected Meal
    selectedMeal.innerHTML = '';

    // Get the search term from input field
    const term = search.value;

    // Check if search term exists
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results for '${term}'. Please try a different search.`
                } else {
                    mealContainer.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                    `)
                        .join('')
                }
            })
    } else {
        alert('Please Enter a valid search.')
        defaultDom()
    }

    // Clear Search Term
    search.value = '';

}

// Function to fetch meal data using the meal id
function getMealByID(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            addMealToDom(meal);
        })
}

// Function to add a meal to DOM
function addMealToDom(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    selectedMeal.innerHTML = `
        <div class="selected-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="selected-meal-info">
                ${meal.strCategory ? `<p> Food Category: ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p> Food Area: ${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>

    `;
}

// Function to add random meal on DOM
function randomMeal() {

    // Clear Previously search food item
    resultHeading.innerHTML = '';
    mealContainer.innerHTML = '';
    selectedMeal.innerHTML = '';

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => {
            const randMeal = data.meals[0];
            getMealByID(randMeal.idMeal);
        })
}

// Function to set default DOM
function defaultDom() {
    resultHeading.innerHTML = '';
    mealContainer.innerHTML = '';
    selectedMeal.innerHTML = '';
    
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
            const category = data.categories[0];
            mealContainer.innerHTML = data.categories.map(category => `
                        <div class="category">
                            <img src="${category.strCategoryThumb}" alt="${category.strCategory}"/>
                            <div class="category-info" data-categoryName="${category.strCategory}">
                                <h3>${category.strCategory}</h3>
                            </div>
                        </div>
                    `)
                .join('')

        })
}

// Function for Searching om Food Category
function getCategorybyName(categoryName) {
    const term = categoryName
    console.log(term);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search results for '${term}'. Please try a different search.`
                } else {
                    mealContainer.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `
                    ) 
                    .join('');
                }
               

        })
}



// Event Listeners 
// 1. Submit
submit.addEventListener('submit', searchMeal);

// 2. When Clicking a Meal
mealContainer.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    })

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealByID(mealID);
    }

})

// 3. Random Meal Selector 
random.addEventListener('click', randomMeal);


// 4. When Clicking on Category
mealContainer.addEventListener('click', e => {
    const categoryInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('category-info');
        } else {
            return false
        }
    })

    if (categoryInfo) {
        const categoryName = categoryInfo.getAttribute('data-categoryName');
        getCategorybyName(categoryName);
    }
})

// 5. Refresh Button
refresh.addEventListener('click', defaultDom);


defaultDom()