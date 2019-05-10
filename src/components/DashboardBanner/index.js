import React from "react";
import SOCImage from "../../Images/soc-logo.png";
import css from "../DashboardBanner/DashboardBanner.module.css";
import Welcome from "../Welcome";
function DashboardBanner({ props }) {
  return (
    <>
      <div className={css.bannerContainer}>
        <h1 className={css.bannerWelcomeText}>{`Welcome, ${props}`}</h1>
        {/* <h2 className={css.todaysScheduleText}>Todays Schedule</h2> */}
        <img className={css.socLogo} src={SOCImage} alt="school of code logo" />
      </div>
    </>
  );
}
export default DashboardBanner;
