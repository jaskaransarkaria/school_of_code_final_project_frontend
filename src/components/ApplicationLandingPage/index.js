import React, { Component } from "react";
import Login from "../Login";
import css from "../ApplicationLandingPage/ApplicationLandingPage.module.css";
import SocImage from "../../Images/soc-logo.png";
import TwitterImage from "../../Images/twitter-logo.svg";
import FacebookImage from "../../Images/facebook-logo.svg";
import YoutubeImage from "../../Images/youtube.svg";
import LinkedInImage from "../../Images/linked-in.svg";
import MediumImage from "../../Images/medium-size.svg";
import LocationImage from "../../Images/location.svg";
import EmailImage from "../../Images/close-envelope.svg";
import MoonImage from "../../Images/SOCMoon.png";
import AstronautImage from "../../Images/SOCAstronaut.webp";
import PlanetImage from "../../Images/planet_soc.png";
class ApplicationLandingPage extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        {/* <h3 className={css.followUs}>Follow us:</h3>
            <div className={css.socialMediaContainer}>
              <div className={css.twitterContainer}>
                <a
                  href="https://twitter.com/theschoolofcode?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={css.twitterLogo}
                    src={TwitterImage}
                    alt="twitter logo"
                  />
                </a>
              </div>
              <div className={css.facebookContainer}>
                <a
                  href="https://www.facebook.com/schoolofcode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={css.facebookLogo}
                    src={FacebookImage}
                    alt="facebook logo"
                  />
                </a>
              </div>
              <div className={css.youtubeContainer}>
                <a
                  href="https://www.youtube.com/channel/UCKBzheEKcrqsaJhMV0f_Dmg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={css.youtubeLogo}
                    src={YoutubeImage}
                    alt="youtube logo"
                  />
                </a>
              </div>
              <div className={css.linkedInContainer}>
                <a
                  href="https://www.linkedin.com/school/school-of-code/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={css.linkedInLogo}
                    src={LinkedInImage}
                    alt="linked in logo"
                  />
                </a>
              </div>
              <div className={css.mediumContainer}>
                <a
                  href="https://blog.schoolofcode.co.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={css.mediumLogo}
                    src={MediumImage}
                    alt="medium logo"
                  />
                </a>
              </div>
            </div>
            <h3 className={css.contactUs}>Contact Us:</h3>
            <div className={css.contactContainer}>
              <div className={css.locationContainer}>
                <a
                  href="https://www.google.co.uk/maps/place/School+of+Code/@52.4892523,-1.8905427,17z/data=!3m1!4b1!4m5!3m4!1s0x4870bc8ef033dafd:0x716efdbd64f96d78!8m2!3d52.4892523!4d-1.8883594?shorturl=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className={css.locationLogo}
                    src={LocationImage}
                    alt="location logo"
                  />
                </a>
              </div>
              <div className={css.emailContainer}>
                <img
                  className={css.emailLogo}
                  src={EmailImage}
                  alt="email logo"
                />
              </div>
            </div> */}

        <img
          src={SocImage}
          className={css.socImage}
          alt="school of code logo"
        />

        {/* <h3 className={css.techHeading}>Bootcamp</h3> */}
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
          <span style={{ borderBottom: "7px solid #5F04CF" }}>Launch</span>
          <br />
          <span style={{ borderBottom: "7px solid #5F04CF" }}>Into</span>
          <br />
          <span style={{ borderBottom: "7px solid #5F04CF" }}>Tech</span>
        </div>
        <img src={PlanetImage} className={css.planetImage} alt="planet" />
        <img src={MoonImage} className={css.moonImage} alt="moon" />
        <img
          src={AstronautImage}
          className={css.astronautImage}
          alt="astronaut"
        />
        {/* <img src={PlanetImage} className={css.planetImage} alt="planet" /> */}
      </div>
    );
  }
}
export default ApplicationLandingPage;
