var templates = require("./vote-replier-templates");

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
    var reply;

    if (templateData.voter === templateData.candidate) {
        return votedForSelfMessage(templateData);
    }
    else if (data.isNew) {
        return voteCreatedMessage(templateData);
    }
    else {
        return voteUpdatedMessage(templateData);
    }
}

function voteCreatedMessage(data) {
    var tag = "\n\n\nOh, and Democracy says thanks.";
    var result = templates.createdVote.compile(data);

    if ((result + tag).length > 140) {
        result = trimResult(result);
    }
    return (result + tag);
}

function voteUpdatedMessage(data) {
    var tag = "\n\n\nDemocracy says thanks (again)";
    var result = templates.updatedVote.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
}

function votedForSelfMessage(data) {
    var result = templates.votedForSelf.compile(data);
    if (result.length > 140) {
        result = trimResult(result);
    }
    return result;
}

function trimResult(string) {
    return string.slice(0, 137)+"...";
}