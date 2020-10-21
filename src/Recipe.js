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
    const ingredients = recipe.ingredients.map((ingredient) => new Ingredient(ingredient));
    return ingredients;
  }

  getCostOfIngredients() {
    let amount;
    let cost;
    const totalCost = this.ingredients.reduce((acc, ingredient) => {
      amount = ingredient.recipeAmount.amount;
      cost = ingredient.estimatedCostInCents;
      acc += amount * cost;
      return acc;
    }, 0);
    return Math.round((totalCost / 100) * 100) / 100;
  }

  getInstructions() {
    const instructions = this.instructions.map((step) => step.instruction);
    return instructions;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
