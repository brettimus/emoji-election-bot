module.exports = validateVote;

function validateVote(data, callbacks) {

    callbacks.success = callbacks.success || noop;
    callbacks.failure = callbacks.failure || noop;

    if (!data.vote) {
        console.log("No emoji found. Here's the parsed data: ", data);
        callbacks.failure("No emoji.");
    } else if (!data.candidates.length) {
        console.log("No candidate found! Here's the parsed data: ", data);
        callbacks.failure("No candidate.");
    } else {
        callbacks.success();
    }
}

function noop() {}