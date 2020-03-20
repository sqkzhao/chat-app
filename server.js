// BRING IN ALL DEPENDENCIES
const express = require("express")
// CREATE A INSTANCE OF EXPRESS SERVER
const app = express()
// TURN ON EXPRESS SERVER 
const server = app.listen(8000, ()=> {
    console.log("connecting to port 8000")
})

// INITIALIZE THE SOCKET
// CREATE A INSTANCE OF SOCKET.IO -> PASS IT TO EXPRESS SERVER
const io = require("socket.io")(server)

const chat = []

// HANDSHAKE
// event listener - "connection"
io.on("connection", socket => {
    console.log("Nice to meet you. (shake hand) ", socket.id)
    // socket.emit - emit an event "welcome" -> send msg
    socket.emit("welcome", "welcome from the server!")
    

    // 2.SEND_MSG - receive msg & store in chat
    socket.on("send_msg", msg => {
        chat.push(msg)
        // 3.NEW_MSG - send updated chat history to clients
        // io.emit - send to all clients
        io.emit("new_msg", chat)
    })
})