import React from "react";
import css from "../Banner/Banner.module.css";
function Banner() {
  return (
    <>
      <div className={css.bannerContainer}>
        <h1 className={css.bannerWelcomeText}>Welcome, User!</h1>
      </div>
    </>
  );
}
export default Banner;
