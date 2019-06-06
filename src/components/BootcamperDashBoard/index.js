import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import DashBoardSchedule from "../DashboardSchedule";
import DashboardTopicsCarousel from "../DashboardTopicsCarousel";
import TopicsTray from "../TopicsTray";
import css from "../BootcamperDashBoard/BootcamperDashboard.module.css";
import BootcamperSchedule from "../BootcamperSchedule";

class BootcamperDashBoard extends Component {
  render() {
    return (
      <div className={css.dashBoardContainer}>
        <DashboardBanner title={"Welcome Bootcamper!"} />
        <BootcamperSchedule />
      </div>
    );
  }
}
export default BootcamperDashBoard;
