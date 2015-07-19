var Boo = require("boo-templates");

var createdVote = "@{{voter}} "+
                    "You saved America!\n\n"+
                    "Your {{vote}} for @{{candidate}} was cast.";

var updatedVote = "@{{voter}} "+
                    "You saved America (again)!\n\n"+
                    "I updated your vote for @{{candidate}} to {{vote}}.";

var votedForSelf = "@{{voter}} You are America!!\n\n"+
                    "I'm glad you find yourself {{vote}}.";

module.exports = {
    createdVote: new Boo(createdVote),
    updatedVote: new Boo(updatedVote),
    votedForSelf: new Boo(votedForSelf),
};