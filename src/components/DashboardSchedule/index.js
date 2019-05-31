import React, { Component } from "react";
import DashboardScheduleCarousel from "../DashboardScheduleCarousel";
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
      <>
        <div className={css.wrapper}>
          <div className={css.dashboardScheduleContainer}>
            <div className={css.daysOfWeekContainer}>
              <div className={css.dayBox} onClick={this.handleClick}>
                Monday
              </div>
              <div className={css.dayBox}>Tuesday</div>
              <div className={css.dayBox}>Wednesday</div>
              <div className={css.dayBox}>Thursday</div>
              <div className={css.dayBox}>Friday</div>
            </div>

            <DashboardScheduleCarousel />
          </div>
        </div>
      </>
    );
  }
}
export default DashboardSchedule;
