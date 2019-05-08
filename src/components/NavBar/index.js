import React from "react";
import css from "../NavBar/NavBar.module.css";
import HomeIcon from "../../Images/home.svg";
import CalendarIcon from "../../Images/calendar.svg";
import GlassesIcon from "../../Images/glasses.svg";
import EducationIcon from "../../Images/education.svg";
import NotebookIcon from "../../Images/notebook.svg";

function NavBar() {
  return (
    <>
      <nav className={css.navContainer}>
        <div className={css.iconsContainer}>
          <div>
            <img className={css.homeIcon} src={HomeIcon} alt="home icon" />
          </div>
          <div>
            <img
              className={css.calendarIcon}
              src={CalendarIcon}
              alt="calendar icon"
            />
          </div>
          <div>
            <img
              className={css.glassesIcon}
              src={GlassesIcon}
              alt="glasses icon"
            />
          </div>
          <div>
            <img
              className={css.educationIcon}
              src={EducationIcon}
              alt="education icon"
            />
          </div>
          <div>
            <img
              className={css.notebookIcon}
              src={NotebookIcon}
              alt="notebook icon"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBar;
