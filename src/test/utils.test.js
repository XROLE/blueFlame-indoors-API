var chai = require('chai');

const expect = chai.expect;

var utils = require('../utils/index');
var whoAreYou = utils.whoAreYou;

describe('Utitlity test only', () => {
  it('should should return a string when whoAreYou is called', () => {
    expect(whoAreYou()).to.equal('I am a chosen one');
  })
})
