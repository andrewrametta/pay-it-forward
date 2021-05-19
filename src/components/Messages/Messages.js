import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../AppContext";
//import io from "socket.io-client";
import "./Messages.css";

let socket;
const CONNECTION_PORT = "localhost:8800";

function Messages() {
  const { conversations, setConversations, messages, setMessages } = useContext(
    AppContext
  );

  // const [loggedIn, setLoggedIn] = useState(false);
  // const [room, setRoom] = useState("");
  // const [userName, setUserName] = useState("");
  // useEffect(() => {
  //   socket = io(CONNECTION_PORT);
  // }, [CONNECTION_PORT]);

  // const connectToRoom = () => {
  //   socket.emit("join_room", room);
  // };
  return (
    <div className="messages-wrapper">
      <section>
        <header>
          <h1>Messages</h1>
        </header>
        <article>
          <h3>You have 2 new messges</h3>
        </article>
        <p>
          Metropolitan Ministries : I am interested in your couch, is it still
          available?
        </p>
        <p>
          Sunshine Church: I can pick up the couch this Saturday, is it still
          avaliable?
        </p>
        {/* <button onClick={connectToRoom}>Connect</button> */}
      </section>
    </div>
  );
}

export default Messages;
