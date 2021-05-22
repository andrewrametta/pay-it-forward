import React, { useContext, useState, useEffect } from "react";
import AppContext from "../../AppContext";
import authApiService from "../../services/auth-api-service";
import AuthAPIService from "../../services/auth-api-service";

function Chat(props) {
  const conversations_id = props.match.params.conversation_id;
  const [error, setError] = useState("");
  const { messages, setMessages, user_id, username } = useContext(AppContext);
  console.log(props);

  useEffect(() => {
    AuthAPIService.getMessage(conversations_id)
      .then((messages) => {
        setMessages(messages);
      })
      .catch((res) => {
        console.log(error);
      });
  }, []);

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
          name="chat"
          id="chat"
          placeholder="type a message"
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
