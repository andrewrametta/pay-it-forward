import React, { useEffect, useState, useContext } from "react";
import AppContext from "../../AppContext";
import AuthAPIService from "../../services/auth-api-service";
import "./Messages.css";
import { Image, Transformation } from "cloudinary-react";
import { Link, Route } from "react-router-dom";
import Chat from "../Chat/Chat";

export default function Messages(props) {
  const [error, setError] = useState("");
  const [show, setShow] = useState(null);
  const { type, conversations, setConversations, setChatOn } = useContext(
    AppContext
  );

  useEffect(() => {
    setChatOn(true);
    setShow(null);
    AuthAPIService.getConversation()
      .then((conversations) => {
        setConversations(conversations);
      })
      .catch((error) => {
        setError(error);
      });
  }, [setConversations, setError, setChatOn]);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="messages-wrapper">
      <section className="conversation-list">
        {conversations.length > 0 ? (
          conversations.map((conversation, indx) => (
            <Link
              onClick={handleShow}
              key={indx}
              to={`/messages/${conversation.id}`}
            >
              {type === "org" ? (
                <div className="conversation-user-container">
                  {conversation.user2_url ? (
                    <Image
                      className="user-image"
                      cloudName="hq1rpt94r"
                      publicId={`${conversation.user2_url}`}
                      alt={`${conversation.username2} image`}
                    >
                      <Transformation
                        gravity="face"
                        height="100"
                        width="100"
                        crop="thumb"
                      />
                      <Transformation radius="max" />
                      <Transformation width="100" crop="thumb" />
                    </Image>
                  ) : null}
                  <h2 className="conversation-user">
                    {conversation.username2}
                  </h2>
                </div>
              ) : (
                <div className="conversation-user-container">
                  {conversation.user_url ? (
                    <Image
                      className="user-image"
                      cloudName="hq1rpt94r"
                      publicId={`${conversation.user_url}`}
                      alt={`${conversation.username} image`}
                    >
                      <Transformation
                        gravity="face"
                        height="100"
                        width="100"
                        crop="thumb"
                      />
                      <Transformation radius="max" />
                      <Transformation width="100" crop="thumb" />
                    </Image>
                  ) : null}
                  <h2 className="conversation-user">{conversation.username}</h2>
                </div>
              )}
            </Link>
          ))
        ) : (
          <h3>Looks like there are no Messages at this time</h3>
        )}
      </section>
      <section className="chat-box">
        {error && <h2 className="error-message">{error}</h2>}
        {show === null ? (
          <div className="show-chat-message">
            <p>Click on a user to chat</p>
          </div>
        ) : null}
        <Route exact path="/messages/:conversation_id" component={Chat} />
      </section>
    </div>
  );
}
