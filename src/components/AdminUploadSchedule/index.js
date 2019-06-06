import React, { useState, useContext } from "react";
import AdminScheduleTimes from "../AdminScheduleTimes";
import DashboardBanner from "../DashboardBanner";
import css from "../AdminUploadSchedule/AdminUploadSchedule.module.css";
import moment from "moment";
import { api } from "../../config";
import { Store } from "../App";

//form handler is going to do the POST
// atm form handler is running a function that changes data at the APP level
// changing state at the app level is redundant once there is a data base.

const AdminUploadSchedule = props => {
  const [fullScheduleData, setFullScheduleData] = useContext(Store);
  const handleUpload = document.getElementById("fileUpload");
  // ability to upload schedule
  // pass down a function that adds the days schedule up to the state in the app
  // multiple content Urls
  // date setter (more intuitive and force date to be a certain format) use a calender/ date picker probs
  // description <text area ></text> add description mechanism

  // auto select next time slot
  // then clear/ reset the schedule
  // a way to upload video
  // a way to upload files
  // progress bar to whilst uploading

  // send all the info up to the App (useContext())?
  // review schedule before upload?

  const goToHome = () => {
    props.history.push(`/admin-dashboard`);
  };

  const [daysSchedule, setDaysSchedule] = useState([
    {
      sessionTimes: "09.00 - 10.00",
      contentTitle: "",
      contentURL: [],
      learningObjectives: ""
    }
  ]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD/MM/YYYY")
  );

  const formHandler = event => {
    event.preventDefault();

    console.log("files to be uploaded", handleUpload.files);
    //const formData = new FormData();
    //handleUpload.files.map(item => formData.append("fileUpload", item));
    // do something with the appended files

    const duplicateDate = fullScheduleData.findIndex(
      item => item.date === selectedDate
    );

    setFullScheduleData([
      ...fullScheduleData.slice(0, duplicateDate),
      {
        date: selectedDate,
        daysContent: daysSchedule.slice()
      },
      ...fullScheduleData.slice(duplicateDate + 1)
    ]);

    fetch(`${api.schedule}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        date: selectedDate,
        daysContent: daysSchedule.slice()
      })
    }).then(res => res.json());
    console.log("sending", {
      date: selectedDate,
      daysContent: daysSchedule.slice()
    });
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
    <>
      <DashboardBanner title={"Resource Uploads"} />
      <div className={css.formContainer}>
        <form>
          <fieldset>
            <legend>Session Information:</legend>
            <div>
              Date:{" "}
              <input
                style={{ width: "100%", height: "30px" }}
                aria-label="Session date"
                id="sessionDate"
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
                  <AdminScheduleTimes
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
                        {
                          ...daysSchedule[ind],
                          contentTitle: event.target.value
                        },
                        ...daysSchedule.slice(ind + 1)
                      ])
                    }
                  />
                  <br />
                  <br />
                  <>
                    Learning Objectives: <br />
                    <textarea
                      style={{ width: "100%", height: "60px" }}
                      name="Learning Objectives"
                      placeholder="Learning Objectives"
                      onChange={event =>
                        setDaysSchedule([
                          ...daysSchedule.slice(0, ind),
                          {
                            ...daysSchedule[ind],
                            learningObjectives: event.target.value
                          },
                          ...daysSchedule.slice(ind + 1)
                        ])
                      }
                    />
                  </>
                  <br />
                  <br />
                  <input type="file" id="fileUpload" multiple />
                  <br />
                  {daysSchedule[ind].contentURL.length > 0 ? (
                    daysSchedule[ind].contentURL.map((_, contentIndex) =>
                      contentIndex + 1 ===
                      daysSchedule[ind].contentURL.length ? (
                        <>
                          <br />
                          <label htmlFor="contentUrlInput">Useful Links:</label>
                          <input
                            id="contentUrlInput"
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
        <div onClick={goToHome} className={css.adminDashboardHome}>
          <button> Admin Home</button>
        </div>
      </div>
    </>
  );
};

export default AdminUploadSchedule;
