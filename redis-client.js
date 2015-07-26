var redis = require("redis");
var config = require("./config/redis");

var port = config.port;
var host = config.host;

module.exports = function() {
    return redis.createClient(port, host);
};

// NYI
// Intended to process queue of votes
