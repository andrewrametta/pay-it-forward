import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Chat from "./Chat";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppContext from "../../AppContext";

configure({ adapter: new Adapter() });

describe(`Chat component`, () => {
  it("renders the complete page", () => {
    const wrapper = shallow(
      <AppContext.Provider>
        <Chat />
      </AppContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
