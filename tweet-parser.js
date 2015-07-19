var emojiRegex = require("emoji-regex");
module.exports = parseTweet;

function parseTweet(tweet) {
    var vote     = getEmoji(tweet.text);
    var mentions = tweet
        .entities
        .user_mentions
        .map(parseMention);

    return {
        original_text: tweet.text,
        vote: vote,
        mentions: mentions,
    };
}

// Helpers
function getEmoji(text) {
    var match = text.match(emojiRegex());
    if (!match) return null;
    return match[0];
}

function parseMention(m) {
    return {
        handle : m.screen_name,
        name   : m.name,
        user_id: m.id,
    };
}