# redis-delete-wildcard

Delete a set of keys from a pattern with wildcard. Operation is done through a lua script, and therefore atomic. It extends standard [node_redis][] library with a new method `delwild`.
[node_redis]: https://github.com/mranney/node_redis

## Getting started
Install the module with: `npm install redis-delete-wildcard`

````js
// Create a redis client
var redis = require('redis');
require('redis-delete-wildcard')(redis); //pass in redis so prototype can be extended
var client = redis.createClient();

// Usage
client.delwild('pattern:*', function(error, numberDeletedKeys) {
    console.log(numberDeletedKeys);
}
````
## Why should I use it? 
* This method call is atomic and executed by Redis via LUA script. 
* Foreach loops should be faster in Redis LUA than in Node.
* Simple source (check its just 29 lines)
* Works great for small datasets, will spare much time in writing array handling code

## Why shouldn't?
* `KEYS` command in Redis is not recommended for large sets of data. 
* `unpack()` in LUA can give some errors when sets of data are couple of thousand
* If you need to delete a part of database, for example delete all cache on application upstart, simpler solution is to partition data by numeric database and use `flush`/`flushdb`

## Contributing, & @todo list ;)
* tests please
* make lua script use `SCAN` instead of `KEYS`
* use `SCRIPT LOAD` & `EVALSHA` instead of `EVAL`
