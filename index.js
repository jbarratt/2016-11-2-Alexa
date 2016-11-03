//"use strict";
var alexa = require('alexa-app');
var app = new alexa.app('Joker');

var categories = [""];

app.intent('News Help', {
  'utterances': [
    "what are the possible headline categories?",
    "what categories can I try?",
    "list the categories",
    "give me the headline categories"
  ], (request, response) => {
    response.say("you can say: " + categories.toString());
  }
});

app.intent('Headlines', {
  'slots':{
    "name": "Category",
    "type": categories
  },
  'utterances': [
    "give me headlines for {Category}",
    "{Category}"
  ], (request, response) => {
    response.say("Wassup");
  }
});




app.error = (exception, request, response) => {
    response.say("Sorry, something bad happened");
};

module.exports = app;
