import React from "react";
import { Link } from "react-router-dom";
import css from "../NavBarBootcampers/NavBarBootcampers.module.css";
import HomeIcon from "../../Images/home.svg";
import CalendarIcon from "../../Images/calendar.svg";
import GlassesIcon from "../../Images/glasses.svg";
import InfoIcon from "../../Images/information.svg";

function NavBarBootcampers() {
  return (
    <nav className={css.navContainer}>
      <div className={css.iconsContainer}>
        <div className={css.homeContainer}>
          <Link to="/bootcamper-dashboard">
            <img className={css.homeIcon} src={HomeIcon} alt="home icon" />
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
          <Link to="/credits">
            <img className={css.infoIcon} src={InfoIcon} alt="info icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default NavBarBootcampers;
