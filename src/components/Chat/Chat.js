import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../AppContext";
import authApiService from "../../services/auth-api-service";
import AuthAPIService from "../../services/auth-api-service";

function Chat(props) {
  const conversation_id = props.match.params.conversation_id;
  const [error, setError] = useState("");
  const { messages, setMessages } = useContext(AppContext);
  console.log(props);

  useEffect(() => {
    AuthAPIService.getMessage(conversation_id)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((res) => {
        console.log(error);
      });
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();
    AuthAPIService.postMessage({})
      .then((message) => {
        setMessages([...messages, message]);
      })
      .catch((res) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>This is a Chat Box</h2>
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
          name="chat message"
          id="chat message"
          placeholder="type a message"
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
