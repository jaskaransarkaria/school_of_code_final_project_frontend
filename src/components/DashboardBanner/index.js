import React, { useEffect, useState } from "react";
import SOCImage from "../../Images/soc-logo.png";
import css from "../DashboardBanner/DashboardBanner.module.css";
import firebase from "firebase";

function DashboardBanner() {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setDisplayName(user.displayName);
    });
  }, []);

  return (
    <>
      <div className={css.bannerContainer}>
        <h1 className={css.bannerWelcomeText}>{`Welcome, ${displayName}`}</h1>
        <img className={css.socLogo} src={SOCImage} alt="school of code logo" />
      </div>
    </>
  );
}
export default DashboardBanner;
