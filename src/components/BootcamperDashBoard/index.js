import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBar from "../NavBar";
import DashBoardSchedule from "../DashboardSchedule";
import DashboardTopicsCarousel from "../DashboardTopicsCarousel";
import css from "../BootcamperDashBoard/BootcamperDashboard.module.css";

class BootcamperDashBoard extends Component {
  render() {
    return (
      <div className={css.dashBoardContainer}>
        <NavBar propsUser="Bootcamper" />
        <DashboardBanner />
        <DashBoardSchedule />
        <DashboardTopicsCarousel />
      </div>
    );
  }
}
export default BootcamperDashBoard;
