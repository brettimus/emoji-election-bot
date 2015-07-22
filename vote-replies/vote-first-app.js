// TRIGGER:
// User's first vote, and it came from the web app.

var Boo = require("boo-templates");

var t = "@{{voter}} "+
        "Thanks for voting, patriot!\n\n"+
        "Your {{vote}} for @{{candidate}} was cast.";

var template = new Boo(t);

module.exports = voteFirstApp;

function voteFirstApp(data) {
    var tag = " Now try voting directly from Twitter!";
    var result = template.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
}