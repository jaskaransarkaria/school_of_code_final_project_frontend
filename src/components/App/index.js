import React, { useState, useEffect } from "react";
import StudentPage from "../StudentPage/index";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Calendar from "react-calendar";
import moment from "moment";
import AdminUploadSchedulePage from "../AdminUploadSchedulePage";
import FeedbackTray from "../FeedbackTray";

const allContent = [
  {
    date: "30/04/2019",
    daysContent: [
      {
        sessionTimes: "09.00 - 10.00",
        contentTitle: "Code Wars",
        contentURL: ""
      },
      {
        sessionTimes: "10.00 - 11.00",
        contentTitle: "JavaScript Fat Arrows",
        contentURL: ""
      },
      {
        sessionTimes: "13.00 - 14.00",
        contentTitle: "JavaScript async await",
        contentURL: ""
      },
      {
        sessionTimes: "15.00 - 16.00",
        contentTitle: "React functional Components",
        contentURL: "https://reactjs.org/docs/components-and-props.html"
      }
    ]
  },
  {
    date: "29/04/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: ""
      }
    ]
  },
  {
    date: "28/04/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: ""
      }
    ]
  },
  {
    date: "01/05/2019",
    daysContent: [
      {
        sessionTimes: "09.00 - 10.00",
        contentTitle: "Code Wars",
        contentURL: ""
      },
      {
        sessionTimes: "10.00 - 11.00",
        contentTitle: "JavaScript Fat Arrows",
        contentURL: ""
      },
      {
        sessionTimes: "13.00 - 14.00",
        contentTitle: "JavaScript async await",
        contentURL: ""
      },
      {
        sessionTimes: "15.00 - 16.00",
        contentTitle: "React functional Components",
        contentURL: "https://reactjs.org/docs/components-and-props.html"
      }
    ]
  },
  {
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
  },
  {
    date: "02/05/2019",
    daysContent: [
      {
        sessionTimes: "09.00 - 10.00",
        contentTitle: "Code Wars",
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
  },
  {
    date: "27/4/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: ""
      }
    ]
  },
  {
    date: "26/04/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: ""
      }
    ]
  }
];

firebase.initializeApp({
  apiKey: "AIzaSyBEjVPCQzoKZxg-YCv3Pno_X4Ek1MtOqQw",
  authDomain: "what-did-i-miss-88f32.firebaseapp.com"
});
function App() {
  const todaysDate = moment().format("DD/MM/YYYY");
  const [fullScheduleData, setFullScheduleData] = useState(allContent);
  const [signedIn, setSignedIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todaysDate);

  const appendAdminUpload = (date, dataToAppend) => {
    const duplicateDate = fullScheduleData.findIndex(
      item => item.date === date
    );

    duplicateDate < 0
      ? setFullScheduleData([
          ...fullScheduleData.slice(),
          { date: date, daysContent: dataToAppend.slice() }
        ])
      : setFullScheduleData([
          ...fullScheduleData.slice(0, duplicateDate),
          { date: date, daysContent: dataToAppend.slice() },
          ...fullScheduleData.slice(duplicateDate + 1)
        ]);
  };

  const convertDate = isoDate => {
    const convertedDate = moment(isoDate).format("DD/MM/YYYY");
    setSelectedDate(convertedDate);
  };

  // function to find the selected date from allContent
  const contentToBeDisplayed = fullScheduleData.find(
    obj => obj.date === selectedDate
  );

  // buttons to toggle date
  const changeDate = num => {
    // returns a moment.js object
    const newDate = moment(selectedDate, "DD/MM/YYYY").add(num, "days");
    return setSelectedDate(moment(newDate._d).format("DD/MM/YYYY"));
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setSignedIn(!!user); // not not meaning if the user is an object it will revert to true and if it isn't an object it will revert to false
      console.log("user", user);
      console.log("uid", user.uid);
    });
  }, []);

  return (
    <>
      {console.log("on reload", fullScheduleData)}
      {!signedIn ? (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <div className="App">
          <h1>
            Welcome, {firebase.auth().currentUser.displayName}
            <img
              alt="profile pic"
              src={firebase.auth().currentUser.photoURL}
              style={{ width: "5vh", height: "5vh", borderRadius: "100%" }}
            />
          </h1>
          <Calendar
            onClickDay={value => {
              convertDate(value);
            }}
          />
          <button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Sign Out
          </button>
          Schedule
          <button onClick={() => changeDate(-1)}>&lt;</button>
          <button onClick={() => changeDate(1)}>&gt;</button>
          <AdminUploadSchedulePage
            props={(date, dataToAppend) =>
              appendAdminUpload(date, dataToAppend)
            }
          />
          <StudentPage props={contentToBeDisplayed} />
          <FeedbackTray />
        </div>
      )}
    </>
  );
}

export default App;
