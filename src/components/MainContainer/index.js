import React from "react";
import NavBar from "../NavBar";
import MainBody from "../MainBody";
import css from "../MainContainer/MainContainer.module.css";
function MainContainer() {
  return (
    <div>
      <MainBody />
      <NavBar />
    </div>
  );
}
export default MainContainer;
