import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Messages from "./Messages";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe(`Messages component`, () => {
  it("renders the complete page", () => {
    const wrapper = shallow(<Messages />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
