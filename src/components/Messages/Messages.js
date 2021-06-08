import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import "./Messages.css";
import { Link, Route } from "react-router-dom";
import Chat from "../Chat/Chat";

export default function Messages(props) {
  const [error, setError] = useState("");
  const { type, conversations, setConversations, setChatOn } = useContext(
    AppContext
  );

  useEffect(() => {
    setChatOn(true);
    AuthAPIService.getConversation()
      .then((conversations) => {
        setConversations(conversations);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setConversations, setError, setChatOn]);

  return (
    <div className="messages-wrapper">
      {error && <h2>error</h2>}
      <section className="conversation-list">
        {conversations.length > 0 ? (
          conversations.map((conversation, indx) => (
            <Link key={indx} to={`/messages/${conversation.id}`}>
              {type === "org" ? (
                <h2>{conversation.username2}</h2>
              ) : (
                <h2>{conversation.username}</h2>
              )}
              <p>{conversation.title}</p>
            </Link>
          ))
        ) : (
          <h3>Looks like there are no Messages at this time</h3>
        )}
      </section>
      <section className="chat-box">
        <Route exact path="/messages/:conversation_id" component={Chat} />
      </section>
    </div>
  );
}
