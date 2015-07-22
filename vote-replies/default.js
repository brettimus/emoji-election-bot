// TRIGGER:
// User voted and nothing else special.

// TODO - randomly generate status

var Boo = require("boo-templates");

var t = "@{{voter}} "+
        "You saved Democracy (again)!\n\n"+
        "Your {{vote}} was cast for @{{candidate}}.";

var template = new Boo(t);

module.exports = voteDefault;

function voteDefault(data) {
    var tag = " ...I 😍 U.";
    var result = template.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
}