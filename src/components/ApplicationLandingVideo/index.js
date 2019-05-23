import React, { Component } from "react";
import Login from "../Login";
import css from "../ApplicationLandingVideo/ApplicationLandingVideo.module.css";
import SocImage from "../../Images/soc-logo.png";

import VideoUpload from "../VideoUpload";
class ApplicationLandingVideo extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.leftContainer}>
            <div className={css.socImageContainer}>
              <img
                src={SocImage}
                className={css.socImage}
                alt="School of code logo"
              />
            </div>
            <div className={css.instructionsContainer}>
              <h2 className={css.instructionsText}>Instructions</h2>
              <br />

              <p className={css.instructionsParagraph}>
                Please record and submit each video question so we can get to
                know more about you. Once you have submitted the information you
                will receive an email which will notify you if you have
                successfully made it to the interview day.
              </p>
            </div>
            {/* <div className={css.questionBoxContainer}>
              <div className={css.selectdiv}>
                <label>
                  <select>
                    <option selected>-- Questions --</option>
                    <option>Step 1 of 5</option>
                    <option>Step 2 of 5</option>
                    <option>Step 3 of 5</option>
                    <option>Step 4 of 5</option>
                    <option>Step 5 of 5</option>
                  </select>
                </label>
              </div>
            </div> */}
          </div>
          <div className={css.rightContainer}>
            <h1 className={css.applicationFormText}>
              Application Video Questions
            </h1>

            <div className={css.videoUploadContainer}>
              <VideoUpload />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ApplicationLandingVideo;
