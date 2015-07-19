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

client.stream('statuses/filter', { track: '@emoji4president' }, function(stream) {

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
                if (!(data.voter.handle === "emoji4president")) {
                    replyToVoter(
                        client,
                        body,
                        replyCallback
                    );
                } else {
                    console.log("Short circuited reply to myself...");
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
