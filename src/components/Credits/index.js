import React, { Component } from "react";
import NavBar from "../NavBar";
import css from "../Template/Template.module.css";

class Template extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.leftContainer}>
            {/* <NavBar propsUser="Bootcamper" /> */}
          </div>
          <div className={css.rightContainer} />
        </div>
      </div>
    );
  }
}
export default Template;
