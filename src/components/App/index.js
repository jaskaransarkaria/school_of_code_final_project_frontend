import React, { useState, useEffect, createContext } from "react";
import SchedulePage from "../SchedulePage";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AdminUploadSchedulePage from "../AdminUploadSchedulePage";
import FeedbackTray from "../FeedbackTray";
import Welcome from "../Welcome";
import VideoUpload from "../VideoUpload";
import { api } from "../../config";

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

console.log(api.firebase_auth_domain);
console.log(api.firebase_key);

firebase.initializeApp({
  apiKey: api.firebase_key,
  authDomain: api.firebase_auth_domain
});
function App() {
  const [fullScheduleData, setFullScheduleData] = useState(allContent);
  const [signedIn, setSignedIn] = useState(false);

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
    <Store.Provider value={[fullScheduleData, setFullScheduleData]}>
      {console.log("reloaaad", fullScheduleData)}
      {!signedIn ? (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <div className="App">
          <Welcome
            fullName={firebase.auth().currentUser.displayName}
            photo={firebase.auth().currentUser.photoURL}
          />
          <button
            onClick={() => {
              firebase.auth().signOut();
            }}
          >
            Sign Out
          </button>

          <AdminUploadSchedulePage />
          <SchedulePage />
          <FeedbackTray />
          <VideoUpload />
        </div>
      )}
    </Store.Provider>
  );
}

export default App;
