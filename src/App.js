import './App.css';
import io from 'socket.io-client'
import {useEffect, useState} from "react";
const socket=io.connect("http://localhost:3001")
//Making changes to post on github
function App() {
  const [room,setRoom]=useState("");
  const [message,setMessage]=useState("");
  const [messageReceived,setMessageRecieved]=useState("")
  const joinRoom=()=>{
    if(room!==""){
      socket.emit("join_room",room);
    }
  };
  const sendMessage=()=>{
    socket.emit("send_message",{message})
  };
  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setMessageRecieved(data.message);
    }
  )},[socket]);
  return (
    <div className="App">
      <input   
      placeholder='Room Number'
      onChange={(event)=>{
        setRoom(event.target.value);
      }}
      />
      <button onClick={joinRoom}>Join roorm</button>
      <input placeholder='Message...' 
      onChange={(event)=>{setMessage(event.target.value)}}/>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
 