import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBar from "../NavBar";
import DashBoardSchedule from "../DashboardSchedule";
import DashboardTopicsCarousel from "../DashboardTopicsCarousel";
import TopicsTray from "../TopicsTray";
import css from "../BootcamperDashBoard/BootcamperDashboard.module.css";
import BootcamperSchedule from "../BootcamperSchedule";

class BootcamperDashBoard extends Component {
  render() {
    return (
      <div className={css.dashBoardContainer}>
        <NavBar propsUser="Bootcamper" />
        <DashboardBanner title={"Welcome Bootcamper!"} />
        <DashBoardSchedule />
        <BootcamperSchedule />
        {/* <DashboardTopicsCarousel /> */}
        <TopicsTray style={{ margin: "20%" }} />
      </div>
    );
  }
}
export default BootcamperDashBoard;
