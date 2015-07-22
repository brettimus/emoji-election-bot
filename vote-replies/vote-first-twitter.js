// TRIGGER:
// User's first vote, and it did not come from the web app.

var Boo = require("boo-templates");

var t = "@{{voter}} "+
        "You saved democracy!\n\n"+
        "Your 1st vote was cast.";

var template = new Boo(t);

module.exports = voteFirstTwitter;

function voteFirstTwitter(data) {
    var tag = " (@{{candidate}} is pretty {{vote}}!)";
    var result = template.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
}