import React from "react";
import css from "../SubBanner/SubBanner.module.css";
function SubBanner() {
  return (
    <>
      <div className={css.bannerContainer}>
        <h1 className={css.bannerTitle} />
      </div>
    </>
  );
}
export default SubBanner;
