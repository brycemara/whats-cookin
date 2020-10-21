let currentUser;
let homeView = document.getElementById('homepage');
let ingredientList = document.querySelector('.recipe-ingredients');
let randomRecipeImage = document.getElementById('large-dish-image');
let randomRecipeImg = document.getElementById('large-dish-image');
let randomRecipeName = document.getElementById('recipe-name');
let recipeImg = document.getElementById('recipe-img');
let recipeInstructions = document.querySelector('.recipe-instructions');
let recipeName = document.querySelector('.recipe-name');
let recipeView = document.querySelector('.recipe-view');
let searchButton = document.getElementById('search-all-button');
let searchDisplay = document.getElementById('search-results');
let searchView = document.getElementById('search-display');
let userName = document.querySelector('.user-name');
let userPantryItems = document.querySelector('.pantry-items');
let favoritesView = document.querySelector('.saved-log');
let userSearchInput = document.getElementById('user-search-textbox');
let searchFavButton = document.getElementById('search-favorite-button');
let favoriteRecipeButton = document.querySelector('.favorite-recipes');


window.onload = () => {
  displayOnPageLoad();
};

searchButton.addEventListener('click', searchAllRecipes);
searchFavButton.addEventListener('click', searchFavoriteRecipes);

// FOR HOME PAGE
function displayOnPageLoad() {
  displayUser();
  displayRandomRecipe();
  displayPantryItems();
}

function displayHomepage() {
  userSearchInput.value = "";
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
  getRandomUser();
  userName.innerText = `Hello, ${currentUser.name}!
  Lets cook!`;
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
  });
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
  });
  viewToShow.classList.remove('hidden');
}

function clearChosenRecipeFeild() {
  userSearchInput.value = "";
  toggleView(recipeView);
  document.querySelector('.recipe-icon').innerText = '';
}

function displayChosenRecipe(recipeId) {
  clearChosenRecipeFeild();
  let recipe = getRecipeObject(recipeId);
  checkIfCanMakeAndDisplay(recipeId);
  makeChosenRecipeDisplay(recipe);
}

function makeChosenRecipeDisplay(recipe) {
  recipeName.innerText = recipe.name;
  recipeImg.src = recipe.image;
  ingredientList.innerText = formatIngredients(recipe);
  recipeInstructions.innerText = formatInstructions(recipe);
  document.querySelector('.recipe-cost').innerText = `Cost of Recipe: $${recipe.getCostOfIngredients(recipe)}`;
  document.querySelector('.recipe-icon').insertAdjacentHTML('beforeend', createHTMLRecipeIcon(recipe));
}

function createHTMLRecipeIcon(recipe) {
  let favHighlight = "";
  let cookHighlight = "";
  if (currentUser.favoriteRecipes.includes(recipe)) favHighlight = "-clicked";
  if (currentUser.recipesToCook.includes(recipe)) cookHighlight = "-clicked";
  let recipeIcons =
  `<img class="icon chef-recipe-icon chef-${recipe.id}" id="chef-${recipe.id}" src="../assets/chef${cookHighlight}.svg" onclick="updateCookLaterRecipe(${recipe.id})">
  <img class="icon heart-recipe-icon heart-${recipe.id}" id="heart-${recipe.id}" src="../assets/heart${favHighlight}.svg" onclick="updateFavoriteRecipe(${recipe.id})">
  `;
  return recipeIcons;
}

function formatInstructions(recipe) {
  let formattedInstructions = '';
  recipe.instructions.forEach(instruction => {
    formattedInstructions +=
    `Step ${instruction.number}: ${instruction.instruction}

    `;
  });
  return formattedInstructions;
}

function formatIngredients(recipe) {
  let formattedIngredients = '';
  recipe.ingredients.forEach(ingredient => {
    formattedIngredients +=
    `${ingredient.name}
    ${ingredient.recipeAmount.amount} ${ingredient.recipeAmount.unit}

    `;
  });
  return formattedIngredients;
}

function checkIfCanMakeAndDisplay(recipeId) {
  let checkIngredients = document.querySelector('.check-ingredients');
  let recipe = getRecipeObject(recipeId);
  if (currentUser.pantry.hasNeededIngredients(recipe)) {
    checkIngredients.innerHTML = `<h3>You can cook this!</h3>
    <button class="cooked-button" onclick="cookRecipe(${recipeId})">I cooked this!</button>`;
  } else {
    let missingIngredients = currentUser.pantry.getIngredientsNeeded(recipe);
    checkIngredients.innerHTML = `<p>Missing Ingredients:
    </p> <p>${formatMissingIngredients(missingIngredients)}</p>`;
  }
}

function formatMissingIngredients(missingIngredients) {
  let formattedIngredients = "";
  missingIngredients.forEach(ingredient => {
    formattedIngredients += `${ingredient.amountMissing} ${ingredient.unit} ${ingredient.name}, `;
  })
  formattedIngredients = formattedIngredients.slice(0, formattedIngredients.length-2);
  return formattedIngredients;
}

function cookRecipe(recipeId) {
  let recipe = getRecipeObject(recipeId);
  currentUser.pantry.removeUsedIngredients(recipe);
}


// SEARCH BAR FUNCTIONALITY AND DISPLAY
function getUserInput() {
  searchDisplay.innerHTML = '<h1>Sorry, no matches to display.</h1>';
  let userInput = userSearchInput.value;
  userSearchInput.value = "";
  toggleView(searchView);
  return userInput;
}

function searchAllRecipes() {
  let userInput = getUserInput();
  if (userInput == "") return;
  displaySearchResults(userInput);
}

function displaySearchResults(userInput) {
  let searchResults = currentUser.searchAllRecipes(userInput);
  updateSearchResultsCount(userInput, searchResults.length);
  if (searchResults.length === 0) return;
  makeMultipleBlocks(searchResults, searchDisplay);
}

function searchFavoriteRecipes() {
  let userInput = getUserInput();
  if (userInput == "") return;
  let favoriteResults = currentUser.searchFavoriteRecipes(userInput);
  updateSearchResultsCount(userInput, favoriteResults.length);
  if (favoriteResults.length === 0) return;
  makeMultipleBlocks(favoriteResults, searchDisplay);
}

function checkIcon(list, recipe) {
  let highlight;
  if (currentUser[list].includes(recipe)) {
    highlight = "-clicked";
  } else {
    highlight = "";
  }
  return highlight;
}

function createHtmlRecipeBlock(recipe) {

  let favHighlight = checkIcon('favoriteRecipes', recipe);
  let cookHighlight = checkIcon('recipesToCook', recipe);

  let inStock = "";
  if (currentUser.pantry.hasNeededIngredients(recipe)) {
    inStock = "in-stock"
  }
  let tags = recipe.tags.join(', ');
  let recipeBlock = `
    <div class="single-recipe-result ${inStock}">
      <img id="small-dish-image" src=${recipe.image} alt="Recipe ${recipe.id}" onclick="displayChosenRecipe(${recipe.id})">
      <h3 id="recipe-name-card" onclick="displayChosenRecipe(${recipe.id})">${recipe.name}</h3>
      <p id="recipe-tags-card" onclick="displayChosenRecipe(${recipe.id})">${tags}</p>
      <img class="icon chef chef-${recipe.id}" id="chef-${recipe.id}" src="../assets/chef${cookHighlight}.svg" onclick="updateCookLaterRecipe(${recipe.id})">
      <img class="icon heart heart-${recipe.id}" id="heart-${recipe.id}" src="../assets/heart${favHighlight}.svg" onclick="updateFavoriteRecipe(${recipe.id})">
    </div>
  `;
  return recipeBlock;
}

function displayUserRecipes(recipes, array) {
  toggleView(searchView);
  updateSearchResultsCount(recipes, array.length);
  makeMultipleBlocks(array, searchDisplay);
}

function makeMultipleBlocks(array, searchDisplay) {
  searchDisplay.innerHTML = '';
  if (array.length === 0) searchDisplay.innerHTML = '<h1>Sorry, no matches to display.</h1>';
  array.forEach(recipe => {
    searchDisplay.insertAdjacentHTML('beforeend', createHtmlRecipeBlock(recipe));
  })
}

function updateSearchResultsCount(userInput, resultsCount) {
  let counterDisplay = document.getElementById('results-count');
  counterDisplay.innerText = `${resultsCount} Results for '${userInput}'`;
}


// ICON FUNCTIONALITY
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
  let currentIcons = document.querySelectorAll(`.${icon}-${recipeId}`);
  currentIcons.forEach(currentIcon => {
    if (currentIcon.getAttribute('src') == `../assets/${icon}.svg`) {
      currentIcon.setAttribute('src', `../assets/${icon}-clicked.svg`);
    } else {
      currentIcon.setAttribute('src', `../assets/${icon}.svg`);
    }
  })
}
