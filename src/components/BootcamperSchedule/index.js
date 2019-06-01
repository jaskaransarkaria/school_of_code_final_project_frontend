import React, { useState, useEffect } from "react";
import moment from "moment";
import { api } from "../../config";

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

  const convertDate = isoDate => {
    const convertedDate = moment(isoDate).format("DD/MM/YYYY");
    setSelectedDate(convertedDate);
  };

  const changeDate = num => {
    // returns a moment.js object
    const newDate = moment(selectedDate, "DD/MM/YYYY").add(num, "days");
    return setSelectedDate(moment(newDate._d).format("DD/MM/YYYY"));
  };

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
    // find out the daysContent length (how far can the carousel go up before not working)
    const carouselData = scheduleData.find(day => day.date === selectedDate);

    if (
      sessionIndex + num < 0 &&
      sessionIndex + 3 + num >= carouselData.daysContent.length
    ) {
      return;
    } else {
      setSessionIndex(sessionIndex + num);
    }
  };

  const onDateSelect = date =>
    setDateToShow([...scheduleData.find(day => day.date === date)]);

  return (
    <>
      {console.log("From BOOTCAMPER SChedule", scheduleData)}
      {console.log("selected date", selectedDate)}
      {console.log("dateToShow", dateToShow)}
      {scheduleData.map(day => (
        // here we display the 5 days
        // logic to display the "selectedDate"
        <>
          <button
            onClick={() => {
              setSelectedDate(
                moment(day.date, "DD/MM/YYYY").format("DD/MM/YYYY")
              );
            }}
          >
            {moment(day.date, "DD/MM/YYYY").format("ddd Do MMM")}
          </button>
          <button
            onClick={() => {
              setSelectedDate(
                moment(
                  moment(day.date, "DD/MM/YYYY").add(-1, "days")._d
                ).format("DD/MM/YYYY")
              );
            }}
          >
            {moment(moment(day.date, "DD/MM/YYYY").add(-1, "days")._d).format(
              "ddd Do MMM"
            )}
          </button>
          <button
            onClick={() => {
              setSelectedDate(
                moment(
                  moment(day.date, "DD/MM/YYYY").add(-2, "days")._d
                ).format("DD/MM/YYYY")
              );
            }}
          >
            {moment(moment(day.date, "DD/MM/YYYY").add(-2, "days")._d).format(
              "ddd Do MMM"
            )}
          </button>
          <button
            onClick={() => {
              setSelectedDate(
                moment(
                  moment(day.date, "DD/MM/YYYY").add(-3, "days")._d
                ).format("DD/MM/YYYY")
              );
            }}
          >
            {moment(moment(day.date, "DD/MM/YYYY").add(-3, "days")._d).format(
              "ddd Do MMM"
            )}
          </button>
          <button
            onClick={() => {
              setSelectedDate(
                moment(
                  moment(day.date, "DD/MM/YYYY").add(-4, "days")._d
                ).format("DD/MM/YYYY")
              );
            }}
          >
            {moment(moment(day.date, "DD/MM/YYYY").add(-4, "days")._d).format(
              "ddd Do MMM"
            )}
          </button>
        </>
      ))}
      <br />
      <span>
        <button onClick={() => controlCarousel(1)}>&lt;</button>
        {dateToShow.map(day =>
          day.daysContent.map((session, idx) => (
            <>
              <p>{session.sessionTimes}</p>
              <p>{`Lesson ${idx + 1}`}</p>
              <p>{session.learningObjectives}</p>
            </>
          ))
        )}
        <button onClick={() => controlCarousel(-1)}>&gt;</button>
      </span>
    </>
  );
};

export default BootcamperSchedule;
