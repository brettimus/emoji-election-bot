var moment = require("moment");
var Twitter = require("Twitter");

var credentials = require("./config/credentials");
var client      = new Twitter(credentials);

var emojiElection = require("./bot");
var replyToVoter  = require("./vote-replier");

// Data structures
var redis = require("redis"),
    cache = require("./redis-client")();
var stackName   = require("./config/redis").stackName(),
    createStack = require("./db/stack"),
    stack;
var queueName   = require("./config/redis").queueName(),
    createQueue = require("./db/queue"),
    queue;

var POSTING_LIMIT = require("./config").POSTING_LIMIT;

console.log("===");
console.log("Starting app!");
console.log("===");

cache.on("ready", function() {
    console.log("REDIS IS READY!!! Time: ", (new Date()));

    // Initialize data structures
    stack = createStack(stackName, cache);
    queue = createQueue(queueName, cache);

    // This runs the bot
    emojiElection(client, queue);

    // check every minute if it's okay to tweet
    setInterval(function() {

        tweetUntilYouDie(function(results) {
            console.log("Finished tweeting till I died. Time is:", (new Date()));
            console.log("Here are the results. Phew.");
            console.log(results);
        });

    }, 5000);

    function tweetUntilYouDie(next) {

        var RESULTS = [];

        for (var i = 0; i < POSTING_LIMIT; i++) {
            stack.ifSafeToTweet(tweet);
        }

        function tweet(err) {
            if (err) {
                RESULTS.push(err);
                if (RESULTS.length === POSTING_LIMIT) {
                    return next(RESULTS);
                }
                return;
            }

            queue.dequeue(processTweet);

            function processTweet(err, data) {
                if (err) {
                    RESULTS.push(err);
                    if (RESULTS.length === POSTING_LIMIT) {
                        return next(RESULTS);
                    }
                }

                data = JSON.parse(data);
                replyToVoter(client, data, replyCallback);

                function replyCallback(err, tweet, response) {
                    if (err) {
                        data.failed_replies_count++;
                        if (data.failed_replies_count < 3) {
                            // Retry
                            queue.enqueue(JSON.stringify(data), redis.print);
                        }
                        else {
                            console.error("Third error replying to tweet! I'm giving up on this one...");
                        }

                        RESULTS.push(err);
                        if (RESULTS.length === POSTING_LIMIT) {
                            return next(RESULTS);
                        }
                        console.error(err);
                        return;
                    }

                    stack.push(tweet.created_at, redis.print);

                    RESULTS.push(null);
                    if (RESULTS.length === POSTING_LIMIT) {
                        return next(RESULTS);
                    }
                }

            }

        }
    }
});

cache.on("error", function(err) {
    console.error("GODDAMNIT REDIS!!!", err);

    // TODO
    // errorBot
});

// HACK 
// This keeps shit alive on the server...
process.stdin.resume();