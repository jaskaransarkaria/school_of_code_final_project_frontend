import React, { useState } from "react";
import { render, fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import AdminPage from "./index";

describe("Admin can submit the schedule of the day (a form)", () => {
  it("display correct time", () => {
    const { getByDisplayValue } = render(<AdminPage />);
    // const selectElement = getByTestId("selectTime");
    // fireEvent.click(getByTestId("selectTime"))
    getByDisplayValue("09.00 - 10.00");
  });

  //   it("display 'Hello Sonj' from the input in the state", () => {
  //     const [sessionTitle, setSessionTitle] = useState("");
  //     const mockFunc = jest.fn(setSessionTitle);
  //     const { getByTestId } = render(<AdminPage />);
  //     fireEvent.change(getByTestId("sessionTitleInput"), {
  //       target: { value: "Hello Sonj" }
  //     });
  //     expect(mockFunc).toBeCalled();
  //   });
});
