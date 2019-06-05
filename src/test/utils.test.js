import { expect } from 'chai';

import { whoAreYou } from '../utils/index';

describe('Utitlity test only', () => {
  it('should should return a string when whoAreYou is called', () => {
    expect(whoAreYou()).to.equal('I am a chosen one');
  });
});
