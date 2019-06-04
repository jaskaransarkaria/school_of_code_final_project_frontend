import React, { useEffect, useState } from "react";
import SOCImage from "../../Images/soc-logo.png";
import css from "../DashboardBanner/DashboardBanner.module.css";
import firebase from "firebase";

function DashboardBanner({ title }) {
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      } else {
        setDisplayName(user.displayName);
      }
    });
  }, []);

  return (
    <>
      <div className={css.bannerContainer}>
        <h1 className={css.bannerWelcomeText}>{title}</h1>
        <img className={css.socLogo} src={SOCImage} alt="school of code logo" />
      </div>
    </>
  );
}
export default DashboardBanner;
