var parseTweet = require("../tweet-parser");

var result = parseTweet({
    user: {
        screen_name: "rudeboot",
        name: "Boots McShoes",
        id: "2"
    },
    text: "hey",
    entities: {
        user_mentions: [
            {
                screen_name: "HillaryClinton",
                name: "Hillary Clinton",
                id: "1"
            },
            {
                screen_name: "mememe",
                name: "Me Sir I",
                id: "8"
            },
        ],
    },
});
console.log(result);