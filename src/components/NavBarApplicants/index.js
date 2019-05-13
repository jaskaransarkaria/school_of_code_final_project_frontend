import React from "react";
import { Link } from "react-router-dom";
import css from "../NavBarApplicants/NavBarApplicants.module.css";
import ApplyIcon from "../../Images/apply.svg";
function NavBarApplicants() {
  return (
    <>
      <nav className={css.navContainer}>
        <div className={css.iconsContainer}>
          <div className={css.applyContainer}>
            <Link to="/">
              <img className={css.applyIcon} src={ApplyIcon} alt="apply icon" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavBarApplicants;
