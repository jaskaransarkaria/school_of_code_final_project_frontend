import React, { Component } from "react";
import DashboardCarousel from "../DashboardCarousel";
import css from "../DashboardSchedule/DashboardSchedule.module.css";
class DashboardSchedule extends Component {
  render() {
    return (
      <div className={css.dashboardScheduleContainer}>
        <div className={css.daysOfWeekContainer}>
          <div className={css.mondayBox}>Monday</div>
          <div className={css.tuesdayBox}>Tuesday</div>
          <div className={css.wednesdayBox}>Wednseday</div>
          <div className={css.thursdayBox}>Thursday</div>
          <div className={css.fridayBox}>Friday</div>
        </div>
        <DashboardCarousel />
      </div>
    );
  }
}
export default DashboardSchedule;
