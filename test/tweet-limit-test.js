var util = require("util");
var Twitter = require("twitter");
var credentials = require("../config/credentials");
var client      = new Twitter(credentials);

var params = {
    resources: "users,statuses",
};
client.get("application/rate_limit_status", function(err, response) {
    if (err) {
        console.log("ERROR!", err);
        return;
    }
    console.log(util.inspect(response, false, null));
});