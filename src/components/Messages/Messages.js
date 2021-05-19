import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
//import io from "socket.io-client";
import "./Messages.css";

// let socket;
// const CONNECTION_PORT = "localhost:8800";

export default function Messages(props) {
  const [error, setError] = useState("");
  const { conversations, setConversations, messages, setMessages } = useContext(
    AppContext
  );

  useEffect(() => {
    AuthAPIService.getConversation()
      .then((conversations) => {
        setConversations(conversations);
      })
      .catch((res) => {
        setError(error);
      });
  }, []);

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
      {conversations.map((conversation, indx) => (
        <div key={indx}>
          <h2>{conversation.id}</h2>
          <p>{conversation.user_id}</p>
          <p>{conversation.user2_id}</p>
        </div>
      ))}
    </div>
  );
}
