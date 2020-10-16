let currentUser;

window.onload = () => {
  let userIndex = Math.floor(Math.random() * usersData.length);
  currentUser = new User(usersData[userIndex]);
}

let ingredientList = document.querySelector('.ingredients-view');
let recipeName = document.querySelector('.recipe-name');
let recipeView = document.querySelector('.recipe-view');
let recipeInstructions = document.querySelector('.recipe-instructions');
let recipeImg = document.getElementById('recipe-img');
let searchButton = document.querySelector('.search-button');
let searchDisplay = document.getElementById('search-results');

searchButton.addEventListener('click', searchAllRecipes);

function displayRecipe(recipe) {
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

function displaySearchResults(userInput) {
  let typeResults = currentUser.filterRecipes(userInput);
  let ingredientResults = currentUser.searchByIngredient(userInput);
  searchResults = typeResults.concat(ingredientResults);
  if (searchResults.length === 0) return;
  console.log(searchResults);
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
