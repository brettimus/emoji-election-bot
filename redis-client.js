var redis = require("redis");
var port = process.env.REDIS_PORT;
var host = process.env.REDIS_HOST;

module.exports = function() {
    return redis.createClient(port, host, {});
};

// NYI
// Intended to process queue of votes
