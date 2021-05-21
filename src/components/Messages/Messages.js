import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
//import io from "socket.io-client";
import "./Messages.css";
import { Link, Route } from "react-router-dom";
import Chat from "../Chat/Chat";

// let socket;
// const CONNECTION_PORT = "localhost:8800";

export default function Messages(props) {
  const [error, setError] = useState("");
  const [selectedConverstion, setSelectedConversation] = useState(null);
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
        <article className="conversation-list">
          {conversations.map((conversation, indx) => (
            <Link key={indx} to={`/messages/${conversation.id}`}>
              <h2>{conversation.username2}</h2>
              <p>{conversation.title}</p>
            </Link>
          ))}
        </article>

        {/* <button onClick={connectToRoom}>Connect</button> */}
      </section>
      <Route exact path="/messages/:conversation_id" component={Chat} />
    </div>
  );
}
