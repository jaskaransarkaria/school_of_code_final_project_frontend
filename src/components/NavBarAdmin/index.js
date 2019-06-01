import React from "react";
import { Link } from "react-router-dom";
import css from "../NavBarAdmin/NavBarAdmin.module.css";

import LessonsIcon from "../../Images/lessons.png";
import Home from "../../Images/home-white.png";
import CheckForm from "../../Images/check-form.png";
import VideoCamera from "../../Images/video-camera.png";
function NavBarBootcampers() {
  return (
    <>
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
    </>
  );
}
export default NavBarBootcampers;
