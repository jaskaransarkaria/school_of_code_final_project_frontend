import React, { useState, createContext, useEffect } from "react";
import ApplicantDashboardPage from "../ApplicantDashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import SchedulePage from "../../pages/SchedulePage";
import TopicsPage from "../../pages/TopicsPage";
import CreditsPage from "../../pages/CreditsPage";
import AdminDashboardPage from "../../pages/AdminDashboardPage";
import BootcamperDashboardPage from "../../pages/BootcamperDashboardPage";
import AdminApplicationProcessingPage from "../../pages/AdminApplicationProcessingPage";
import { api } from "../../config";
import firebase from "firebase";
import ApplicantVideoPage from "../../pages/ApplicantVideoPage";
import ApplicantFormPage from "../../pages/ApplicantFormPage";
import ContractPage from "../../pages/ContractPage";
import ThankYouPage from "../../pages/ThankYouPage";
import FormRating from "../FormRating";
import VideoRating from "../VideoRating";
import AdminUploadSchedule from "../AdminUploadSchedule";

firebase.initializeApp({
  apiKey: api.firebase_key,
  authDomain: api.firebase_auth_domain
});
const allContent = [
  {
    date: "30/04/2019",
    daysContent: [
      {
        sessionTimes: "09.00 - 10.00",
        contentTitle: "Code Wars",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "10.00 - 11.00",
        contentTitle: "JavaScript Fat Arrows",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "13.00 - 14.00",
        contentTitle: "JavaScript async await",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "15.00 - 16.00",
        contentTitle: "React functional Components",
        contentURL: "https://reactjs.org/docs/components-and-props.html",
        learningObjectives: ""
      }
    ]
  },
  {
    date: "29/04/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: "",
        learningObjectives: ""
      }
    ]
  },
  {
    date: "28/04/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: "",
        learningObjectives: ""
      }
    ]
  },
  {
    date: "01/05/2019",
    daysContent: [
      {
        sessionTimes: "09.00 - 10.00",
        contentTitle: "Code Wars",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "10.00 - 11.00",
        contentTitle: "JavaScript Fat Arrows",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "13.00 - 14.00",
        contentTitle: "JavaScript async await",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "15.00 - 16.00",
        contentTitle: "React functional Components",
        contentURL: "https://reactjs.org/docs/components-and-props.html",
        learningObjectives: ""
      }
    ]
  },
  {
    date: "02/05/2019",
    daysContent: [
      {
        sessionTimes: "09.00 - 10.00",
        contentTitle: "Sort out the Freaking dates",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "13.00 - 14.00",
        contentTitle: "React Hooks",
        contentURL: ""
      },
      {
        sessionTimes: "15.00 - 16.00",
        contentTitle: "React useContext()",
        contentURL: "https://reactjs.org/docs/components-and-props.html",
        learningObjectives: ""
      }
    ]
  },
  {
    date: "02/05/2019",
    daysContent: [
      {
        sessionTimes: "09.00 - 10.00",
        contentTitle: "Code Wars",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "13.00 - 14.00",
        contentTitle: "React Hooks",
        contentURL: "",
        learningObjectives: ""
      },
      {
        sessionTimes: "15.00 - 16.00",
        contentTitle: "React useContext()",
        contentURL: "https://reactjs.org/docs/components-and-props.html",
        learningObjectives: ""
      }
    ]
  },
  {
    date: "27/4/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: "",
        learningObjectives: ""
      }
    ]
  },
  {
    date: "26/04/2019",
    daysContent: [
      {
        sessionTimes: "",
        contentTitle: "",
        contentURL: "",
        learningObjectives: ""
      }
    ]
  }
];
export const Store = createContext([allContent, () => {}]);
// export const UserUidContext = createContext(null);

function App() {
  const [fullScheduleData, setFullScheduleData] = useState(allContent);
  // const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // logic which dictates if they are already in the db or they need to register
      // if they need to register push them to the applicant dashboard page
      if (user === null) {
        return;
      } else {
        let newFirebaseUid = user.uid;
        async function isUserRegistered(user) {
          // setUserUid({ uid: user.uid, displayName: user.displayName });
          console.log("in async post", newFirebaseUid);
          const response = await fetch(`${api.users}`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              firebaseUid: newFirebaseUid
            })
          });
          const data = await response.json();
          console.log(data.result);
          if (data.result === null) {
            // send them to the register page
            // because the have shown that their uid doesn't exist in the database
          } else {
            // there uid does exist in the database
            // set user signed in to true
            // setSignedIn(
            //   !!user
            //   // not not meaning if the user is an object it will revert to true
            //   // and if it isn't an object it will revert to false
            // );
            console.log(user.uid);
            console.log("user exists in db");
          }
        }

        isUserRegistered(user);
      }
    });
  }, []);
  return (
    //<UserUidContext.Provider value={userUid}>
    <Store.Provider value={[fullScheduleData, setFullScheduleData]}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route
            exact
            path="/applicant-dashboard"
            component={ApplicantDashboardPage}
          />
          <Route
            exact
            path="/bootcamper-dashboard"
            component={BootcamperDashboardPage}
          />
          <Route
            path="/admin-dashboard/form-processing"
            component={FormRating}
          />
          <Route
            path="/admin-dashboard/video-processing"
            component={VideoRating}
          />
          <Route
            path="/admin-dashboard/upload-schedule"
            component={AdminUploadSchedule}
          />
          <Route path="/admin-dashboard" component={AdminDashboardPage} />
          <Route exact path="/schedule" component={SchedulePage} />
          <Route exact path="/topics" component={TopicsPage} />
          <Route exact path="/credits" component={CreditsPage} />
          <Route
            exact
            path="/admin-application-processing"
            component={AdminApplicationProcessingPage}
          />
          <Route
            exact
            path="/application-video"
            component={ApplicantVideoPage}
          />
          <Route exact path="/application-form" component={ApplicantFormPage} />
          <Route exact path="/thankyou" component={ThankYouPage} />
          <Route exact path="/contract" component={ContractPage} />
        </Switch>
      </Router>
    </Store.Provider>
    //</UserUidContext.Provider>
  );
}

export default App;
