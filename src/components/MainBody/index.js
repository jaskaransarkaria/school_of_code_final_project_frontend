import React, { Component } from "react";
import Banner from "../Banner";
import DashboardSchedule from "../DashboardSchedule";
import css from "../MainBody/MainBody.module.css";
class MainBody extends Component {
  render() {
    return (
      <div className={css.mainBodyContainer}>
        <Banner />
        <DashboardSchedule />
      </div>
    );
  }
}
export default MainBody;
