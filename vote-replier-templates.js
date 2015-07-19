var Boo = require("boo-templates");

var createdVote = "@{{voter}} "+
                    "You saved America!\n\n"+
                    "Your {{vote}} for @{{candidate}} was cast.";

var updatedVote = "@{{voter}} "+
                    "You saved America (again)!\n\n"+
                    "I updated your vote for @{{candidate}} to {{vote}}.";

var votedForSelf = "@{{voter}}"+
                    "You are America!!\n\n"+
                    "I'll remember next November that you are {{vote}}.";

var firstVoteForCandidate = "@{{voter}} "+
                "Hello, Patriot!\n\n"+
                "You're the first to give @{{candidate}} "+
                "a @{{vote}}.";

templates = {
    createdVote: new Boo(createdVote),
    updatedVote: new Boo(updatedVote),
    votedForSelf: new Boo(votedForSelf),
    firstVoteForCandidate: new Boo(firstVoteForCandidate),
};

module.exports.voteCreated = function(data) {
    var tag = "\n\n\nOh, and Democracy says thanks.";
    var result = templates.createdVote.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
};

module.exports.voteUpdated = function(data) {
    var tag = "\n\n\nDemocracy says thanks (again)";
    var result = templates.updatedVote.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
};

module.exports.firstVoteForCandidate = function(data) {
    var tag = "\n\n\nRally your friends to do the same!";
    var result = templates.firstVoteForCandidate.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
};

module.exports.votedForSelf = function(data) {
    var result = templates.votedForSelf.compile(data);
    if (result.length > 140) {
        result = trimResult(result);
    }
    return result;
};

function trimResult(string) {
    return string.slice(0, 137)+"...";
}