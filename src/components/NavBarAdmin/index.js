import React from "react";
import { Link } from "react-router-dom";
import css from "../NavBarAdmin/NavBarAdmin.module.css";

import CalendarIcon from "../../Images/calendar.svg";
import GlassesIcon from "../../Images/glasses.svg";
import InfoIcon from "../../Images/information.svg";
import ApplyIcon from "../../Images/apply.svg";
import ScheduleUploadIcon from "../../Images/upload.svg";
function NavBarBootcampers() {
  return (
    <>
      <nav className={css.navContainer}>
        <div className={css.iconsContainer}>
          <div className={css.applicationContainer}>
            <Link to="/adminApplication">
              <img
                className={css.calendarIcon}
                src={ApplyIcon}
                alt="application icon"
              />
            </Link>
          </div>
          <div className={css.scheduleUploadContainer}>
            <Link to="/scheduleUploads">
              <img
                className={css.scheduleUploadIcon}
                src={ScheduleUploadIcon}
                alt="schedule upload icon"
              />
            </Link>
          </div>
          <div className={css.calendarContainer}>
            <Link to="/schedule">
              <img
                className={css.calendarIcon}
                src={CalendarIcon}
                alt="calendar icon"
              />
            </Link>
          </div>
          <div className={css.glassesContainer}>
            <Link to="/topics">
              <img
                className={css.glassesIcon}
                src={GlassesIcon}
                alt="glasses icon"
              />
            </Link>
          </div>
          <div className={css.infoContainer}>
            <Link to="/information">
              <img className={css.infoIcon} src={InfoIcon} alt="info icon" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBarBootcampers;
