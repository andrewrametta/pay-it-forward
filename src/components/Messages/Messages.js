import React from "react";
import "./Messages.css";

function Messages() {
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
      </section>
    </div>
  );
}

export default Messages;
