// TRIGGER:
// User's vote was updated.

var Boo = require("boo-templates");

var t = "@{{voter}} You flip-flopper! "+
        "I updated your vote for @{{candidate}}.";

var template = new Boo(t);

module.exports = voteFirstTwitter;

function voteFirstTwitter(data) {
    var tag = (new Boo("\n\n(I agree, {{vote}} was a better choice.)")).compile(data);
    var result = template.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
}