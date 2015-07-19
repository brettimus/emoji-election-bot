var request    = require('request');
var Twitter    = require('twitter');

var parseTweet    = require('./tweet-parser');
var parseResponse = require('./response-parser');

var client = new Twitter({
    consumer_key: 'hnlhI3YdRyp7cnhHgrXqGjC2T',
    consumer_secret: 'ehYqzFAvCt7vp4HoqfJwrljmwxVomqU0lVmMpPETmqVy1ho2C5',
    access_token_key: '3282898548-GSH0CzvuJSia79BChPAK08uW0B2fo13IMkAHDrk',
    access_token_secret: 'OnpsBiw66URVqx5msiaCoRRrQ5ZmvjhlDxXgWD6xT3Cd8'
});

client.stream('statuses/filter', {track: '@emoji4president'}, function(stream) {

    stream.on('data', function(tweet) {
        var data = parseTweet(tweet);
        if (validateVote(data)) {
            postTweet(data);
        }
    });

    stream.on('error', function(error) {
        console.log(error);
        throw error;
    });

  process.stdin.resume(); // HACK keeps shit alive on the server...
});

// make async?
function validateVote(data) {
    if (!data.vote) {
        console.log("No emoji found. Here's the parsed data: ", data);
        return false;
    }
    if (data.mentions.length < 2) {
        console.log("No candidate found! Here's the parsed data: ", data);
        return false;
    }
    return true;
}

function postTweet(data) {
    request.post(
        'http://emojifor.us/tweet',
        { form: data },
        function (error, response, body) {
            console.log(response.statusCode);
            if (error) {
                console.log("OH NOZ! An error:", error);
            }
            if (!error && response.statusCode == 200) {
                parseResponse(body);
            }
        }
    );
}