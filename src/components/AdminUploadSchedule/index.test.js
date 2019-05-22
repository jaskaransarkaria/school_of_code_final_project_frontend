// import React, { createContext } from "react";
// import { render, fireEvent } from "react-testing-library";
// import "react-testing-library/cleanup-after-each";
// import AdminPage from ".";
// import { Store } from "../App";

// describe("Admin can submit the schedule of the day (a form)", () => {
//   it("display correct time", () => {
//     const { getByDisplayValue } = render(<AdminPage />);
//     // const selectElement = getByTestId("selectTime");
//     // fireEvent.click(getByTestId("selectTime"))
//     getByDisplayValue("09.00 - 10.00");
//   });

//   it("display 'Hello Sonj' from the input in the state", () => {
//     const [sessionTitle, setSessionTitle] = useState("");
//     const mockFunc = jest.fn(setSessionTitle);
//     const { getByTestId } = render(<AdminPage />);
//     fireEvent.change(getByTestId("sessionTitleInput"), {
//       target: { value: "Hello Sonj" }
//     });
//     expect(mockFunc).toBeCalled();
//   });
// });

// describe("AdminUploadSchedulePage", () => {
//   it("should capture user input and store them in the schedule store", () => {
//     const mockSetSchedule = jest.fn();
//     const { getByPlaceholderText, getByText, getByLabelText } = render(
//       <Store.Provider value={[[], mockSetSchedule]}>
//         <AdminPage />
//       </Store.Provider>
//     );

//     fireEvent.change(getByPlaceholderText("Session title"), {
//       target: { value: "test session" }
//     });
//     fireEvent.change(getByLabelText("Useful Links:"), {
//       target: { value: "www.reactjs.org" }
//     });
//     fireEvent.change(getByLabelText("Session date"), {
//       target: { value: "09/05/2019" }
//     });
//     fireEvent.click(getByText("Submit"));

//     expect(mockSetSchedule).toHaveBeenCalledTimes(1);
//     expect(mockSetSchedule).toHaveBeenCalledWith({
//       date: "09/05/2019",
//       daysContent: [
//         {
//           sessionTimes: "09.00 - 10.00",
//           contentTitle: "test session",
//           contentURL: "www.reactjs.org"
//         }
//       ]
//     });
//   });
// });
