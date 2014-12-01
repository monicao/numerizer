var numerizer = require('../lib/grammar.js').parser;
var should = require('should');

describe('grammar', function () {

  var tests = [
    {
      string: "",
      expected: ""
    },
    {
      string: " ",
      expected: " "
    },
    {
      string: "one",
      expected: "1"
    },
    {
      string: "zone",
      expected: "zone"
    },
    {
      string: " one ",
      expected: " 1 "
    },
    {
      string: "twenty",
      expected: "20"
    },
    {
      string: "so many things too much fun",
      expected: "so many things too much fun"
    },
    {
      string: "so! many things - too much fun...",
      expected: "so! many things - too much fun..."
    },
    {
      string: "one hundred things",
      expected: "100 things"
    },
    {
      string: "one hundred and one dalmations",
      expected: "101 dalmations"
    },
    {
      string: "two stupid dogs",
      expected: "2 stupid dogs"
    },
    {
      string: "which two stupid dogs do you like",
      expected: "which 2 stupid dogs do you like"
    }
  ]

  tests.forEach(function(testData){
    it(testData.string, function(){
      numerizer.parse(testData.string).should.equal(testData.expected);
    });
  })

})
