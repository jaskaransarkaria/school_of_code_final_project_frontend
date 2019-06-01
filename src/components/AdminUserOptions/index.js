import React from "react";
import css from "./AdminUserOptions.module.css";
import DashboardBanner from "../DashboardBanner";

const AdminUserOptions = props => {
  const goToForms = () => {
    props.history.push(`admin-dashboard/form-processing/`);
  };
  const goToVideos = () => {
    props.history.push(`admin-dashboard/video-processing/`);
  };
  const goToSchedule = () => {
    props.history.push(`admin-dashboard/upload-schedule/`);
  };

  return (
    <div className={css.container}>
      <DashboardBanner title={"Admin Dashboard"} />
      {
        <>
          <div className={css.optionsContainer}>
            <div onClick={goToForms} className={css.optionsCard}>
              <p> Process Application Forms</p>
            </div>
            <div onClick={goToVideos} className={css.optionsCard}>
              <p>Process Video Applications</p>
            </div>
            <div onClick={goToSchedule} className={css.optionsCard}>
              <p>Teacher Resource Upload</p>
            </div>
            {/* <div onClick={goToSchedule} className={css.optionsCard}>
              <p>View all accepted Applications</p>
            </div> */}
          </div>
        </>
      }
    </div>
  );
};

export default AdminUserOptions;
