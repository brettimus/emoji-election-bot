// TRIGGER:
// {{voter}} is {{candidate}}

var Boo = require("boo-templates");

var t = "@{{voter}}"+
        "Can't believe you voted...!\n\n"+
        "I'll remember this in Nov. 😉";

var template = new Boo(t);

module.exports = candidateSelf;

function candidateSelf(data) {
    var result = template.compile(data);
    return (result + tag);
}