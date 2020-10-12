class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.name = recipe.name;
    this.tags = recipe.tags;
  }

  filterRecipe(type) {

  }

  searchByIngredient(ingredient) {

  }

  getCostOfIngredients(recipe) {

  }

  getInstructions(recipe) {
    
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
