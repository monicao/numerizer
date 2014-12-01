var numerizer = require('../lib/grammar.js').parser;
var should = require('should');

describe('grammar', function () {

  it('should handle no numbers', function(){
    numerizer.parse("so many things too much fun")
    .should.equal("so many things too much fun");
  });

  it('should handle special characters', function(){
    numerizer.parse("so! many things - too much fun...")
    .should.equal("so! many things - too much fun...");
  });

  it('should handle large numbers', function () {
    numerizer.parse("one hundred things")
    .should.equal("100 things");

    numerizer.parse("one hundred and one dalmations")
    .should.equal("101 dalmations");

    numerizer.parse("two stupid dogs")
    .should.equal("2 stupid dogs");

  });

})
