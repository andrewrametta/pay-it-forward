import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

test("renders Login", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
});
