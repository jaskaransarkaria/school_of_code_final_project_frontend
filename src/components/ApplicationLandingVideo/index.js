import React, { Component } from "react";
import Login from "../Login";
import css from "../ApplicationLandingVideo/ApplicationLandingVideo.module.css";

// Images
import SocImage from "../../Images/soc-logo.png";

import VideoUpload from "../VideoUpload";
class ApplicationLandingVideo extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.leftContainer}>
            <div className={css.applicationFormText}>
              <h1>Application Video Questions</h1>
            </div>
            <div className={css.socImageContainer}>
              <img
                src={SocImage}
                className={css.socImage}
                alt="School of code logo"
              />
            </div>
            <div className={css.instructionsContainer}>
              <p>Please record and submit all 5 videos.</p>
              <div className={css.keysContainer}>
                <div className={css.iconContainer}>
                  <p className={css.startRecording}>Start Recording</p>
                  <img src="/record.png" alt="Record Button " />
                </div>
                <div className={css.iconContainer}>
                  <p>Stop Recording</p>
                  <img src="/stop.png" alt="Record Button " />
                </div>
                <div className={css.iconContainer}>
                  <p>Review Video</p>
                  <img src="/play.png" alt="Record Button " />
                </div>
                <div className={css.iconContainer}>
                  <p>Submit Video</p>
                  <img src="/checked.png" alt="Record Button " />
                </div>
              </div>
            </div>
          </div>
          <div className={css.rightContainer}>
            <VideoUpload />
          </div>
        </div>
      </div>
    );
  }
}
export default ApplicationLandingVideo;
