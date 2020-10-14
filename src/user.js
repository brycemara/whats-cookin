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
    let recipeResults = this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(recipeOrIngredient);
    });
    let ingredientResults = this.favoriteRecipes.reduce((acc, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.name.includes(recipeOrIngredient)) {
          acc.push(recipe);
        }
      })
      return acc;
    }, [])
    return recipeResults.concat(ingredientResults);
  }

  filterRecipes(type) {
    // filter fav or to cook recipes by type
  }

  searchByIngredient() {

  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
