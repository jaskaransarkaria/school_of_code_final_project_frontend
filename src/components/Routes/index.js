import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContainer from "../MainContainer";
import SchedulePage from "../SchedulePage";
import TopicsPage from "../TopicsPage";

function Routes() {
  return (
    <div>
      <Router>
        <>
          <Route exact path="/" component={MainContainer} />
          <Route path="/schedule" component={SchedulePage} />
          <Route path="/topics" component={TopicsPage} />
        </>
      </Router>
    </div>
  );
}
export default Routes;
