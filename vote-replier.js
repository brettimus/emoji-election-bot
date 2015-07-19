var Boo = require("boo-templates");
var t   = "@{{voter}} You are saving America!\n"+
            "Your vote of {{vote}} was recorded.\n\n"+
            " Democracy says thanks.";
var replyTemplate = new Boo(t);
module.exports = replyToVoter;

function replyToVoter(client, data, next) {
    var templateData = {
        voter: data.voter.handle,
        vote: data.vote,
    };

    var status = replyTemplate.compile(templateData);
    var replyingTo = data.tweet_id;

    var tweetOptions = {
        status: status,
        in_reply_to_status_id: replyingTo,
    };

    client.post('statuses/update', tweetOptions, next);
}