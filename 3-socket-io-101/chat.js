const express = require('express')
const socketio = require('socket.io')
const app = express();

app.use(express.static(__dirname + "/public"))

const expressServer = app.listen(9000, console.log(`Listening on http://localhost:9000`))
const io = socketio(expressServer, {
	origins: "http://localhost:9000"
})

io.on("connection", socket => {
	socket.emit("messageFromServer", {
		data: "Welcome to the socketio server"
	})
	socket.on("messageFromServer", dataFromClient => console.log(dataFromClient))
})