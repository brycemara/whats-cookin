const chai = require('chai');
const expect = chai.expect;


const Pantry = require('../src/pantry')

describe('Pantry', () => {
let pantry;

  beforeEach(() => {
    pantry = new Pantry();
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });


});
