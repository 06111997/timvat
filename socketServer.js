var net = require('net');
var server = net.createServer();
var fs = require('fs');

server.on("connection", function(socket){
    var remoteAddress = socket.remoteAddress + ":" + socket.remotePort;
    console.log("new client connect is made %s", remoteAddress);

    socket.on("data", function(data){
        try {
            let uluru = JSON.parse(data);
            const rad = Math.floor(Math.random() * 49) + 1;
            uluru.lng = uluru.lng + 0.00002 *  rad;
            uluru.lat = uluru.lat + 0.00002 * (1 - 1 / rad);
            fs.appendFile('file.txt','\n' + JSON.stringify(uluru), function (err) {
                if (err) throw err;
                console.log('Updated!');
            });
            console.log("Data from %s: %s", remoteAddress, data);
            socket.write("Hello" + "Hi");
        } catch (error) {
            console.log(error.message);
            socket.write("error!");
        }
    });
    socket.once("close",function(){
        console.log("connection closed!");
    });
    socket.on("error",function(){});
});

server.listen(80,function(){
    console.log("server listening to %j", server.address());
});