var CANDIDATES = require("./candidates");
var emojiRegex = require("emoji-regex");

module.exports = parseTweet;

function parseTweet(tweet) {
    var text       = tweet.text,
        vote       = parseEmoji(text),
        voter      = parseUser(tweet.user),
        candidates = tweet
            .entities
            .user_mentions
            .filter(isCandidate)
            .map(parseUser);

    console.log("candidates from tweet: ", candidates);
    return {
        vote          : vote,
        voter         : voter,
        candidates    : candidates,
        original_text : text,
        tweet_id      : tweet.id,
    };
}

// Helpers
//
function isCandidate(m) {
    return CANDIDATES.contains(m.screen_name);
}

function parseEmoji(text) {
    var match = text.match(emojiRegex());
    if (!match) return null;
    return match[0];
}

function parseUser(m) {
    return {
        handle    : m.screen_name,
        name      : m.name,
        twitter_id: m.id,
    };
}

