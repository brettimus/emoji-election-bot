var Twitter    = require('twitter');

var parseTweet    = require('./tweet-parser');
var validateVote  = require("./vote-validator");
var sendVote      = require("./vote-sender");
var replyToVoter  = require("./vote-replier");

var client = new Twitter({
    consumer_key: 'hnlhI3YdRyp7cnhHgrXqGjC2T',
    consumer_secret: 'ehYqzFAvCt7vp4HoqfJwrljmwxVomqU0lVmMpPETmqVy1ho2C5',
    access_token_key: '3282898548-GSH0CzvuJSia79BChPAK08uW0B2fo13IMkAHDrk',
    access_token_secret: 'OnpsBiw66URVqx5msiaCoRRrQ5ZmvjhlDxXgWD6xT3Cd8'
});

var BOT_HANDLE = "emojielection";

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

// HACK keeps shit alive on the server...
process.stdin.resume();

// Helper... not sure what to do with this right now
function replyCallback(error, tweet, response) {
    if (error) {
        console.log("Error on reply", error);
    }
    // console.log(tweet);  // Tweet body. 
    // console.log(response);  // Raw response object. 
}
