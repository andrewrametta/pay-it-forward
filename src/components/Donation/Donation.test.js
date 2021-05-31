import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Donation from "./Donation";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe(`Donation component`, () => {
  it("renders the complete page", () => {
    const wrapper = shallow(<Donation />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
