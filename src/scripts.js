let currentUser;
let homeView = document.getElementById('homepage');
let ingredientList = document.querySelector('.ingredients-view');
let randomRecipeImage = document.getElementById('large-dish-image');
let randomRecipeImg = document.getElementById('large-dish-image')
let randomRecipeName = document.getElementById('recipe-name');
let recipeImg = document.getElementById('recipe-img');
let recipeInstructions = document.querySelector('.recipe-instructions');
let recipeName = document.querySelector('.recipe-name');
let recipeView = document.querySelector('.recipe-view');
let searchButton = document.querySelector('.search-button');
let searchDisplay = document.getElementById('search-results');
let searchView = document.getElementById('search-display');
let userName = document.querySelector('.user-name');
let userPantryItems = document.querySelector('.pantry-items');
let favoritesView = document.querySelector('.saved-log');

window.onload = () => {
  displayOnPageLoad();
}

searchButton.addEventListener('click', searchAllRecipes);

// FOR HOME PAGE
function displayOnPageLoad() {
    displayUser();
    displayRandomRecipe();
    displayPantryItems();
}

function displayHomepage () {
  toggleView(homeView);
  displaySavedRecipes();
}

function displaySavedRecipes() {
  favoritesView.innerHTML = "<p>You have no saved or favortied recipes.</p>";
  if (!currentUser.recipesToCook && !currentUser.favoriteRecipes) return;
  favoritesView.innerHTML = "";
  let savedRecipes = currentUser.recipesToCook.concat(currentUser.favoriteRecipes);
  savedRecipes = Array.from(new Set(savedRecipes));
  savedRecipes.forEach(recipe => {
    favoritesView.insertAdjacentHTML('beforeend', createHtmlRecipeBlock(recipe));
  });
}

function getRandomUser() {
  let userIndex = Math.floor(Math.random() * usersData.length);
  currentUser = new User(usersData[userIndex]);
}

function getRandomRecipe() {
  let recipeIndex = Math.floor(Math.random() * currentUser.recipes.recipeBook.length);
  return currentUser.recipes.recipeBook[recipeIndex];
}

function displayUser() {
  getRandomUser()
  userName.innerText = `Hello, ${currentUser.name}! Lets cook!`
}

function displayRandomRecipe() {
  let currentRecipe = getRandomRecipe();
  randomRecipeName.innerText = currentRecipe.name;
  randomRecipeImage.src = currentRecipe.image;
  randomRecipeImage.setAttribute("onclick", `displayChosenRecipe(${currentRecipe.id})`);
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
function toggleView(viewToShow) {
  let views = [homeView, searchView, recipeView];
  views.forEach(view => {
    view.classList.add('hidden');
  })
  viewToShow.classList.remove('hidden');
}

function formatInstructions(recipe) {
  let formattedInstructions = '';
  recipe.instructions.forEach(instruction => {
    formattedInstructions +=
    `Step${instruction.number} : ${instruction.instruction}

    `;
  })
  return formattedInstructions;
}

function displayChosenRecipe(recipeId) {
  toggleView(recipeView);
  let recipe = getRecipeObject(recipeId);
  recipeName.innerText = recipe.name;
  recipeImg.src = recipe.image;
  ingredientList.innerText = recipe.ingredients;
  recipeInstructions.innerText = formatInstructions(recipe);
}

function searchAllRecipes() {
  toggleView(searchView);
  searchDisplay.innerHTML = '<h1>Sorry, no matches to display.</h1>';
  let userInput = document.getElementById('user-search-texbox').value
  if (!userInput) return;
  displaySearchResults(userInput);
}

function displaySearchResults(userInput) {
  let typeResults = currentUser.filterRecipes(userInput);
  let ingredientResults = currentUser.searchByIngredient(userInput);
  let searchResults = typeResults.concat(ingredientResults);
  if (searchResults.length === 0) return;
  searchDisplay.innerHTML = '';
  console.log(searchResults);
  searchResults.forEach(result => {
    searchDisplay.insertAdjacentHTML('beforeend', createHtmlRecipeBlock(result));
  })
}

function getRecipeObject(recipeId) {
  return currentUser.recipes.recipeBook.find(recipe => recipe.id === recipeId);
}

function updateFavoriteRecipe(recipeId) {
  let recipe = getRecipeObject(recipeId);
  if (currentUser.favoriteRecipes.includes(recipe)) {
    currentUser.removeFavoriteRecipe(recipe);
  } else {
    currentUser.addFavoriteRecipe(recipe);
  }
  // debugger;
  toggleIcon('heart', recipeId);
}

function updateCookLaterRecipe(recipeId) {
  let recipe = getRecipeObject(recipeId);
  if (currentUser.recipesToCook.includes(recipe)) {
    currentUser.removeRecipeToCook(recipe);
  } else {
    currentUser.addRecipeToCook(recipe);
  }
  toggleIcon('chef', recipeId);
}

function toggleIcon(icon, recipeId) {
  console.log(icon, recipeId);
  let currentIcon = document.getElementById(`${icon}-${recipeId}`)
  if (currentIcon.getAttribute('src') == `../assets/${icon}.svg`) {
    currentIcon.setAttribute('src', `../assets/${icon}-clicked.svg`);
  } else {
    currentIcon.setAttribute('src', `../assets/${icon}.svg`);
  }
}

function createHtmlRecipeBlock(recipe) {
  let favHighlight = "";
  let cookHighlight = "";
  if (currentUser.favoriteRecipes.includes(recipe)) favHighlight = "-clicked";
  if (currentUser.recipesToCook.includes(recipe)) cookHighlight = "-clicked";
  let recipeBlock = `
    <div class="single-recipe-result">
      <img id="small-dish-image" src=${recipe.image} alt="Recipe ${recipe.id}" onclick="displayChosenRecipe(${recipe.id})">
      <h3 id="recipe-name-card" onclick="displayChosenRecipe(${recipe.id})">${recipe.name}</h3>
      <p id="recipe-tags-card" onclick="displayChosenRecipe(${recipe.id})">${recipe.tags}</p>
      <img class="icon chef-icon" id="chef-${recipe.id}" src="../assets/chef${cookHighlight}.svg" onclick="updateCookLaterRecipe(${recipe.id})">
      <img class="icon heart-icon" id="heart-${recipe.id}" src="../assets/heart${favHighlight}.svg" onclick="updateFavoriteRecipe(${recipe.id})">
    </div>
  `;
  return recipeBlock;
}
