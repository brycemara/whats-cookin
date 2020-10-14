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
    expect(user.favoriteRecipes).to.include(recipe);
  });

  it('should be able to remove a favorite recipe', () => {
    user.addFavoriteRecipe(recipe);
    user.removeFavoriteRecipe(recipe);
    expect(user.favoriteRecipes).to.be.an('array').that.is.empty;
  });

  it('should be able to add a recipe to cook', () => {
    user.addRecipeToCook(recipe);
    expect(user.recipesToCook).to.include(recipe);
  });

  it('should be able to remove a favorite recipe', () => {
    user.addRecipeToCook(recipe);
    user.removeRecipeToCook(recipe);
    expect(user.recipesToCook).to.be.an('array').that.is.empty;
  });

  it('should be able to search favorite recipes by recipe name', () => {
    user.addFavoriteRecipe(recipe);
    let result = user.searchFavoriteRecipes('Snakes');
    expect(result).to.be.an('array').that.is.empty;
    result = user.searchFavoriteRecipes('cookie');
    expect(result).to.include(recipe);
  });

  it('should be able to search favorite recipes by ingredient', () => {
    user.addFavoriteRecipe(recipe);
    let result = user.searchFavoriteRecipes('Snakes');
    expect(result).to.be.an('array').that.is.empty;
    result = user.searchFavoriteRecipes('Wheat Flour');
    expect(result).to.include(recipe);
  });

  it('should filter recipes by type', () => {
    let results = user.filterRecipes('antipasti');
    expect(results.length).to.deep.equal(9);
  });


});
