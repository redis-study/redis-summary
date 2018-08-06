var redis = require("redis");
var client = redis.createClient();

client.set("myKey", "myvalue");

var luaScript = 'return redis.call("GET", KEYS[1])';
client.eval(luaScript, 1, "myKey", function(err, reply) {
    console.log(reply);
    client.quit();
});