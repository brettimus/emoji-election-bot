// MEGA TODO
// This needs to be an ordered set instead
// ordering based off of timestamp in seconds... ugh.

var moment = require("moment");
var POSTING_LIMIT = require("../config").POSTING_LIMIT;

module.exports = function newStack(name, cache) {
    return new Stack(name, cache);
};

function Stack(name, cache) {
    this.name = name;
    this.cache = cache;
}

Stack.prototype.push = function(val, next) {
    this.cache.lpush(this.name, val, next);
};

Stack.prototype.pop = function(next) {
    this.cache.lpop(this.name, next);
};

Stack.prototype.nth = function(n, next) {
    this.cache.lindex(this.name, n, next);
};

Stack.prototype.head = function(next) {
    this.nth(0, next);
};

Stack.prototype.ifSafeToTweet = function(next) {
    var limitIndex = POSTING_LIMIT - 1;
    this.nth(limitIndex, function(err, response) {

        var rateLimitWindow,
            timeOfLastTweet;

        if (err) {
            return next(err);
        }
        if (response) {
            rateLimitWindow = moment().subtract(15, 'minutes');
            timeOfLastTweet = moment(response);

            if (timeOfTweet.isAfter(rateLimitWindow)) {
                return next(new Error("Tweet rate limit exceeded"));
            }
        }

        // We're good to go.
        next(null);

    });
};

Stack.prototype.flushExcess = function() {
    // NYI
};