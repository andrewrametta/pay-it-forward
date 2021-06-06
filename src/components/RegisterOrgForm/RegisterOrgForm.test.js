import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RegisterOrgForm from "./RegisterOrgForm";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppContext from "../../AppContext";

configure({ adapter: new Adapter() });

describe(`RegisterOrgForm component`, () => {
  it.only("renders the complete page", () => {
    const wrapper = shallow(
      <AppContext.Provider>
        <RegisterOrgForm />
      </AppContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
