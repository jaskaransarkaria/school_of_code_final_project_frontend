import React, { useState, useEffect } from "react";
import css from "./Schedule.module.css";
import { Timeline, TimelineEvent } from "react-event-timeline";
import moment from "moment";
//import PropTypes from "prop-types";
import Calendar from "react-calendar";

import { api } from "../../config";
//import { Store } from "../App";

import { Store } from "../App";
import NavBar from "../NavBar";
import SubBanner from "../SubBanner";

let initialState = {
  defaultUsed: `There is currently no schedule uploaded for today.`,
  date: "02/05/2019",
  daysContent: [
    {
      sessionTimes: "09.00 - 10.00",
      learningObjectives: "freak on dates",
      contentTitle: "Sort out the Freaking dates",
      contentURL: ""
    },
    {
      sessionTimes: "13.00 - 14.00",
      learningObjectives: "learn hooks",

      contentTitle: "React Hooks",
      contentURL: ""
    },
    {
      sessionTimes: "15.00 - 16.00",
      contentTitle: "React useContext()",
      learningObjectives: "understand context",

      contentURL: "https://reactjs.org/docs/components-and-props.html"
    }
  ]
};

const Schedule = ({ props }) => {
  const todaysDate = moment().format("DD/MM/YYYY");
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  // const [fullScheduleData, setFullScheduleData] = useContext(Store);
  const [scheduleData, setScheduleData] = useState(initialState);

  const convertDate = isoDate => {
    const convertedDate = moment(isoDate).format("DD/MM/YYYY");
    setSelectedDate(convertedDate);
  };

  useEffect(() => {
    async function fetchMostRecentSchedule() {
      const response = await fetch(`${api.schedule}/most-recent`);
      const data = await response.json();
      console.log("most recent get request", data);
      if (data.result === null) {
        return;
      } else {
        // not sure why it is coming in as an array here?
        data.result[0][
          "defaultUsed"
        ] = `There is currently no schedule uploaded for today.`;

        initialState = {
          ...data.result[0]
        };
        console.log("initialState", initialState);
      }
    }
    fetchMostRecentSchedule();
    return fetchMostRecentSchedule;
  }, []);

  useEffect(() => {
    async function fetchSchedule() {
      console.log(`${api.schedule}/${selectedDate}`);
      const response = await fetch(`${api.schedule}/${selectedDate}`);
      const data = await response.json();
      console.log("scheduleData get request", data);
      console.log(data.result);
      // add error handling for if it isn't found
      if (data.result === null) {
        setScheduleData(initialState);
      } else {
        setScheduleData(data.result);
      }
    }
    fetchSchedule();

    return fetchSchedule;
  }, [selectedDate]);

  // console.log("contentToBeDisplayed outside get request", contentToBeDisplayed);
  // function to find the selected date from allContent
  // this is where to do the get request meaning useContext is not needed any more
  // contentToBeDisplayed =
  //   // fullScheduleData.find(
  //   //   obj => obj.date === selectedDate // this usescontext

  //   async () => {
  //     console.log("content to be displayed firing?");
  //     const response = await fetch(`${api.schedule}/${selectedDate}`);
  //     const data = await response.json();
  //     console.log("contentToBeDisplayed get request", data);
  //     return data;
  //   };
  // let contentToBeDisplayed;
  // if (!contentToBeDisplayed) {
  //   // set the default date to the most recent upload
  //   contentToBeDisplayed = {
  //     defaultUsed: `There is currently no schedule uploaded for today.`,
  //     date: "02/05/2019",
  //     daysContent: [
  //       {
  //         sessionTimes: "09.00 - 10.00",
  //         learningObjectives: "freak on dates",
  //         contentTitle: "Sort out the Freaking dates",
  //         contentURL: ""
  //       },
  //       {
  //         sessionTimes: "13.00 - 14.00",
  //         learningObjectives: "learn hooks",

  //         contentTitle: "React Hooks",
  //         contentURL: ""
  //       },
  //       {
  //         sessionTimes: "15.00 - 16.00",
  //         contentTitle: "React useContext()",
  //         learningObjectives: "understand context",

  //         contentURL: "https://reactjs.org/docs/components-and-props.html"
  //       }
  //     ]
  //   };
  // }

  const changeDate = num => {
    // returns a moment.js object
    const newDate = moment(selectedDate, "DD/MM/YYYY").add(num, "days");
    return setSelectedDate(moment(newDate._d).format("DD/MM/YYYY"));
  };

  return (
    <>
      <div className={css.schedulePageContainer}>
        <SubBanner />
        <NavBar propsUser="Bootcamper" />
        <Calendar
          onClickDay={value => {
            convertDate(value);
          }}
        />
        <button onClick={() => changeDate(-1)}>&lt;</button>
        Schedule
        <button onClick={() => changeDate(1)}>&gt;</button>
        <br />
        {(
          <>
            {scheduleData.defaultUsed}
            <br />
            Showing: {scheduleData.date}
          </>
        ) || <>{scheduleData.date}</>}
        <div className={css.timelineContainer}>
          <Timeline>
            {scheduleData.daysContent.map(item => (
              <TimelineEvent title={item.sessionTimes}>
                {item.contentURL !== "" ? (
                  <div>
                    {item.contentTitle}
                    <br />
                    <a href={`https://${item.contentURL}`} target="_blank">
                      {item.contentURL}
                    </a>
                  </div>
                ) : (
                  <div>{item.contentTitle}</div>
                )}
              </TimelineEvent>
            ))}
          </Timeline>
        </div>
        <Timeline>
          {scheduleData.daysContent.map(item => (
            <TimelineEvent title={item.sessionTimes}>
              {item.contentURL !== "" ? (
                <div>
                  {item.contentTitle}
                  <p>{item.learningObjectives}</p>
                  <br />
                  <a href={`https://${item.contentURL}`} target="_blank">
                    {item.contentURL}
                  </a>
                </div>
              ) : (
                <>
                  <div>{item.contentTitle}</div>
                  <p>{item.learningObjectives}</p>
                </>
              )}
            </TimelineEvent>
          ))}
        </Timeline>
      </div>
    </>
  );
};

export default Schedule;

// SchedulePage.propTypes = {
//   date: PropTypes.string,
//   daysContent: PropTypes.array
// };

// SchedulePage.defaultProps = {
//   props: {
//     defaultUsed: `There is currently no schedule uploaded for today.`,
//     // use last updated key
//     // get the timestamp from mongoDB (if this doesn't show the correct date add a last Updated key)
//     //ObjectId("507c7f79bcf86cd7994f6c0e").getTimestamp()
//     // returns ISODate("2012-10-15T21:26:17Z")
//     // use moment().format("L") to format it into the correct time
//     date: "02/05/2019",
//     daysContent: [
//       {
//         sessionTimes: "09.00 - 10.00",
//         contentTitle: "Sort out the Freaking dates",
//         contentURL: ""
//       },
//       {
//         sessionTimes: "13.00 - 14.00",
//         contentTitle: "React Hooks",
//         contentURL: ""
//       },
//       {
//         sessionTimes: "15.00 - 16.00",
//         contentTitle: "React useContext()",
//         contentURL: "https://reactjs.org/docs/components-and-props.html"
//       }
//     ]
//   }
// };
