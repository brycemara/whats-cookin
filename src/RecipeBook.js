const data = require('../data/recipes');
const recipeData = data.recipeData;
const Recipe = require('../src/Recipe')

class RecipeBook {
  constructor() {
    this.recipes = recipeData.map(recipe => {return new Recipe(recipe)});
  }
}


if (typeof module !== 'undefined') {
  module.exports = RecipeBook;
};
