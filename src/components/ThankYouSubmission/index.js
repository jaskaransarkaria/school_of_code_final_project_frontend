import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import css from "../ThankYou/ThankYou.module.css";
import TickImage from "../../Images/checked.svg";

const ThankYouSubmission = () => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to="/applicant-dashboard" />;

  return (
    <>
      <div className={css.rightContentWrapper}>
        <img className={css.tickImage} src={TickImage} alt="green tick icon" />

        <h1 className={css.thanksMessage}>Thanks for your submission!</h1>
        <p className={css.subTextOne}>
          You will receive an email within the next few weeks
        </p>

        <>
          <button
            className={css.signOutButton}
            onClick={() => setRedirect(true)}
          >
            Bootcamper Dashboard
          </button>
        </>
      </div>
    </>
  );
};

export default ThankYouSubmission;
