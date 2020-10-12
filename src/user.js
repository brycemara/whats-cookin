class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.pantry = userObj.pantry;
  }
  addFavoriteRecipe(recipe) {
    // add recipe to this.favoriteRecipes
  }
  removeFavoriteRecipe(recipe) {

  }
  addRecipesToCook(recipe) {
    // add recipe to cook to this.recipesToCook
  }
  removeRecipesToCook(recipe) {

  }
  searchSavedRecipes(recipe) {
    // search for any saved recipe
  }
  filterRecipes(type) {
    // filter fav or to cook recipes by type
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
