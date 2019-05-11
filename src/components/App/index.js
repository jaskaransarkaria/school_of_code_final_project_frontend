import React, { useState, createContext } from "react";
import ApplicantDashboardPage from "../../pages/ApplicantDashboardPage";
import AdminUploadSchedulePage from "../../pages/AdminUploadSchedulePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import SchedulePage from "../../pages/SchedulePage";
import TopicsPage from "../../pages/TopicsPage";
import CreditsPage from "../../pages/CreditsPage";
import AdminDashboardPage from "../../pages/AdminDashboardPage";
import BootcamperDashboardPage from "../../pages/BootcamperDashboardPage";
import AdminApplicationProcessingPage from "../../pages/AdminApplicationProcessingPage";

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

function App() {
  const [fullScheduleData, setFullScheduleData] = useState(allContent);

  return (
    <Store.Provider value={[fullScheduleData, setFullScheduleData]}>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route
          path="/application-dashboard"
          component={ApplicantDashboardPage}
        />
        <Route
          path="/bootcamper-dashboard"
          component={BootcamperDashboardPage}
        />
        <Route path="/admin-dashboard" component={AdminDashboardPage} />
        <Route path="/upload-schedule" component={AdminUploadSchedulePage} />
        <Route path="/schedule" component={SchedulePage} />
        <Route path="/topics" component={TopicsPage} />
        <Route path="/credits" component={CreditsPage} />
        <Route
          path="/admin-application-processing"
          component={AdminApplicationProcessingPage}
        />
      </Router>
    </Store.Provider>
  );
}

export default App;
