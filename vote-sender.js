var request           = require('request');
var parseVoteResponse = require('./vote-response-parser');

var ENDPOINT = 'http://emojifor.us/tweet/create';

module.exports = sendVote;

function sendVote(data, next) {
    request.post(
        ENDPOINT,
        { form: data },
        function (error, response, body) {
            if (error) {
                requestError(error);
                next(error);
            }
            if (!error && response.statusCode == 200) {
                next(null, response, JSON.parse(body));
            }
            else {
                responseError(response, body);
                next(true, response);
            }
        }
    );
}

function requestError(error) {
    console.log("OH NOZ! An error occurred when posting:", error);
}

function responseError(response, body) {
    console.log("Something went wrong ("+response.statusCode+")", body);
}