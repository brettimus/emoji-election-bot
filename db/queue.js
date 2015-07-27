module.exports = function newQueue(name, cache) {
    return new Queue(name, cache);
};

function Queue(name, cache) {
    this.name = name;
    this.cache = cache;
}

Queue.prototype.enqueue = function(val, next) {
    this.cache.rpush(this.name, val, next);
};

Queue.prototype.dequeue = function(next) {
    this.cache.lpop(this.name, next);
};

Queue.prototype.length = function(next) {
    this.cache.llen(this.name, next);
};