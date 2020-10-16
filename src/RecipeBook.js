class RecipeBook {
  constructor() {
    this.recipeBook = recipeData.map(recipe => {return new Recipe(recipe)});
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeBook;
};
