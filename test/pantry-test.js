const chai = require('chai');
const expect = chai.expect;
const data = require('../data/users');
const userInfo = data.usersData;
const data1 = require('../data/recipes');
const recipeInfo = data1.recipeData;


const Pantry = require('../src/pantry')
const Recipe = require('../src/Recipe')

describe('Pantry', () => {
let pantry;
let recipe;

  beforeEach(() => {
    pantry = new Pantry(userInfo[0].pantry);
    recipe = new Recipe(recipeInfo[0])
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have ingredients in pantry', () => {
    let firstIngredient = {"estimatedCostInCents": 742, "id": 11477, "name": "zucchini squash", "pantryAmount": 4, "recipeAmount": undefined};

    expect(pantry.contents[0]).to.be.deep.equal(firstIngredient);
  });

  it('should be able to determine if the pantry has enough ingredients', () => {
    let checkRecipe = pantry.checkIngredients(recipe);

    expect(checkRecipe.length).to.be.deep.equal(4);
  });

});
