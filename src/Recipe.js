const data = require('../data/ingredients');
const ingredientsData = data.ingredientsData;

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
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
    let instructions = this.instructions.map(step => {
      return step.instruction;
    });
    return instructions;
  }
};

if (typeof module !== 'undefined') {
  module.exports = Recipe;
};
