import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import EditDonation from "./EditDonation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EditDonation />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
