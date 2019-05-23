import React, { Component } from "react";
import css from "../ApplicationLandingForm/ApplicationLandingForm.module.css";
import SocImage from "../../Images/soc-logo.png";
import TwitterImage from "../../Images/twitter-logo.svg";
import FacebookImage from "../../Images/facebook-logo.svg";
import YoutubeImage from "../../Images/youtube.svg";
import LinkedInImage from "../../Images/linked-in.svg";
import MediumImage from "../../Images/medium-size.svg";
import LocationImage from "../../Images/location.svg";
import EmailImage from "../../Images/close-envelope.svg";
import ApplicationFormApp from "../ApplicationFormApp";
class ApplicationLandingForm extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.formContainer}>
            <ApplicationFormApp />
          </div>
        </div>
      </div>
    );
  }
}
export default ApplicationLandingForm;
