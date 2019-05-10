import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBarBootcampers from "../NavBarBootcampers";
import DashBoardSchedule from "../DashboardSchedule";
import NavBarAdmin from "../NavBarAdmin";
import css from "./DashboardPage.module.css";
class DashBoardPage extends Component {
  render() {
    return (
      <div className={css.background}>
        <div className={css.dashboardContainer}>
          <DashboardBanner />
          <NavBarBootcampers />
          <DashBoardSchedule />
        </div>
      </div>
    );
  }
}
export default DashBoardPage;
