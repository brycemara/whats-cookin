class Pantry {
  constructor(ingredientList) {
    this.pantry = ingredientList.forEach((ingredient) => new Ingredient);
  }
  checkIngredients(pantry) {

  }
  needIngredients(pantry){

  }
  removeIngrdients(pantry) {

  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
