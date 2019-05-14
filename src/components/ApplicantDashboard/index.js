import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBar from "../NavBar";
import VideoUpload from "../VideoUpload";
import css from "../ApplicantDashboard/ApplicantDashboard.module.css";

class ApplicantDashBoard extends Component {
  render() {
    return (
      <>
        <div className={css.wrapper}>
          <DashboardBanner />
          <NavBar propsUser="Applicant" />
          <div className={css.container}>
            <VideoUpload />
          </div>
        </div>
      </>
    );
  }
}
export default ApplicantDashBoard;
