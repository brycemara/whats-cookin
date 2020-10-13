class User {
  constructor(userInfo) {
    this.id = userInfo.id;
    this.name = userInfo.name;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.pantry = userInfo.pantry;
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
  searchByIngredient() {
    
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
