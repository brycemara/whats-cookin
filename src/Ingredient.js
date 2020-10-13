const data = require('../data/ingredients');
const ingredientsData = data.ingredientsData;

class Ingredient {
  constructor(ingredientDetails) {
    this.id = ingredientDetails.id || ingredientDetails.ingredient;
    this.name = ingredientDetails.name || this.findIngredientData('name');
    this.estimatedCostInCents = ingredientDetails.estimatedCostInCents || this.findIngredientData('estimatedCostInCents');
    this.pantryAmount = ingredientDetails.amount;
    this.recipeAmount = ingredientDetails.quantity;
  }

  findIngredientData(key) {
    let ingredientName = ingredientsData.find(element => {
      return element.id === this.id;
    });
    return ingredientName[key];
  }
}


module.exports = Ingredient;
