class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.pantry = new Pantry(userInfo.pantry);
    this.recipes = new RecipeBook();
  }

  addFavoriteRecipe(recipe) {
    if (this.favoriteRecipes.includes(recipe)) return;
    this.favoriteRecipes.push(recipe);
  }

  removeFavoriteRecipe(recipe) {
    const index = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(index, 1);
  }

  addRecipeToCook(recipe) {
    if (this.recipesToCook.includes(recipe)) return;
    this.recipesToCook.push(recipe);
  }

  makeRecipeToCook(recipe) {
    this.removeRecipeToCook(recipe);
    this.pantry.removeUsedIngredients(recipe);
  }

  removeRecipeToCook(recipe) {
    const index = this.recipesToCook.indexOf(recipe);
    this.recipesToCook.splice(index, 1);
  }

  searchByIngredient(name, array) {
    const nameInput = name.toLowerCase();
    const ingredientResults = array.reduce((acc, recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (ingredient.name.includes(name) && !acc.includes(recipe)) {
          acc.push(recipe);
        }
      });
      return acc;
    }, []);
    return ingredientResults;
  }

  searchRecipeByName(name, array) {
    const formattedRecipeName = this.formatInput(name);
    return array.filter((recipe) => recipe.name.includes(formattedRecipeName));
  }

  searchRecipeType(type, array) {
    const typeName = type.toLowerCase();
    const typeResults = array.reduce((acc, recipe) => {
      recipe.tags.forEach((tag) => {
        if (tag.includes(type)) {
          acc.push(recipe);
        }
      });
      return acc;
    }, []);
    return typeResults;
  }

  searchFavoriteRecipes(recipeOrIngredient) {
    const recipeResults = this.searchRecipeByName(recipeOrIngredient, this.favoriteRecipes);
    const ingredientResults = this.searchByIngredient(recipeOrIngredient, this.favoriteRecipes);
    const typeResults = this.searchRecipeType(recipeOrIngredient, this.favoriteRecipes);
    const results = recipeResults.concat(ingredientResults, typeResults);
    return Array.from(new Set(results));
  }

  searchAllRecipes(nameOrType) {
    const recipeResults = this.searchRecipeByName(nameOrType, this.recipes.recipeBook);
    const typeResults = this.searchRecipeType(nameOrType, this.recipes.recipeBook);
    const ingredientResults = this.searchByIngredient(nameOrType, this.recipes.recipeBook);
    const results = recipeResults.concat(typeResults, ingredientResults);
    return Array.from(new Set(results));
  }

  formatInput(input) {
    let inputFormatted = input.toLowerCase();
    inputFormatted = inputFormatted.charAt(0).toUpperCase() + inputFormatted.slice(1);
    return inputFormatted;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
