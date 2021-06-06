import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import EditDonation from "./EditDonation";
// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AppContext from "../../AppContext";

configure({ adapter: new Adapter() });

describe(`EditDonation component`, () => {
  it.only("renders the complete page", () => {
    const wrapper = shallow(
      <AppContext.Provider>
        <EditDonation />
      </AppContext.Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
