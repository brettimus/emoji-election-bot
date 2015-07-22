var templates = require("./vote-replies");

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
    var originalData = data.original_request,
        originalStatus = originalData.original_text;

    var templateData = {
        candidate: originalData.candidates[0].handle,
        voter: originalData.voter.handle,
        vote: originalData.vote,
    };

    var votedForSelf = (templateData.voter === templateData.candidate);

    if (votedForSelf) {
        return templates.votedForSelf(templateData);
    }
    if (data.userInitialVotesCount === 0) {
        if (isFromApp(originalStatus)) {
            return templates.voteFirstApp(templateData);
        }
        else {
            return templates.voteFirstTwitter(templateData);
        }
    }
    else if (data.userUpdatingVote) {
        return templates.voteUpdated(templateData);
    }
    else {
        return templates.voteDefault(templateData);
    }
}

function isFromApp(originalStatus) {
    if (!originalStatus) {
        console.log("YOU DID NOT PASS ME THE ORIGINAL STATUS");
        return false;
    }
    return (originalStatus.indexOf("via @emojielection") !== -1);
}

// Helper... not sure what to do with this right now
function replyCallback(error, tweet, response) {
    if (error) {
        console.log("Error on reply", error);
    }
    // console.log(tweet);  // Tweet body. 
    // console.log(response);  // Raw response object. 
}