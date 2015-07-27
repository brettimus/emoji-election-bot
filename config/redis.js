module.exports = {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "127.0.0.1",
    prefix: "ee:",
    queue: "queue",
    stack: "stack",
    queueName: function() {
        return this.prefix + this.queue;
    },
    stackName: function() {
        return this.prefix + this.stack;
    },
};