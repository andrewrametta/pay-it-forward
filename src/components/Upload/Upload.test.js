import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Upload from "./Upload";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe(`Upload component`, () => {
  it("renders the complete page", () => {
    const wrapper = shallow(<Upload />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
