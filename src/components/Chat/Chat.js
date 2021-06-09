import React, { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import "./Chat.css";

function Chat(props) {
  const conversations_id = props.match.params.conversation_id;
  const [error, setError] = useState("");
  const { messages, setMessages, username } = useContext(AppContext);

  const getDataCallback = useCallback(() => {
    AuthAPIService.getMessage(conversations_id)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((error) => {
        setError(error);
      });
  }, [conversations_id, setMessages]);

  useEffect(() => {
    getDataCallback();
    const timeout = setInterval(getDataCallback, 6000);
    return () => {
      clearInterval(timeout);
    };
  }, [conversations_id, getDataCallback]);

  const handleMessage = (e) => {
    e.preventDefault();
    const { chat } = e.target;
    AuthAPIService.postMessage({
      conversations_id: conversations_id,
      text: chat.value,
      message_status: "not seen",
    })
      .then((message) => {
        setMessages([...messages, message]);
        e.target.reset();
      })
      .catch((res) => {
        console.log(error);
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, indx) => {
          return message.username === username ? (
            <div className="message-sent" key={indx}>
              <div className="user-info">
                <p className="chat-user-sent">{message.username}</p>
                <p className="chat-date-sent">
                  {new Date(message.timestamp).toLocaleDateString()}
                </p>
              </div>
              <p className="chat-message-sent">{message.text}</p>
            </div>
          ) : (
            <div className="message-recieved" key={indx}>
              <div className="user-info">
                <p className="chat-user-recieved">{message.username} </p>
                <p className="chat-date-recieved">
                  {new Date(message.timestamp).toLocaleDateString()}
                </p>
              </div>
              <p className="chat-message-recieved">{message.text}</p>
            </div>
          );
        })}
      </div>
      {error && <h3>Something went wrong</h3>}
      <div className="chat-form-box">
        <form className="chat-form" onSubmit={handleMessage}>
          <input
            className="chat-input"
            type="text"
            name="chat"
            id="chat"
            placeholder="type a message"
            aria-label="chat-message"
          ></input>
          <button className="chat-submit" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
