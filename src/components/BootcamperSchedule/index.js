import React, { useState, useEffect } from "react";
import moment from "moment";
import { api } from "../../config";
import css from "./BootcamperSchedule.module.css";
import ArrowImage from "../../Images/arrow.png";
import SlackDrawer from "../SlackDrawer";

// get last 5 days schedule || most recent schedule and the 5 days previous
// display Day name at the top..
// display daysContent in the Carousel => lesson num, title
// on click show content and resources && a back button to go back to the schedule view

const defaultDateData = {
  daysContent: [
    {
      sessionTimes: "No Upload reources for this date",
      contentTitle: "",
      learningObjectives: "Please check back later"
    }
  ]
};

const BootcamperSchedule = () => {
  const todaysDate = moment().format("DD/MM/YYYY");
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  // const [fullScheduleData, setFullScheduleData] = useContext(Store);
  const [scheduleData, setScheduleData] = useState([]);
  const [sessionIndex, setSessionIndex] = useState(0);
  const [dateToShow, setDateToShow] = useState([]);
  const [dateInBar, setDateInBar] = useState(0);
  const [lessonInfo, setLessonInfo] = useState(
    "Click a lesson to view resources"
  );
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function fetchSchedule() {
      console.log(`${api.schedule}/${selectedDate}`);
      const response = await fetch(`${api.schedule}/${selectedDate}`);
      const data = await response.json();
      console.log("scheduleData get request", data);
      console.log(data.result);
      // add error handling for if it isn't found
      if (data.result === null) {
        setDateToShow([
          {
            date: selectedDate,
            daysContent: defaultDateData.daysContent
          }
        ]);
        // need to set a default here
        //setScheduleData(initialState);
      } else {
        // if there is a date then set it here
        //setScheduleData([data.result]);
        setDateToShow([data.result]);
      }
    }
    fetchSchedule();
  }, [selectedDate]);

  useEffect(() => {
    async function fetchMostRecentSchedule() {
      const response = await fetch(`${api.schedule}/most-recent`);
      const data = await response.json();
      if (data.result === null) {
        return;
      } else {
        console.log("fetch most recent", data);
        console.log("fetch most recent", data.result);
        await setScheduleData([...scheduleData, ...data.result]);
        await setDateToShow([...data.result]);
      }
    }
    fetchMostRecentSchedule();

    return fetchMostRecentSchedule;
  }, []);
  const controlCarousel = num => {
    if (
      sessionIndex + num < 0 ||
      sessionIndex + 3 + num > dateToShow[0].daysContent.length
    ) {
      return;
    } else {
      setSessionIndex(sessionIndex + num);
    }
  };

  const FormatedDate = ({ date, num }) => {
    let highlightDay = {};
    if (
      selectedDate ===
        moment(moment(date, "DD/MM/YYYY").add(num, "days")._d).format(
          "DD/MM/YYYY"
        ) ||
      dateToShow[0].date ===
        moment(moment(date, "DD/MM/YYYY").add(num, "days")._d).format(
          "DD/MM/YYYY"
        )
    ) {
      highlightDay = { backgroundColor: "#11cf84" };
    }
    return (
      <div
        className={css.dayBox}
        style={highlightDay}
        onClick={() => {
          setSelectedDate(
            moment(moment(date, "DD/MM/YYYY").add(num, "days")._d).format(
              "DD/MM/YYYY"
            )
          );
        }}
      >
        {moment(moment(date, "DD/MM/YYYY").add(num, "days")._d).format(
          "ddd Do MMM"
        )}
      </div>
    );
  };

  return (
    <>
      <div className={css.dashboardScheduleContainer}>
        {scheduleData.map(day => (
          // here we display the 5 days
          <div className={css.daysOfWeekContainer}>
            <button
              className={css.dateButton}
              onClick={() => setDateInBar(dateInBar - 1)}
            >
              &#60;
            </button>
            <FormatedDate
              className={css.dayBox}
              date={day.date}
              num={dateInBar - 4}
            />
            <FormatedDate
              className={css.dayBox}
              date={day.date}
              num={dateInBar - 3}
            />
            <FormatedDate
              className={css.dayBox}
              date={day.date}
              num={dateInBar - 2}
            />
            <FormatedDate
              className={css.dayBox}
              date={day.date}
              num={dateInBar - 1}
            />

            <FormatedDate
              className={css.dayBox}
              date={day.date}
              num={dateInBar}
            />
            {dateInBar < 0 && (
              <button
                className={css.dateButton}
                onClick={() => setDateInBar(dateInBar + 1)}
              >
                &#62;
              </button>
            )}
          </div>
        ))}
        <SlackDrawer />
        <br />
        <div className={css.carouselContainer}>
          <img
            src={ArrowImage}
            alt="left arrow"
            className={css.leftArrow}
            onClick={() => controlCarousel(-1)}
          />
          {dateToShow.map(day =>
            day.daysContent

              .map((session, idx) => {
                console.log("SESH", session);
                return (
                  <div
                    className={css.itemContainer}
                    onClick={() => {
                      setLessonInfo(session.learningObjectives);
                      session.contentURL && setLinks([...session.contentURL]);
                    }}
                  >
                    <b>{`Lesson ${idx + 1}`}</b>
                    <p>{session.contentTitle}</p>
                  </div>
                );
              })
              .slice(sessionIndex, sessionIndex + 3)
          )}

          <img
            src={ArrowImage}
            alt="right arrow"
            className={css.rightArrow}
            onClick={() => controlCarousel(1)}
          />
        </div>
        <div className={css.lessonInfoContainer}>
          <div className={css.lessonInfoBox}>
            <div className={css.lessonTitle}>
              <p>Lesson Information</p>
            </div>
            <div className={css.lessonDetails}>
              <br />
              <h2 style={{ color: "black" }}>{selectedDate}</h2>
              <p>{lessonInfo}</p>
              <ul>
                {links.map(link => (
                  <li>
                    <a href={`http://${link}`} target="_blank">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BootcamperSchedule;
