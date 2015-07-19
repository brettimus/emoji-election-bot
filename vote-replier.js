var Boo = require("boo-templates");
var t   = "@{{voter}} You are saving America!\n\n"+
            "Your {{vote}} was cast.\n\n\n"+
            "Oh, and Democracy says thanks.";
var replyTemplate = new Boo(t);
module.exports = replyToVoter;

function replyToVoter(client, data, next) {
    var originalData = data.original_request;
    var templateData = {
        voter: originalData.voter.handle,
        vote: originalData.vote,
    };

    var status = replyTemplate.compile(templateData);
    var replyingTo = originalData.tweet_id;

    var tweetOptions = {
        status: status,
        in_reply_to_status_id: replyingTo,
    };

    client.post('statuses/update', tweetOptions, next);
}