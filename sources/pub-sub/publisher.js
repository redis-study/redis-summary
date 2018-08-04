var redis = require("redis");
var client = redis.createClient();

var channel = process.argv[2];
var command = process.argv[3];

client.publish(channel, command);

client.quit();