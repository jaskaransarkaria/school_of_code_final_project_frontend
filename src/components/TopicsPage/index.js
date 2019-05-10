import React from "react";

import NavBar from "../NavBar";
import TopicsBanner from "../TopicsBanner";
import css from "../TopicsPage/Topics.module.css";
function Topics() {
  return (
    <>
      <div className={css.linksContainer}>
        <NavBar />
        <TopicsBanner />
      </div>
    </>
  );
}
export default Topics;
