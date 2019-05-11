import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBarBootcampers from "../NavBarBootcampers";
import DashBoardSchedule from "../DashboardSchedule";
import NavBarAdmin from "../NavBarAdmin";
import css from "../DashBoardPage/DashboardPage.module.css";
class DashBoardPage extends Component {
  render() {
    return (
      <div className={css.dashBoardContainer}>
        <DashboardBanner />
        <NavBarBootcampers />
        <DashBoardSchedule />
      </div>
    );
  }
}
export default DashBoardPage;
