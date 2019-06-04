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
              <div className={css.subVideoInstructions}>
                <p>Please record and submit all 5 videos</p>
                <div className={css.startRecording}>Start Recording</div>
                <div className={css.stopRecording}>Stop Recording</div>
                <div className={css.playRecording}>Review Video</div>
                <div className={css.submitRecording}>Submit Video</div>
              </div>
            </div>
          </div>
          <div className={css.rightContainer}>
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
