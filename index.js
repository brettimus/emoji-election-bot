var Twitter    = require('twitter');

var parseTweet    = require('./tweet-parser');
var validateVote  = require("./vote-validator");
var sendVote      = require("./vote-sender");
var replyToVoter  = require("./vote-replier");

var config = require("./config");
var credentials = require("./config/credentials");

var client = new Twitter(credentials);

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

// Helper... not sure what to do with this right now
function replyCallback(error, tweet, response) {
    if (error) {
        console.log("Error on reply", error);
    }
    // console.log(tweet);  // Tweet body. 
    // console.log(response);  // Raw response object. 
}
