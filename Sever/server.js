/*
 * Socket.io extension
 * License: MIT License
*/

var app = require("http").createServer(handler);
try{
	var io = require("socket.io")(app);
}catch(e){
	console.log("OOPS! Please install socket.io!");
	console.error(e);
	process.exit(1);
}

app.listen(4154);

function handler(req, res){
	res.writeHead(300, {"Location": "http://scratchx.org/?url=http://mrcomputer1extensions.github.io/socket.io-extension/Extension/socket.io.extension.js"});
	res.end("Please wait...");
}

io.on("connection", function(socket){
	socket.on("handle", function(data){
		socket.emit("handled", data);
	})
});
