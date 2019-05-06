import React from "react";
//import css from "./index.module.css";
import { Timeline, TimelineEvent } from "react-event-timeline";
import moment from "moment";

import PropTypes from "prop-types";

const StudentPage = ({ props }) => {
  // display the schedule
  console.log("studentPage props", props.date);
  console.log("studentPage props", props.daysContent);
  return (
    <>
      <div>
        {props.defaultUsed ? (
          <>
            <p>{props.defaultUsed}</p>
            <p>Showing schedule for: {props.date}</p>
          </>
        ) : (
          `${props.date}`
        )}
      </div>
      <Timeline>
        {props.daysContent.map(item => (
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

StudentPage.propTypes = {
  date: PropTypes.string,
  daysContent: PropTypes.array
};

StudentPage.defaultProps = {
  props: {
    defaultUsed: `There is currently no schedule uploaded for today.`,
    // use last updated key
    // get the timestamp from mongoDB (if this doesn't show the correct date add a last Updated key)
    //ObjectId("507c7f79bcf86cd7994f6c0e").getTimestamp()
    // returns ISODate("2012-10-15T21:26:17Z")
    // use moment().format("L") to format it into the correct time
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
  }
};

export default StudentPage;
