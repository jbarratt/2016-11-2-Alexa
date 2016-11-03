//"use strict";
var alexa = require('alexa-app');
var app = new alexa.app('Joker');

app.intent('Joke',
  {
    'slots':{
    },
    'utterances':[
      "shoot me a joke",
      "joke time",
      "tell me joke",
      "can I hear a joke",
      "yes"
    ]
  },
  (request, response) => {
    const jokes = [
      "What do you call two straight days of rain in Portland?  Normal.",
      "What is the difference between Oregon and Washington?  Washingtonians have nicer neighbors.",
      "You might be from Portland if you know a brid and groom that registered at REI"
    ];
    var joke =  jokes[Math.floor(Math.random() * jokes.length)];
    response.say(joke);
    response.say("Would you like to hear another?");
  }
);

app.intent('Done',
  {
    'utterances': [
      "no",
      "no thankyou",
      "not now"
    ]
  },
  (request, response) => {
    response.say("O.K.  Goodbye");
  }
);

app.intent('AMAZON.HelpIntent', 
  {
    'utterances':[
      "for help {customizing|setting up|getting started}"
    ]
  },
  (request, response) => {
    
  }
);

app.error = (exception, request, response) => {
    response.say("Sorry, something bad happened");
};

module.exports = app;
