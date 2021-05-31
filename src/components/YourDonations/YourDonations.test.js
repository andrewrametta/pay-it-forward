import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import YourDonations from "./YourDonations";

test("renders YourDonations", () => {
  render(
    <BrowserRouter>
      <YourDonations />
    </BrowserRouter>
  );
});
