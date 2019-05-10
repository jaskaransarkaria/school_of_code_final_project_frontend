import React from "react";
import css from "../ScheduleBanner/ScheduleBanner.module.css";
function ScheduleBanner() {
  return (
    <>
      <div className={css.bannerContainer}>
        <h1 className={css.bannerTitle}>Lesson Schedule</h1>
      </div>
    </>
  );
}
export default ScheduleBanner;
