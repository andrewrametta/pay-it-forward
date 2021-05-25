import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-wrapper">
      <section className="about-section">
        <header>
          <h1>About Page</h1>
        </header>
        <article>
          <h2>Donor User Info</h2>
          <p>
            As a registered donor you can post new donations. First take a
            picture of your donation. Then follow the steps to add a new
            donation by uploading a picture and then filling out the item
            description form. You can also manage your donations and delete
            anytime.
          </p>
          <p>
            Once your donation is posted a nonprofit will contact you if
            interested and then you can contact them through our messaging
            system.
          </p>
        </article>
        <article>
          <h2>Organization User Info</h2>
          <p>
            As a verified nonprofit organization you will have access to all
            available donations. All you have to do is click on a donation then
            hit ‘request’ and you will start a conversation in our messaging
            service to connect with a donor and schedule a pickup or drop off.
          </p>
        </article>
        <h5>Register now or click the 'Login' button and use the provided credentials to test out our app.</h5>
      </section>
    </div>
  );
}

export default About;
