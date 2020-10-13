const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/Ingredient')

describe('Ingredient', () => {
let ingredient;

  beforeEach(() => {
    ingredient = new Ingredient({
        "ingredient": 11477,
        "amount": 4
      });
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should findIngredientData if not given', ()=> {
    expect(ingredient.name).to.be.deep.equal("zucchini squash")

  })

});
