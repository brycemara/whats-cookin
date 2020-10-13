;const chai = require('chai');
const expect = chai.expect;
const data = require('../data/recipes');
const recipeInfo = data.recipeData;

const Recipe = require('../src/Recipe');

describe('Recipe', () => {
let recipe;

  beforeEach(() => {
    recipe = new Recipe(recipeInfo[0]);
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should be able to process a recipe object input', () => {
    expect(recipe.id).to.deep.equal(595736);
    expect(recipe.name).to.deep.equal("Loaded Chocolate Chip Pudding Cookie Cups");
  });

  it('should be able to get the cost of ingredients', () => {
    let ingredientCost = recipe.getCostOfIngredients();
    expect(ingredientCost).to.deep.equal(17776);
  });

  it('should be able to get instructions', () => {
    let ingredientInstructions = recipe.getInstructions();
    expect(ingredientInstructions.length).to.deep.equal(6)
  });

});
