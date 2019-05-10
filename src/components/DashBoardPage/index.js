import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBar from "../NavBar";
import DashBoardSchedule from "../DashboardSchedule";

import css from "./DashboardPage.module.css";
class DashBoardPage extends Component {
  render() {
    return (
      <div className={css.background}>
        <div className={css.dashboardContainer}>
          <DashboardBanner />
          <NavBar />
          <DashBoardSchedule />
        </div>
      </div>
    );
  }
}
export default DashBoardPage;
