import React, { Component } from "react";
import css from "../DashboardTopicsCarousel/DashboardTopicsCarousel.module.css";
import HtmlIcon from "../../Images/html-5(2).svg";
import CssIcon from "../../Images/css3(2).svg";
import JavaScriptIcon from "../../Images/javascript (2).svg";
import ReactIcon from "../../Images/react(2).svg";
import NodeIcon from "../../Images/nodejs(2).svg";

class DashboardTopicsCarousel extends Component {
  render() {
    return (
      <>
        <div className={css.topicsCarouselContainer}>
          <div className={css.topicTypesContainer}>
            <div className={css.htmlIcon}>
              <img
                src={HtmlIcon}
                style={{
                  width: "120px",
                  height: "120px",
                  border: "3px solid black"
                }}
              />
              <textarea />
            </div>

            <img
              src={CssIcon}
              style={{
                width: "120px",
                height: "120px",
                border: "3px solid black"
              }}
            />

            <img
              src={JavaScriptIcon}
              style={{
                width: "120px",
                height: "120px",
                border: "3px solid black"
              }}
            />

            <img
              src={ReactIcon}
              style={{
                width: "120px",
                height: "120px",
                border: "3px solid black"
              }}
            />

            <img
              src={NodeIcon}
              style={{
                width: "120px",
                height: "120px",
                border: "3px solid black"
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
export default DashboardTopicsCarousel;
