class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = this.createNewIngredients(recipe);
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  createNewIngredients(recipe) {
    let ingredients = recipe.ingredients.map(ingredient => {
      return new Ingredient(ingredient);
    });
    return ingredients;
  }

  getCostOfIngredients() {
    let amount;
    let cost;
    let totalCost = this.ingredients.reduce((acc, ingredient) => {
      amount = ingredient.recipeAmount.amount;
      cost = ingredient.estimatedCostInCents;
      acc += amount * cost;
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
