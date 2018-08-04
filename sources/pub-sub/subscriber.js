var os = require("os");
var redis = require("redis");
var client = redis.createClient();

var COMMANDS = {};

COMMANDS.DATE = function() {
    var now = new Date();
    console.log("DATE " + now.toISOString());
};

COMMANDS.PING = function() {
    console.log("PING");
}

COMMANDS.HOSTNAME = function() {
    console.log("HOSTNAME " + os.hostname());
}

client.on("message", function(channel, commandName) {
    if(COMMANDS.hasOwnProperty(commandName)) {
        var commandFunction = COMMANDS[commandName];
        commandFunction();
    } else {
        console.log("Unknown command: " + commandName);
    }
});

client.subscribe("global", process.argv[2]);