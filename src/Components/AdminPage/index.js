import React, { useState } from "react";
import css from "./AdminPage.module.css";
import AdminPageOptions from "./AdminPageOptions";

const AdminPage = () => {
  // ability to upload schedule

  // a way to add several links
  // description <text area ></text>
  // content Urls
  // a way to review schedule
  // a way to upload video
  // a way to upload files
  // send all the info up to the App (useContext())
  // review schedule before upload?
  // progress bar to whilst uploading

  const [daysSchedule, setDaysSchedule] = useState([
    { sessionTimes: "09.00 - 10.00", contentTitle: "", contentURL: "" }
  ]);

  const formHandler = event => {
    event.preventDefault();
  };

  const handleSessionTime = (index, timeToSet) => {
    // const newSchedule = daysSchedule.slice();
    // newSchedule[index].sessionTimes = timeToSet;
    // setDaysSchedule(newSchedule);
    // console.log(newSchedule);

    setDaysSchedule([
      ...daysSchedule.slice(0, index),
      { ...daysSchedule[index], sessionTimes: timeToSet },
      ...daysSchedule.slice(index + 1)
    ]);
  };

  return (
    <form onSubmit={event => formHandler(event)}>
      {console.log(daysSchedule)}
      <fieldset>
        <legend>Session Information:</legend>
        {daysSchedule.map((item, ind) => {
          return (
            <>
              <br />
              <AdminPageOptions
                props={(ind, newTime) => handleSessionTime(ind, newTime)}
                index={ind}
                startValue={daysSchedule[ind].sessionTimes}
              />
              <input
                type="text"
                name="sessionTitle"
                placeholder="Session title"
                // get the corect index
                onChange={event =>
                  setDaysSchedule([
                    ...daysSchedule,
                    (daysSchedule[ind].contentTitle = event.target.value)
                  ])
                }
              />
            </>
          );
        })}

        <br />
        <>
          <button
            onClick={() =>
              setDaysSchedule([
                ...daysSchedule,
                {
                  sessionTimes: "09.00 - 10.00",
                  contentTitle: "",
                  contentURL: ""
                }
              ])
            }
          >
            add row
          </button>
          <input type="submit" value="Submit" />
        </>
      </fieldset>
    </form>
  );
};

export default AdminPage;
