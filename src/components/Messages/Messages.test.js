import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Messages from "./Messages";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppContext from "../../AppContext";

configure({ adapter: new Adapter() });

describe(`Messages component`, () => {
  it.only("renders the complete page", () => {
    const wrapper = shallow(
      <AppContext.Provider>
        <Messages />
      </AppContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
