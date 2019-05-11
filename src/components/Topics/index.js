import React from "react";

import NavBarBootcampers from "../NavBarBootcampers";
import SubBanner from "../SubBanner";
import css from "./Topics.module.css";
import HtmlImage from "../../Images/html.svg";
import CssImage from "../../Images/css.svg";
import JsImage from "../../Images/js.svg";
import ReactImage from "../../Images/react-icon.svg";

function Topics() {
  return (
    <div className={css.container}>
      <SubBanner />

      <NavBarBootcampers />
      <div className={css.infoAreaBox}>INFO</div>
      <div className={css.topicsContainer}>
        <div className={css.rowOne}>
          <div className={css.htmlBox}>
            <img src={HtmlImage} alt="html icon" />
          </div>
          <div className={css.cssBox}>
            <img src={CssImage} alt="css icon" />
          </div>
          <div className={css.jsBox}>
            <img src={JsImage} alt="js icon" />
          </div>
          <div className={css.reactBox}>
            <img src={ReactImage} alt="react icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Topics;
