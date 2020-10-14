const data = require('../data/recipes');
const recipeData = data.recipeData;

class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.pantry = userInfo.pantry;
  }

  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeFavoriteRecipe(recipe) {
    const index = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(index, 1);
  }

  addRecipeToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  removeRecipeToCook(recipe) {
    const index = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(index, 1);
  }

  searchFavoriteRecipes(recipeOrIngredient) {
    let formattedRecipe = this.formatInput(recipeOrIngredient);
    let recipeResults = this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(formattedRecipe);
    });
    let ingredientResults = this.favoriteRecipes.reduce((acc, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.name.includes(recipeOrIngredient.toLowerCase())) {
          acc.push(recipe);
        }
      })
      return acc;
    }, [])
    return recipeResults.concat(ingredientResults);
  }

  formatInput(input) {
    let inputFormatted = input.toLowerCase();
    inputFormatted = inputFormatted.charAt(0).toUpperCase() + inputFormatted.slice(1);
    return inputFormatted;
  }

  filterRecipes(type) {
    let recipeResults = recipeData.reduce((acc, recipe) => {
      recipe.tags.forEach(tag => {
        if (tag.includes(type)) {
          acc.push(recipe);
        }
      })
      return acc;
    }, []);
    return recipeResults;
  }

  searchByIngredient() {
    // Can we use a recipeBook class here?
    // recipeBook.recipe.ingredients.name
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
