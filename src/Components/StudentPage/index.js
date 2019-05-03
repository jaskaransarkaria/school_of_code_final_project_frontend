import React from "react";
//import css from "./index.module.css";
import { Timeline, TimelineEvent } from "react-event-timeline";

import PropTypes from "prop-types";

const StudentPage = ({ props }) => {
  // display the schedule
  // dynamically add the relevant timings and number of points
  // problem if the current date has no added content.
  console.log("studentPage props", props.date);
  console.log("studentPage props", props.daysContent);
  return (
    <>
      <div>
        {props.defaultUsed
          ? `${props.defaultUsed} ${props.date}`
          : `${props.date}`}
      </div>
      <Timeline>
        {props.daysContent.map(item => (
          <TimelineEvent title={item.sessionTimes}>
            {item.contentURL !== "" ? (
              <div>
                {item.contentTitle}
                <br />
                <a href={item.contentURL}>{item.contentURL}</a>
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
    defaultUsed: "There is currently no schedule uploaded for this day.",
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
