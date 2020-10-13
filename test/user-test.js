const chai = require('chai');
const expect = chai.expect;
const data = require('../data/recipes');
const recipeData = data.recipeData;

const User = require('../src/User');
const Recipe = require('../src/Recipe');

describe('User', () => {
let user;
let recipe;

  beforeEach(() => {
    user = new User({"name": "Saige O'Kon",
    "id": 1,
    "pantry": [
      {
        "ingredient": 11477,
        "amount": 4
      }
    ]});
    recipe = new Recipe(recipeData[0]);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to process a user object input', () => {
    expect(user.id).to.be.equal(1);
    expect(user.name).to.be.equal("Saige O'Kon");
  });

  it('should be able to add a favorite recipe', () => {
    user.addFavoriteRecipe(recipe);
    except(user.favoriteRecipes).to.include(recipe);
  });


});
