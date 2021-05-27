import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
//import io from "socket.io-client";
import "./Messages.css";
import { Link, Route } from "react-router-dom";
import Chat from "../Chat/Chat";

export default function Messages(props) {
  const [error, setError] = useState("");
  const { type, conversations, setConversations } = useContext(AppContext);

  useEffect(() => {
    AuthAPIService.getConversation()
      .then((conversations) => {
        setConversations(conversations);
      })
      .catch((res) => {
        setError(error);
      });
  }, []);

  return (
    <div className="messages-wrapper">
      <section>
        <header>
          <h1>Messages</h1>
        </header>
        <article className="conversation-list">
          {conversations.map((conversation, indx) => (
            <Link key={indx} to={`/messages/${conversation.id}`}>
              {type === "org" ? (
                <h2>{conversation.username2}</h2>
              ) : (
                <h2>{conversation.username}</h2>
              )}
              <p>{conversation.title}</p>
            </Link>
          ))}
        </article>
      </section>
      <Route exact path="/messages/:conversation_id" component={Chat} />
    </div>
  );
}
