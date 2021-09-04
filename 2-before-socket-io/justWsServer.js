const http = require('http')
// 3rd party websocket module
const websocket = require('ws')

const server = http.createServer((req, res) => res.end("I am connected"));

const wss = new websocket.Server({ server: server })

wss.on("headers", (headers, req) => console.log(headers))
wss.on("connection", (ws, req) => {
	ws.send("Welcome to the WebSocket Server")
	ws.on("message", (msg) => console.log(msg.toString()))
})

server.listen(8000, console.log(`Listening on http://localhost:8000`))