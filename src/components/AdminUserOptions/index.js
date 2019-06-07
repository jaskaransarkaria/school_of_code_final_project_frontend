import React from "react";
import css from "./AdminUserOptions.module.css";
import DashboardBanner from "../DashboardBanner";

const AdminUserOptions = props => {
  const goToForms = () => {
    props.history.push(`form-processing`);
  };
  const goToVideos = () => {
    props.history.push(`video-processing`);
  };
  const goToSchedule = () => {
    props.history.push(`upload-schedule`);
  };

  return (
    <div className={css.container}>
      <DashboardBanner title={"Admin Dashboard"} />
      <div className={css.optionsContainer}>
        <div onClick={goToForms} className={css.cardContainer}>
          <img
            style={{ width: "200px", padding: "20px" }}
            src="/saturn.png"
            alt="saturn icon for forms"
          />
          <div onClick={goToForms} className={css.optionsCard}>
            <p>Form Applications</p>
          </div>
        </div>
        <div onClick={goToVideos} className={css.cardContainer}>
          <img
            style={{ width: "200px", padding: "20px" }}
            src="/venus.png"
            alt="venus icon for videos"
          />
          <div onClick={goToVideos} className={css.optionsCard}>
            <p>Video Applications</p>
          </div>
        </div>
        <div onClick={goToSchedule} className={css.cardContainer}>
          <img
            style={{ width: "200px", padding: "20px" }}
            src="/jupiter.svg"
            alt="jupiter icon for resource upload"
          />
          <div onClick={goToSchedule} className={css.optionsCard}>
            <p>Resource uploads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserOptions;
