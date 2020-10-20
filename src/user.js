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

  searchFavoriteRecipes(recipeOrIngredient) {
    let formattedRecipe = this.formatInput(recipeOrIngredient);
    let recipeResults = this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(formattedRecipe);
    });
    let ingredientResults = this.favoriteRecipes.reduce((acc, recipe) => {
      this.matchIngredientNames(acc, recipe, recipeOrIngredient);
      return acc;
    }, []);
    let typeName = recipeOrIngredient.toLowerCase();
    let typeResults = this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(typeName);
    });
    let results = recipeResults.concat(ingredientResults, typeResults);
    results = Array.from(new Set(results));
    return results;
  }

  matchIngredientNames(acc, recipe, recipeOrIngredient) {
    recipe.ingredients.forEach(ingredient => {
      if (ingredient.name.includes(recipeOrIngredient.toLowerCase())) {
        acc.push(recipe);
      };
    });
    return acc;
  }

  //TODO: make formatInput take in multiple length strings
  // and process them accordingly

  formatInput(input) {
    let inputFormatted = input.toLowerCase();
    inputFormatted = inputFormatted.charAt(0).toUpperCase() + inputFormatted.slice(1);
    return inputFormatted;
  }

  searchByIngredient(name) {
    let ingredientResults = this.recipes.recipeBook.reduce((acc, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.name.includes(name) && !acc.includes(recipe)) {
          acc.push(recipe);
        };
      });
      return acc;
    }, []);
    return ingredientResults;
  }

  searchRecipeByName(name, array) {
    let formattedRecipeName = this.formatInput(name);
    return this.recipes.recipeBook.filter(recipe => {
      return recipe.name.includes(formattedRecipeName);
    });
  }

  searchRecipeType(type) {
    let typeName = type.toLowerCase();
    return this.recipes.recipeBook.filter(recipe => {
      return recipe.tags.includes(typeName);
    });
  }

  searchAllRecipes(nameOrType) {
    let recipeResults = this.searchRecipeByName(nameOrType);
    let typeResults = this.searchRecipeType(nameOrType);
    let ingredientResults = this.searchByIngredient(nameOrType.toLowerCase());
    let results = recipeResults.concat(typeResults, ingredientResults);
    return Array.from(new Set(results));
  }

};

if (typeof module !== 'undefined') {
  module.exports = User;
};
