var Twitter    = require('twitter');

var parseTweet    = require('./tweet-parser');
var validateVote  = require("./vote-validator");
var sendVote      = require("./vote-sender");
var replyToVoter  = require("./vote-replier");
var replyCallback = replyToVoter.replyCallback;

var credentials = require("./config/credentials");
var client      = new Twitter(credentials);

var cache = require("./redis-client")();

var config     = require("./config");
var BOT_HANDLE = config.BOT_HANDLE;

client.stream('statuses/filter', { track: '@'+BOT_HANDLE }, function(stream) {

    stream.on('data', function(tweet) {
        var data = parseTweet(tweet);
        if (data.voter.handle === BOT_HANDLE) {
            console.log("[BOT]: Short circuited a false-vote by yours truly.");
            return;
        }
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
                    console.log("Time of error: ", (new Date()));
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
