import React, { useState, useContext } from "react";
//import css from "./index.module.css";
import { Timeline, TimelineEvent } from "react-event-timeline";
import moment from "moment";
//import PropTypes from "prop-types";
import Calendar from "react-calendar";
import { Store } from "../App";

const SchedulePage = ({ props }) => {
  const todaysDate = moment().format("DD/MM/YYYY");
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [fullScheduleData, setFullScheduleData] = useContext(Store);

  const convertDate = isoDate => {
    const convertedDate = moment(isoDate).format("DD/MM/YYYY");
    setSelectedDate(convertedDate);
  };

  // function to find the selected date from allContent
  let contentToBeDisplayed = fullScheduleData.find(
    obj => obj.date === selectedDate
  );

  if (!contentToBeDisplayed) {
    // set the default date to the most recent upload
    contentToBeDisplayed = {
      defaultUsed: `There is currently no schedule uploaded for today.`,
      date: "02/05/2019",
      daysContent: [
        {
          sessionTimes: "09.00 - 10.00",
          contentTitle: "Sort out the Freaking dates",
          contentURL: ""
        },
        {
          sessionTimes: "13.00 - 14.00",
          contentTitle: "React Hooks",
          contentURL: ""
        },
        {
          sessionTimes: "15.00 - 16.00",
          contentTitle: "React useContext()",
          contentURL: "https://reactjs.org/docs/components-and-props.html"
        }
      ]
    };
  }

  const changeDate = num => {
    // returns a moment.js object
    const newDate = moment(selectedDate, "DD/MM/YYYY").add(num, "days");
    return setSelectedDate(moment(newDate._d).format("DD/MM/YYYY"));
  };

  return (
    <>
      <div>
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
            {contentToBeDisplayed.defaultUsed}
            <br />
            Showing: {contentToBeDisplayed.date}
          </>
        ) || <>{contentToBeDisplayed.date}</>}
      </div>
      <Timeline>
        {contentToBeDisplayed.daysContent.map(item => (
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
    </>
  );
};

export default SchedulePage;

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
