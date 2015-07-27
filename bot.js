var redis      = require("redis");

var parseTweet    = require("./tweet-parser");
var validateVote  = require("./vote-validator");
var sendVote      = require("./vote-sender");

var BOT_HANDLE = require("./config").BOT_HANDLE;

module.exports = emojiElection;

function emojiElection(client, queue) {
    client.stream('statuses/filter', { track: '@'+BOT_HANDLE }, function(stream) {

        stream.on('data', function(tweet) {
            var data = parseTweet(tweet);

            if (data.voter.handle === BOT_HANDLE) {
                console.log("[BOT]: Short circuited a false-vote by yours truly.");
                return;
            }

            // FYI this is an async function
            validateVote(data, {
                success: success,
                failure: function(msg) { console.error(msg); },
            });

            function success() {
                sendVote(data, function(err, response, jsonBody) {
                    var body;

                    if (err) {
                        console.error("Error sending vote...", err);
                        console.log("Time of error: ", (new Date()));
                        return;
                    }
                    body = JSON.parse(jsonBody);
                    body.failed_replies_count = 0;
                    body = JSON.stringify(body);
                    queue.enqueue(body, redis.print);
                });
            }
        });

        stream.on('error', function(error) {
            console.error("Ruh roh a stream error: ", error);
            throw error;
        });
    });
}