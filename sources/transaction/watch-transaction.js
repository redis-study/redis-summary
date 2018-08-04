var redis = require("redis");
var client = redis.createClient();

function zpop(key, callback) {
    client.watch(key, function(watchErr, watchReply) {
        client.zrange(key, 0, 0, function(zrangeErr, zrangeReply) {
            var multi = client.multi();
            multi.zrem(key, zrangeReply);
            multi.exec(function(transactionErr, transactionReply) {
                if(transactionReply) {
                    callback(zrangeReply[0]);
                } else {
                    zpop(key, callback);
                }
            });
        });
    });
}

client.zadd("presidents", 1732, "George Washington");
client.zadd("presidents", 1809, "Abraham Lincoln");
client.zadd("presidents", 1858, "Theodore Rooselvelt");

zpop("presidents", function(member) {
    console.log("The first president in the group is:", member);
    client.quit();
})