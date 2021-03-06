import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RegisterUserForm from "./RegisterUserForm";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppContext from "../../AppContext";

configure({ adapter: new Adapter() });

describe(`RegisterUserForm component`, () => {
  it.only("renders the complete page", () => {
    const wrapper = shallow(
      <AppContext.Provider>
        <RegisterUserForm />
      </AppContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
