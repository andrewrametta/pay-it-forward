import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import About from "./About";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe(`About component`, () => {
  it("renders the complete page", () => {
    const wrapper = shallow(<About />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
