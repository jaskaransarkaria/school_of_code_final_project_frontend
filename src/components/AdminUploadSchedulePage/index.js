import React, { useState, useEffect } from "react";
import css from "./AdminUploadSchedulePage.module.css";
import AdminPageScheduleTimes from "../AdminPageScheduleTimes";
import moment from "moment";

const AdminUploadSchedulePage = props => {
  // ability to upload schedule
  // pass down a function that adds the days schedule up to the state in the app
  // multiple content Urls
  // date setter (more intuitive and force date to be a certain format) use a calender/ date picker probs
  // auto select next time slot

  // then clear the schedule
  // description <text area ></text> add description mechanism
  // a way to upload video
  // a way to upload files
  // progress bar to whilst uploading

  // send all the info up to the App (useContext())?
  // review schedule before upload?

  const [daysSchedule, setDaysSchedule] = useState([
    { sessionTimes: "09.00 - 10.00", contentTitle: "", contentURL: [] }
  ]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );

  const formHandler = event => {
    event.preventDefault();
    const scheduleToBeApended = daysSchedule.slice();
    props.props(selectedDate, scheduleToBeApended);
  };

  const addURL = ind => {
    if (ind + 1 === daysSchedule.length) {
      if (daysSchedule[ind].contentURL.length > 0) {
        setDaysSchedule([
          ...daysSchedule.slice(0, ind),
          {
            ...daysSchedule[ind],
            contentURL: [...daysSchedule[ind].contentURL, ""]
          }
        ]);
      } else {
        return alert("add a URL before adding another field");
      }
    } else {
      if (daysSchedule[ind].contentURL.length > 0) {
        setDaysSchedule([
          ...daysSchedule.slice(0, ind),
          {
            ...daysSchedule[ind],
            contentURL: [...daysSchedule[ind].contentURL, ""]
          },
          ...daysSchedule.slice(ind + 1)
        ]);
      } else {
        return alert("add a URL before adding another field");
      }
    }
  };

  const addContentURLField = (ind, contentIndex, newURL) => {
    // add conditional to account for if the user has returned and added a url at the end
    ind + 1 === daysSchedule.length
      ? setDaysSchedule([
          ...daysSchedule.slice(0, ind),
          {
            ...daysSchedule[ind],
            contentURL: [
              ...daysSchedule[ind].contentURL.slice(0, contentIndex),
              newURL
            ]
          }
        ])
      : setDaysSchedule([
          ...daysSchedule.slice(0, ind),
          {
            ...daysSchedule[ind],
            contentURL: [
              ...daysSchedule[ind].contentURL.slice(0, contentIndex),
              newURL
            ]
          },
          ...daysSchedule.slice(ind + 1)
        ]);
  };

  const handleSessionTime = (index, timeToSet) => {
    setDaysSchedule([
      ...daysSchedule.slice(0, index),
      { ...daysSchedule[index], sessionTimes: timeToSet },
      ...daysSchedule.slice(index + 1)
    ]);
  };
  return (
    <form>
      <fieldset>
        <legend>Session Information:</legend>
        <div>
          Date:{" "}
          <input
            type="text"
            value={selectedDate}
            onChange={e => {
              e.preventDefault();
              setSelectedDate(e.target.value);
            }}
          />
        </div>
        {daysSchedule.map((_, ind) => {
          return (
            <>
              <br />
              <AdminPageScheduleTimes
                props={(ind, newTime) => handleSessionTime(ind, newTime)}
                index={ind}
                startValue={daysSchedule[ind].sessionTimes}
              />
              <input
                type="text"
                name="sessionTitle"
                placeholder="Session title"
                onChange={event =>
                  setDaysSchedule([
                    ...daysSchedule.slice(0, ind),
                    { ...daysSchedule[ind], contentTitle: event.target.value },
                    ...daysSchedule.slice(ind + 1)
                  ])
                }
              />
              <br />
              <br />
              <>
                Description: <textarea name="Description" />
              </>
              <br />
              <br />
              <input type="file" multiple />
              <br />
              {daysSchedule[ind].contentURL.length > 0 ? (
                daysSchedule[ind].contentURL.map((_, contentIndex) =>
                  contentIndex + 1 === daysSchedule[ind].contentURL.length ? (
                    <>
                      <br />
                      <label>Useful Links: </label>
                      <input
                        autoFocus
                        value={daysSchedule[ind].contentURL[contentIndex]}
                        type="text"
                        onChange={event =>
                          addContentURLField(
                            ind,
                            contentIndex,
                            event.target.value
                          )
                        }
                      />
                      <button
                        onClick={e => {
                          e.preventDefault();
                          addURL(ind);
                        }}
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <>
                      <br />
                      <label>Useful Links: </label>
                      <input
                        value={daysSchedule[ind].contentURL[contentIndex]}
                        type="text"
                        onChange={event =>
                          addContentURLField(
                            ind,
                            contentIndex,
                            event.target.value
                          )
                        }
                      />
                    </>
                  )
                )
              ) : (
                <>
                  <br />
                  <label>Useful Links: </label>
                  <input
                    value={daysSchedule[ind].contentURL[0]}
                    type="text"
                    onChange={event =>
                      addContentURLField(ind, 0, event.target.value)
                    }
                  />
                  <button
                    onClick={e => {
                      e.preventDefault();
                      addURL(ind);
                    }}
                  >
                    +
                  </button>
                </>
              )}
              <br />
            </>
          );
        })}

        <br />
        <>
          <button
            onClick={e => {
              e.preventDefault();
              setDaysSchedule([
                ...daysSchedule.slice(),
                {
                  sessionTimes: "09.00 - 10.00",
                  contentTitle: "",
                  contentURL: []
                }
              ]);
            }}
          >
            add row
          </button>
          <button onClick={event => formHandler(event)}>Submit</button>
        </>
      </fieldset>
    </form>
  );
};

export default AdminUploadSchedulePage;
