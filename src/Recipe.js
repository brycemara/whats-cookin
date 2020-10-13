const data = require('../data/ingredients');
const ingredientsData = data.ingredientsData;

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    //We want object with all key
    //starting with recipeData
    //use find method to lookup
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  getCostOfIngredients() {
    let amount;
    let ingredientItem;
    let totalCost = this.ingredients.reduce((acc, ingredient) => {
      amount = ingredient.quantity.amount;
      ingredientItem = ingredientsData.find(element => {
        return element.id === ingredient.id;
      });
      acc += amount * ingredientItem.estimatedCostInCents;
      return acc;
    }, 0)
    return totalCost;
  }

  getInstructions() {

  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
