import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainContainer from "../MainContainer";
import SchedulePage from "../SchedulePage";
import Links from "../Links";

function Routes() {
  return (
    <div>
      <Router>
        <>
          <Route exact path="/" component={MainContainer} />
          <Route path="/schedule" component={SchedulePage} />
          <Route path="/links" component={Links} />
        </>
      </Router>
    </div>
  );
}
export default Routes;
