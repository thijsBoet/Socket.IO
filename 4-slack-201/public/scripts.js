const form = document.getElementById("message-form")
const messageInput = document.getElementById("user-message")
const message = document.getElementById("messages")

const socket = io("http://localhost:9000") // namespace / endpoint
const socket2 = io("http://localhost:9000/admin") // the admin namespace
const socket3 = io("http://localhost:9000/marketing") // the marketing namespace

socket.on('connect', () => console.log(socket.id))
socket2.on('connect', () => console.log(socket2.id))

socket.on("messageFromServer", dataFromServer => {
	console.log(dataFromServer)
	socket.emit("messageFromServer", {
		data: "This is from the client"
	})
})

form.addEventListener("submit", e => {
	e.preventDefault();
	let newMessage = messageInput.value

	socket.emit("newMessageToServer", {
		text: newMessage
	})
	newMessage = ""
})

socket.on("messageToClients", msg => {
	message.innerHTML += `<li>${msg.text}</li>`
})
