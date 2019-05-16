import React, { Component } from "react";

import css from "../Template/Template.module.css";

class Template extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.leftContainer}>
            <div className={css.content} />
          </div>
          <div className={css.rightContainer} />
        </div>
      </div>
    );
  }
}
export default Template;
