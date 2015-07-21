var templates = require("./vote-replier-templates");

replyToVoter.replyCallback = replyCallback;
module.exports = replyToVoter;

function replyToVoter(client, data, next) {
    var status     = createReply(data);
    var replyingTo = data.original_request.tweet_id;

    var tweetOptions = {
        status: status,
        in_reply_to_status_id: replyingTo,
    };

    client.post('statuses/update', tweetOptions, next);
}

function createReply(data) {
    var originalData = data.original_request;
    var templateData = {
        candidate: originalData.candidates[0].handle,
        voter: originalData.voter.handle,
        vote: originalData.vote,
    };

    var votedForSelf = (templateData.voter === templateData.candidate);
    if (data.isFirstVote) {
        return templates.firstVoteForCandidate(templateData);
    }
    if (votedForSelf) {
        return templates.votedForSelf(templateData);
    }
    else if (data.isNew) {
        return templates.voteCreated(templateData);
    }
    else {
        return templates.voteUpdated(templateData);
    }
}

// Helper... not sure what to do with this right now
function replyCallback(error, tweet, response) {
    if (error) {
        console.log("Error on reply", error);
    }
    // console.log(tweet);  // Tweet body. 
    // console.log(response);  // Raw response object. 
}