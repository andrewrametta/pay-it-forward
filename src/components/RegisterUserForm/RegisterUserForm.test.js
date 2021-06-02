import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Register from "./Register";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe(`Register component`, () => {
  it("renders the complete page", () => {
    const wrapper = shallow(<Register />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
