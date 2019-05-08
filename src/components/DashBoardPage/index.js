import React, { Component } from "react";
import Banner from "../Banner";
import NavBar from "../NavBar";
import DashBoardSchedule from "../DashboardSchedule";
// import DashboardCarousel from "../DashboardCarousel";

import css from "./DashboardPage.module.css";
class DashBoardPage extends Component {
  render() {
    return (
      <div className={css.dashboardContainer}>
        <Banner />
        <NavBar />
        <DashBoardSchedule />
        {/* <DashboardCarousel /> */}
      </div>
    );
  }
}
export default DashBoardPage;
