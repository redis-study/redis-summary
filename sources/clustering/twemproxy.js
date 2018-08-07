var redis = require('redis');
var options = {
    "no_ready_check":true
};
var client = redis.createClient(22121, 'localhost', options);
var alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]
alphabet.forEach(function(latter) {
    client.set(latter, latter);
});
client.quit();