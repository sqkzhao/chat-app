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
// HANDSHAKE
// event listener - "connection"
io.on("connection", socket => {
    console.log("Nice to meet you. (shake hand) ", socket.id)
    // add'l event listeners
    // socket.emit - emit an event "welcome" -> send msg
    socket.emit("welcome", "From server: welcome!")
})