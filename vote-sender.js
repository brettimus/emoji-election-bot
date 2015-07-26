var request           = require('request');
var parseVoteResponse = require('./vote-response-parser');

var ENDPOINT = require("./config").ENDPOINT;

module.exports = sendVote;

function sendVote(data, next) {
    data.bot_key = process.env.BOT_KEY;
    request.post(
        ENDPOINT,
        { form: data },
        function (error, response, body) {
            if (error) {
                requestError(error);
                next(error);
                return;
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
    console.log("Something went wrong ("+(response && response.statusCode)+")", body);
}