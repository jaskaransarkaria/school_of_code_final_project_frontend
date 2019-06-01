import React, { Component } from "react";
import Login from "../Login";
import css from "../ApplicationLandingPage/ApplicationLandingPage.module.css";
import SocImage from "../../Images/soc-logo.png";

import MoonImage from "../../Images/SOCMoon.png";
import AstronautImage from "../../Images/SOCAstronaut.webp";
import PlanetImage from "../../Images/planet_soc.png";
class ApplicationLandingPage extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <img
          src={SocImage}
          className={css.socImage}
          alt="school of code logo"
        />

        <div className={css.subHeader}>
          <div className={css.sentenceOne}>
            <h4>Free 16 week intensive web development </h4>
          </div>

          <div className={css.sentenceTwo}>
            <h4> course open to everyone</h4>
          </div>
        </div>

        <div className={css.loginContainer}>
          <Login />
        </div>

        <div className={css.launchIntoTech}>
          <span>Launch</span>
          <br />
          <span>Into</span>
          <br />
          <span>Tech</span>
        </div>
        <img src={PlanetImage} className={css.planetImage} alt="planet" />
        <img src={MoonImage} className={css.moonImage} alt="moon" />
        <img
          src={AstronautImage}
          className={css.astronautImage}
          alt="astronaut"
        />
      </div>
    );
  }
}
export default ApplicationLandingPage;
