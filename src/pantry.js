const Ingredient = require('../src/Ingredient')

class Pantry {
  constructor(ingredientList) {
    this.contents = this.createNewIngredients(ingredientList);
  }

  createNewIngredients(pantryIngredients) {
    let ingredients = pantryIngredients.map(ingredient => {
      return new Ingredient(ingredient)
    });
    return ingredients;
  }

  //TODO: Refactor, talk to PM about refactor
  checkIngredients(recipe) {
    let requiredIngredients = recipe.ingredients.reduce((missingIngredients, ingredient) => {
      let pantryIngredient = this.contents.find(content => {
        return content.id === ingredient.id
      })
      if (!pantryIngredient) {
        pantryIngredient = ingredient;
        pantryIngredient.pantryAmount = 0;
      }
      let ingredientDiff = ingredient.recipeAmount.amount - pantryIngredient.pantryAmount;
      if (ingredientDiff >= 0) {
        let missingIngredient = {
          name: ingredient.name,
          amountMissing: ingredientDiff
        };
        missingIngredients.push(missingIngredient);
      }
      return missingIngredients;
    }, []);
    return requiredIngredients;
  }

  needIngredients(recipe){

  }

  removeIngredients() {

  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
