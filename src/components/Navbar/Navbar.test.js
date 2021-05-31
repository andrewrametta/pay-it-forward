import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("renders Navbar", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});
