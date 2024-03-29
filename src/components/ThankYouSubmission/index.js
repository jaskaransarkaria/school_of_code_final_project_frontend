import React from "react";
import { Link } from "react-router-dom";
import css from "./ThankYou.module.css";
import TickImage from "../../Images/checked.svg";

const ThankYouSubmission = () => {
  return (
    <div className={css.rightContentWrapper}>
      <img className={css.tickImage} src={TickImage} alt="green tick icon" />

      <h1 className={css.thanksMessage}>Thanks for your submission!</h1>
      <p className={css.subTextOne}>
        You will receive an email within the next few weeks
      </p>
      <div className={css.linkContainer}>
        <Link className={css.signOutButton} to="/applicant-dashboard">
          Bootcamper Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ThankYouSubmission;
