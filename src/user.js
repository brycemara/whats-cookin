class User {
  constructor(userObj) {
    this.id = userObj.id;
    this.name = userObj.name;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.pantry = userObj.pantry;
  }
  addFavoriteRecipe() {
    // add recipe to this.favoriteRecipes
  }
  removeFavoriteRecipe() {

  }
  addRecipesToCook() {
    // add recipe to cook to this.recipesToCook
  }
  removeRecipesToCook() {
    
  }
  searchSavedRecipes() {
    // search for any saved recipe
  }
  filterRecipes() {
    // filter fav or to cook recipes by type
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
