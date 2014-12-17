module.exports = function(redisInstance) {
    redisInstance.RedisClient.prototype.delwild = function(keyWithWildcard, callback) {

        var redis = this;

        redis.eval(
            // little fancy atomic lua script based on
            // http://stackoverflow.com/a/16974060/3202588
            "local keysToDelete = redis.call('keys', ARGV[1]) " + //find keys with wildcard
            "if unpack(keysToDelete) ~= nil then " + //if there are any keys
                "return redis.call('del', unpack(keysToDelete)) " + //delete all
            "else " +
                "return 0 " + //if no keys to delete
            "end ",
            0, //no keys names passed, only one argument ARGV[1]
            keyWithWildcard,
            function(error, responce) {
                if (error) {
                    callback(error);
                    return;
                }

                //success
                callback(null, responce);
            }
        );

    };
}
