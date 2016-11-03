//"use strict";
var alexa = require('alexa-app');
var app = new alexa.app('NotchNews');
var FeedParser = require('feedparser');
var request = require('request');

var categories = {
    all: "http://www.npr.org/rss/rss.php?id=1001",
    education: "http://www.npr.org/rss/rss.php?id=1013",
    america: "http://www.npr.org/rss/rss.php?id=1003",
    world: "http://www.npr.org/rss/rss.php?id=1004",
    business: "http://www.npr.org/rss/rss.php?id=1006",
    science: "http://www.npr.org/rss/rss.php?id=1007",
    arts: "http://www.npr.org/rss/rss.php?id=1008",
    mideast: "http://www.npr.org/rss/rss.php?id=1009",
    politics: "http://www.npr.org/rss/rss.php?id=1014",
    money: "http://www.npr.org/rss/rss.php?id=1018",
    technology: "http://www.npr.org/rss/rss.php?id=1019",
};

category_list = Object.keys(categories);


function headlines_for(url) {
    // TODO error handling
    // THIS WILL NEVER WORK. We don't block on the callback, so headlines is not full.
    var req = request(url),
        feedparser = new FeedParser();

    req.on('response', function(res) {
        var stream = this;
        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
        stream.pipe(feedparser);
    });

    var headlines = [];

    feedparser.on('readable', function() {
        var stream = this,
            meta = this.meta,
            item;

        while (item = stream.read()) {
            headlines.push(item.title);
        }
    });
    return headlines;
};


app.intent('Categories',
  {
    'slots': {},
    'utterances': [
        "what are the possible headline categories",
        "what categories can I try",
        "list the categories",
        "categories",
        "give me the headline categories"
    ]
  },
  (request, response) => {
      response.say("you can say 'give me headlines for' and then a category, like: " + category_list.toString());
  }
);

app.intent('Headlines', {
    'slots': {
        "CATEGORY": "AMAZON.LITERAL"
    },
    'utterances': [
        "give me headlines for {-|CATEGORY}",
        "{-|CATEGORY}"
    ]},
    (request, response) => {
        var category = request.slot("CATEGORY");
        if (typeof(category) == "undefined") {
            category = "all";
        } else {
          category = category.toLowerCase();
        }
        if(categories.hasOwnProperty(category)) {
          response.say("Here are some headlines for category ''" + category + "'' from NPR.\n Here we go:\n" + headlines_for(categories[category]).join("\n"));
        } else {
          response.say("You asked for the category " + category + " but I don't know that one. I can tell you about " + category_list.toString());
        }
    }
);

app.error = (exception, request, response) => {
    response.say("Sorry, something bad happened");
};

module.exports = app;
