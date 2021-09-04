const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

// Makes a http server with Node
const server = http.createServer((req, res) => res.end("I am connected"));

const io = socketio(server, {
	cors: {
		origin: "http://localhost:8000",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: false,
	},
})


io.on("connection", (socket, req) => {
	// ws.send becomes socket.emit
	socket.emit("welcome", "Welcome to the WebSocket Server")
	socket.on("message", (msg) => console.log(msg.toString()))
})


server.listen(8000, console.log(`Listening on http://localhost:8000`))