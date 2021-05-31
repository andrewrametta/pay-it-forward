import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NewDonation from "./NewDonation";

test("renders NewDonation", () => {
  render(
    <BrowserRouter>
      <NewDonation />
    </BrowserRouter>
  );
});
