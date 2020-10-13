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

  checkIngredients(recipe) {
    let missing = recipe.ingredients.reduce((missingIngredients, ingredient) => {
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
      console.log(missingIngredients);
      return missingIngredients;
    }, []);
    return missing;

    // forEach (ingredient in recipe):
    // get ingredient.id
    // use that id in a find iterator, looking at pantry.contents
    // if recipeData.quantity > pantry.contents
    // then push name of ingredient and diff into array of missing ingredients
    // return


  }

  needIngredients(recipe){

  }

  removeIngredients() {

  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
