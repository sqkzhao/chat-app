import React, { useCallback, useState, useEffect } from 'react'
import io from 'socket.io-client'

const Chat = (props) => {
    // INITIALIZE THE SOCKET - pass a callback to state
    // if invoke io function directily -> would be called every time the component renders
    const [socket] = useState(() => io(':8000'))

    useEffect(() => {
        // socket.on - listen for event "welcome" -> console.log received data
        socket.on("welcome", data => {
            console.log("Received msg: ", data)
        })

        // return a callback function
        // socket will be closed if Chat is unmounted
        return () => socket.disconnect(true)
    }, [])

    return(
        <h1> chat </h1>
    )
}
export default Chat