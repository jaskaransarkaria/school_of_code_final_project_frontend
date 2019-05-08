import React from "react";
import css from "../Banner/Banner.module.css";
import Welcome from "../Welcome";
function Banner({ props }) {
  return (
    <>
      <div className={css.bannerContainer}>
        <h1 className={css.bannerWelcomeText}>{`Welcome, ${props}`}</h1>
      </div>
    </>
  );
}
export default Banner;
