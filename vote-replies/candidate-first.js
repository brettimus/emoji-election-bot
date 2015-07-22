// TRIGGER:
// User cast {{candidates}}'s first {{vote}} vote.

var Boo = require("boo-templates");

var t = "@{{voter}} "+
        "You cast the first {{vote}} for @{{candidate}}. "+
        "(You're so original!)";

var template = new Boo(t);

module.exports = candidateFirst;

function candidateFirst(data) {
    var tag = "\n\nThanks for voting 😁";
    var result = template.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
}