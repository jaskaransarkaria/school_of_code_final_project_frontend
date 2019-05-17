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
          <div className={css.leftContainer}>
            <h1>School of Code</h1>

            <h3>Application Area</h3>

            <div className={css.socImageContainer}>
              <img
                className={css.socImage}
                src={SocImage}
                alt="School of code logo"
              />
            </div>

            <h3 className={css.followUs}>Follow us:</h3>
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
            </div>
            <span className={css.webAddress}>www.schoolofcode.co.uk</span>
          </div>
          <div className={css.rightContainer}>
            <div className={css.formContainer}>
              <ApplicationFormApp />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ApplicationLandingForm;
