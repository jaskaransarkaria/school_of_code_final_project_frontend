import React, { Component } from "react";
import DashboardCarousel from "../DashboardCarousel";
import css from "../DashboardSchedule/DashboardSchedule.module.css";
class DashboardSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: false
    };
  }

  handleClick = () => {
    this.setState({
      buttonColor: !this.state.buttonColor
    });
  };
  render() {
    return (
      <div className={css.dashboardScheduleContainer}>
        <div className={css.daysOfWeekContainer}>
          <div className={css.mondayBox} onClick={this.handleClick}>
            Monday
          </div>
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
