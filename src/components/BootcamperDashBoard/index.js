import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBarBootcampers from "../NavBarBootcampers";
import DashBoardSchedule from "../DashboardSchedule";
import css from "../BootcamperDashBoard/BootcamperDashboard.module.css";

class BootcamperDashBoard extends Component {
  render() {
    return (
      <div className={css.dashBoardContainer}>
        <DashboardBanner />
        <DashBoardSchedule />
      </div>
    );
  }
}
export default BootcamperDashBoard;
