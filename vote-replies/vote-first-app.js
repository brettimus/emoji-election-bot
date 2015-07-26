// TRIGGER:
// User's first vote, and it came from the web app.

var Boo = require("boo-templates");

var t = "@{{voter}} "+
        "Thanks for voting, patriot! "+
        "Your {{vote}} for @{{candidate}} was cast.";

var template = new Boo(t);

module.exports = voteFirstApp;

function voteFirstApp(data) {
    var tag = "\n\n Vote again on Twitter! https://medium.com/@emojielection/how-to-vote-in-the-emoji-election-58d108cefae5";
    var result = template.compile(data);

    if ((result + tag).length > 140) {
        return result;
    }
    return (result + tag);
}