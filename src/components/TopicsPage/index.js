import React from "react";

import NavBarBootcampers from "../NavBarBootcampers";
import SubBanner from "../SubBanner";
import css from "../TopicsPage/Topics.module.css";
function Topics() {
  return (
    <div className={css.topicInfoContainer}>
      <SubBanner />

      <NavBarBootcampers />
      <h1 className={css.title}>hello</h1>
    </div>
  );
}
export default Topics;
