import React, { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";

function Chat(props) {
  const conversations_id = props.match.params.conversation_id;
  const [error, setError] = useState("");
  const { messages, setMessages } = useContext(AppContext);

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
    <div>
      {messages.map((message, indx) => (
        <div key={indx}>
          <p>{message.username}</p>
          <p>{message.text}</p>
          <p>{new Date(message.timestamp).toLocaleDateString()}</p>
        </div>
      ))}
      <form onSubmit={handleMessage}>
        <input
          type="text"
          name="chat"
          id="chat"
          placeholder="type a message"
        ></input>
        <button type="submit">Send</button>
      </form>
      {error && <h3>Something went wrong</h3>}
    </div>
  );
}

export default Chat;
