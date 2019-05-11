import React from "react";
import NavBarBootcampers from "../NavBarBootcampers";
import SubBanner from "../SubBanner";
import css from "../InfoPage/InfoPage.module.css";
function InfoPage() {
  return (
    <div className={css.infoPageContainer}>
      <SubBanner />
      <NavBarBootcampers />
    </div>
  );
}
export default InfoPage;
