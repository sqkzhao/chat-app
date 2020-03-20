import React, { useState, useEffect } from 'react'
import { animateScroll } from "react-scroll";
import io from 'socket.io-client'
import GetStarted from './GetStarted'
import styles from '../module.css/Chat.module.css'

const Chat = (props) => {
    // INITIALIZE THE SOCKET - pass a callback to state
    // if invoke io function directily -> would be called every time the component renders
    const [socket] = useState(() => io(':8000'))
    const [name, setName] = useState("Unknown user")
    const [nameExist, setNameExist] = useState(false)
    const [message, setMessage] = useState()
    const [chatHistory, setChatHistory] = useState([])

    useEffect(() => {
        // socket.on - listen for event "welcome" -> received data
        socket.on("welcome", data => {
            console.log("Received msg: ", data)
        })


        // 4.NEW_MSG - receive updated chat history & store in chatHistory
        socket.on("new_msg", newHistory => {
            setChatHistory(oldHistory => {
                return newHistory
            })
        })

        // socket will be closed if Chat is unmounted (return a callback function)
        return () => socket.disconnect(true)
    }, [])

    const submitNameHandler = (e) => {
        e.preventDefault()
        setNameExist(true)
        // 1.SEND_MSG - send "user joined" msg to server
        socket.emit("send_msg", {
            name: "system",
            msg: `${name} has joined the chat.`
        })
    }

    const sendMsgHandler = (e) => {
        e.preventDefault()
        // SEND_MSG - send new msg to server
        socket.emit("send_msg", {
            name: name,
            msg: message
        })
    }

    return(
        <div className="card col-6 mx-auto mt-3 text-center">
            {/* Get Started */}
            { (!nameExist) && <GetStarted setName={setName} submitHandler={submitNameHandler} />}
            
            {(nameExist) &&
            <div className="card-body text-left">
                {/* CHAT BOX */}
                <div className={styles.chatBox} id="chat-history">
                    {chatHistory.map((item, i) => (
                        (item.name == "system") ?
                        <div key={i} className="p-3">{item.msg}</div> : (
                            (item.name == name) ? 
                            <div className="row justify-content-end">
                                <span key={i} className="alert alert-sm alert-primary mr-3">{item.msg}</span>
                            </div>
                            :
                            <div key={i} className="alert alert-sm alert-secondary">
                                <strong>{item.name}: </strong><br/>{item.msg}
                            </div>
                        )
                    ))}
                </div>
                {/* INPUT BOX */}
                <form onSubmit={sendMsgHandler} className="row text-center">
                    <input type="text" onChange={(e) => setMessage(e.target.value)} className="form-control col-10 mx-auto" />
                    <input type="submit" value="Send" className="col-2 btn btn-success" />
                </form>
            </div>
            }
        </div>
    )
}
export default Chat