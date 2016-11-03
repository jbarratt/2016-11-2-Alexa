var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var mockHelper = require("../helpers/MockHelper");
chai.use(chaiAsPromised);
var expect = chai.expect;
chai.config.includeStack = true;

app = require('../../index');

describe.only("Initial Test", ()=>{
  var mockRequest = mockHelper.load("category_request.json");
  it("should load feed", ()=>{
    return app.request(mockRequest).then((response)=>{
      console.log(response);
    });
  });
});
