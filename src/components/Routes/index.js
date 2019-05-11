import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContainer from "../MainContainer";
import BootcamperApplcationPage from "../BootcamperApplicationPage";
import ScheduleUploadPage from "../ScheduleUploadPage";
import SchedulePage from "../SchedulePage";
import TopicsPage from "../TopicsPage";
import InfoPage from "../InfoPage";
import AdminApplicationPage from "../AdminApplicationPage";

function Routes() {
  return (
    <div>
      <Router>
        <>
          <Route exact path="/" component={MainContainer} />
          <Route path="/application" component={BootcamperApplcationPage} />
          <Route path="/scheduleUploads" component={ScheduleUploadPage} />
          <Route path="/schedule" component={SchedulePage} />
          <Route path="/topics" component={TopicsPage} />
          <Route path="/information" component={InfoPage} />
          <Route path="/adminApplication" component={AdminApplicationPage} />
        </>
      </Router>
    </div>
  );
}
export default Routes;
