import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Chat from "./Chat";

test("renders Chat", () => {
  render(
    <BrowserRouter>
      <Chat />
    </BrowserRouter>
  );
});
