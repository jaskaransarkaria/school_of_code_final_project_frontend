import React from "react";
import { Link } from "react-router-dom";
import css from "../NavBarBootcampers/NavBarBootcampers.module.css";
// import HomeIcon from "../../Images/home.svg";
// import CalendarIcon from "../../Images/calendar.svg";
// import GlassesIcon from "../../Images/glasses.svg";
// import InfoIcon from "../../Images/information.svg";
import Home from "../../Images/home-white.png";
import CheckForm from "../../Images/check-form.png";
import VideoCamera from "../../Images/video-camera.png";
import LessonsIcon from "../../Images/lessons.png";

function NavBarBootcampers() {
  return (
    // Temporarily replaced the bootcamp navbar with the admin dashboard for styling. Bootcamper one is below.
    <nav className={css.navContainer}>
      <div className={css.iconsContainer}>
        <Link to="/admin-dashboard">
          <div className={css.homeIconContainer}>
            <img className={css.homeIcon} src={Home} alt="application icon" />
          </div>
        </Link>
        <Link to="/admin-dashboard/form-processing/">
          <div className={css.formsIconContainer}>
            <img
              className={css.formsIcon}
              src={CheckForm}
              alt="schedule upload icon"
            />
          </div>
        </Link>
        <Link to="/schedule">
          <div className={css.videosIconContainer}>
            <img
              className={css.videosIcon}
              src={VideoCamera}
              alt="calendar icon"
            />
          </div>
        </Link>
        <Link to="/topics">
          <div className={css.resourcesIconContainer}>
            <img
              className={css.resourcesIcon}
              src={LessonsIcon}
              alt="glasses icon"
            />
          </div>
        </Link>
      </div>
    </nav>
    // <nav className={css.navContainer}>
    //   <div className={css.iconsContainer}>
    //     <div className={css.homeContainer}>
    //       <Link to="/bootcamper-dashboard">
    //         <img className={css.homeIcon} src={HomeIcon} alt="home icon" />
    //       </Link>
    //     </div>

    //     <div className={css.calendarContainer}>
    //       <Link to="/schedule">
    //         <img
    //           className={css.calendarIcon}
    //           src={CalendarIcon}
    //           alt="calendar icon"
    //         />
    //       </Link>
    //     </div>

    //     <div className={css.glassesContainer}>
    //       <Link to="/topics">
    //         <img
    //           className={css.glassesIcon}
    //           src={GlassesIcon}
    //           alt="glasses icon"
    //         />
    //       </Link>
    //     </div>

    //     <div className={css.infoContainer}>
    //       <Link to="/credits">
    //         <img className={css.infoIcon} src={InfoIcon} alt="info icon" />
    //       </Link>
    //     </div>
    //   </div>
    // </nav>
  );
}
export default NavBarBootcampers;
