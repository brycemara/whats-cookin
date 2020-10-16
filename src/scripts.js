let currentUser;
let currentRecipe;

window.onload = () => {
  displayOnPageLoad();
}

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

searchButton.addEventListener('click', () => {displayRecipe(recipe)});

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
