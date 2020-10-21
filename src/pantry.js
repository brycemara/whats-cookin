class Pantry {
  constructor(ingredientList) {
    this.contents = this.createNewIngredients(ingredientList);
  }

  createNewIngredients(pantryIngredients) {
    let ingredients = pantryIngredients.map(ingredient => {
      return new Ingredient(ingredient);
    });
    return ingredients;
  }

  getIngredientsNeeded(recipe) {
    let requiredIngredients = recipe.ingredients.reduce((missingIngredients, ingredient) => {
      let pantryIngredient = this.findPantryIngredient(ingredient);
      let missingIngredient = this.createMissingIngredients(ingredient, pantryIngredient);
      if (missingIngredient) {
        missingIngredients.push(missingIngredient);
      }
      return missingIngredients;
    }, []);
    return requiredIngredients;

  }

  createMissingIngredients(ingredient, pantryIngredient) {
    let ingredientDiff = ingredient.recipeAmount.amount - pantryIngredient.pantryAmount;
    if (ingredientDiff >= 0) {
      let missingIngredient = new Ingredient(ingredient);
      missingIngredient.pantryAmount = pantryIngredient.pantryAmount;
      missingIngredient.recipeAmount = ingredient.recipeAmount.amount;
      missingIngredient.unit = ingredient.recipeAmount.unit;
      missingIngredient.amountMissing = Math.round(ingredientDiff * 100) / 100;
      return missingIngredient;
    }
  }

  findPantryIngredient(ingredient) {
    let pantryIngredient = this.contents.find(content => {
      return content.id === ingredient.id;
    });
    if (!pantryIngredient) {
      pantryIngredient = ingredient;
      pantryIngredient.pantryAmount = 0;
    };
    return pantryIngredient;
  }

  hasNeededIngredients(recipe){
    return (this.getIngredientsNeeded(recipe).length > 0) ? false : true;
  }

  removeUsedIngredients(recipe) {
    if (!this.hasNeededIngredients(recipe)) {
      return false;
    }
    recipe.ingredients.forEach(ingredient => {
      let pantryIngredient = this.findPantryIngredient(ingredient);
      pantryIngredient.pantryAmount -= ingredient.recipeAmount.amount;
    });
  }

};

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
