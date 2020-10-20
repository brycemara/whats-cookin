class Ingredient {
  constructor(ingredientDetails) {
    this.id = ingredientDetails.id || ingredientDetails.ingredient;
    this.name = ingredientDetails.name || this.findIngredientData('name');
    this.estimatedCostInCents = ingredientDetails.estimatedCostInCents || this.findIngredientData('estimatedCostInCents');
    this.pantryAmount = Math.round(ingredientDetails.amount * 100) / 100 || 0;
    this.recipeAmount = ingredientDetails.quantity || 0;
  }

  findIngredientData(key) {
    let ingredientName = ingredientsData.find(element => {
      return element.id === this.id;
    });
    return ingredientName[key];
  }
};


if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
