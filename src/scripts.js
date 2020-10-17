let currentUser;
let currentRecipe;
let ingredientList = document.querySelector('.ingredients-view');
let recipeName = document.querySelector('.recipe-name');
let recipeView = document.querySelector('.recipe-view');
let recipeInstructions = document.querySelector('.recipe-instructions');
let recipeImg = document.getElementById('recipe-img');
let searchButton = document.querySelector('.search-button');
let randomRecipeName = document.querySelector('.random-recipe-name');
let randomRecipeImage = document.getElementById('large-dish-image');
let userPantryItems = document.querySelector('.pantry-items')
let userName = document.querySelector('.user-name')

window.onload = () => {
  displayOnPageLoad();
}

let searchDisplay = document.getElementById('search-results');

searchButton.addEventListener('click', searchAllRecipes);

// FOR HOME PAGE
function displayOnPageLoad() {
    displayUser();
    displayRandomRecipe();
    displayPantryItems();
}

function getRandomUser() {
  let userIndex = Math.floor(Math.random() * usersData.length);
  currentUser = new User(usersData[userIndex]);
}

function getRandomRecipe() {
  let recipeIndex = Math.floor(Math.random() * currentUser.recipes.recipeBook.length);
  currentRecipe = currentUser.recipes.recipeBook[recipeIndex];
}

function displayUser() {
  getRandomUser()
  userName.innerText = `Hello, ${currentUser.name}! Lets cook!`
}

function displayRandomRecipe() {
  getRandomRecipe();
  randomRecipeName.innerText = currentRecipe.name;
  randomRecipeImage.src = currentRecipe.image;
  userPantryItems.innerText = currentUser.pantry;
}

function formatPantry() {
  let formattedPantryItems = '';
  currentUser.pantry.contents.forEach(content => {
    formattedPantryItems +=
    `Name: ${content.name}
     Amount: ${content.pantryAmount}

    `;
  })
  return formattedPantryItems;
}

function displayPantryItems() {
  pantryItems = formatPantry();
  userPantryItems.innerText = pantryItems;
}

// FOR SPECIFIC RECIPE PAGE
function displayChosenRecipe(recipe) {
  recipeName.innerText = recipe.name;
  recipeImg.src = recipe.image;
  ingredientList.innerText = recipe.ingredients;
  recipeInstructions.innerText = recipe.instructions;
}

function searchAllRecipes() {
  searchDisplay.innerHTML = '<h1>Sorry, no matches to display.</h1>';
  let userInput = document.getElementById('user-search-texbox').value
  if (!userInput) return;
  displaySearchResults(userInput);
}

//TODO: Search results not displaying when searching for names
//TODO: Update Search result count display
//TODO: Formatting for user input

function displaySearchResults(userInput) {
  let typeResults = currentUser.filterRecipes(userInput);
  let ingredientResults = currentUser.searchByIngredient(userInput);
  searchResults = typeResults.concat(ingredientResults);
  if (searchResults.length === 0) return;
  searchDisplay.innerHTML = '';
  searchResults.forEach(result => {
    createHtmlRecipeBlock(result);
  })
}

function createHtmlRecipeBlock(result) {
  const recipeBlock = `
    <div class="single-recipe-result">
      <img id="small-dish-image" src=${result.image} alt="Recipe image">
      <h3 id="recipe-name">${result.name}</h3>
      <p id="recipe-tags">${result.tags}</p>
    </div>
  `
  searchDisplay.insertAdjacentHTML('beforeend', recipeBlock);
}
