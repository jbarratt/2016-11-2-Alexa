var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var app = require('../index');

describe.only("Config", function(){
  it("should list schema", function(){
    console.log(app.schema());
  });

  it("should list utternaces", function(){
    console.log(app.utterances());
  });
});


