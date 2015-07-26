var Twitter    = require('twitter');

var parseTweet    = require('./tweet-parser');
var validateVote  = require("./vote-validator");
var sendVote      = require("./vote-sender");
var replyToVoter  = require("./vote-replier");
var replyCallback = replyToVoter.replyCallback;

var credentials = require("./config/credentials");
var client      = new Twitter(credentials);

var config     = require("./config");
var BOT_HANDLE = config.BOT_HANDLE;

client.stream('statuses/filter', { track: '@'+BOT_HANDLE }, function(stream) {

    stream.on('data', function(tweet) {
        var data = parseTweet(tweet);

        process.nextTick(function() {
            validateVote(data, {
                success: success,
                failure: function(msg) { console.log(msg); },
            });
        });

        function success() {
            sendVote(data, function(err, response, body) {
                if (err) {
                    console.log("Error sending vote...", err);
                    return;
                }
                if (data.voter.handle === BOT_HANDLE) {
                    console.log("[BOT]: Short circuited a reply to myself.");
                    return;
                }
                else {
                    replyToVoter(
                        client,
                        body,
                        replyCallback
                    );
                }
            });
        }
    });

    stream.on('error', function(error) {
        console.log(error);
        throw error;
    });
});

// HACK 
// This keeps shit alive on the server...
process.stdin.resume();
