var CANDIDATES = [
    "HillaryClinton",
    "BernieSanders",
    "LincolnChafee",
    "MartinOMalley",
    "JimWebbUSA",
    "ChrisChristie",
    "JebBush",
    "TedCruz",
    "RandPaul",
    "BobbyJindal",
    "MarcoRubio",
    "rudeboot",
].map(function(s) { return s.toLowerCase(); });

// Make a hash for easier lookups by handle
CANDIDATES._hash = {};
CANDIDATES.forEach(function(handle) {
    this._hash[handle] = true;
}, CANDIDATES);


CANDIDATES.contains = function(handle) {
    var iHandle = handle.toLowerCase();
    return !!CANDIDATES._hash[iHandle];
};

module.exports = CANDIDATES;


