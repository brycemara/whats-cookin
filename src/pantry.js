class Pantry {
  constructor(ingredientList) {
    this.contents = this.createNewIngredients(ingredientList);
  }

  createNewIngredients(pantryIngredients) {
    const ingredients = pantryIngredients.map((ingredient) => new Ingredient(ingredient));
    return ingredients;
  }

  getIngredientsNeeded(recipe) {
    const requiredIngredients = recipe.ingredients.reduce((missingIngredients, ingredient) => {
      const pantryIngredient = this.findPantryIngredient(ingredient);
      const missingIngredient = this.createMissingIngredients(ingredient, pantryIngredient);
      if (missingIngredient) {
        missingIngredients.push(missingIngredient);
      }
      return missingIngredients;
    }, []);
    return requiredIngredients;
  }

  createMissingIngredients(ingredient, pantryIngredient) {
    const ingredientDiff = ingredient.recipeAmount.amount - pantryIngredient.pantryAmount;
    if (ingredientDiff >= 0) {
      const missingIngredient = new Ingredient(ingredient);
      missingIngredient.pantryAmount = pantryIngredient.pantryAmount;
      missingIngredient.recipeAmount = ingredient.recipeAmount.amount;
      missingIngredient.unit = ingredient.recipeAmount.unit;
      missingIngredient.amountMissing = Math.round(ingredientDiff * 100) / 100;
      return missingIngredient;
    }
  }

  findPantryIngredient(ingredient) {
    let pantryIngredient = this.contents.find((content) => content.id === ingredient.id);
    if (!pantryIngredient) {
      pantryIngredient = ingredient;
      pantryIngredient.pantryAmount = 0;
    }
    return pantryIngredient;
  }

  hasNeededIngredients(recipe) {
    return !((this.getIngredientsNeeded(recipe).length > 0));
  }

  removeUsedIngredients(recipe) {
    if (!this.hasNeededIngredients(recipe)) {
      return false;
    }
    recipe.ingredients.forEach((ingredient) => {
      const pantryIngredient = this.findPantryIngredient(ingredient);
      pantryIngredient.pantryAmount -= ingredient.recipeAmount.amount;
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
