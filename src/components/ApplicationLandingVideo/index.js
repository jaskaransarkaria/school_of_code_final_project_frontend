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
            <div className={css.instructionsBox}>Instructions</div>
            <ol className={css.instructionsContainer}>
              <li>Please record and submit each of the 5 videos</li>
              <li>There are 5 sections in total which need completed</li>
              <li>
                <span style={{ fontWeight: "bold" }}>
                  Process for recording each video:
                </span>
                <ol className={css.subVideoInstructions}>
                  <li className={css.startRecording}>Start Recording</li>
                  <li className={css.stopRecording}>Stop Recording</li>
                  <li className={css.playRecording}>
                    Play to review and re-record if needed
                  </li>
                  <li className={css.submitRecording}>Submit the video</li>
                </ol>
              </li>
              <li style={{ marginTop: "20px" }}>
                You will be sent an email notifying if you have made it to the
                next stage
              </li>
            </ol>
          </div>
          <div className={css.rightContainer}>
            <h1 className={css.applicationFormText}>
              Application Video Questions
            </h1>
            <br />

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
