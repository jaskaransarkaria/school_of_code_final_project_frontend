import React, { useState, useEffect } from "react";
import css from "../ApplicantDashboard/ApplicantDashboard.module.css";
import socPlanet from "../../Images/SOCPlanet.png";
import { api } from "../../config";
import firebase from "firebase";

const ApplicantDashBoard = props => {
  const [userUid, setUserUid] = useState("");
  const [modal, setModal] = useState(true);
  const [stepInfo, setStepInfo] = useState([
    {
      title: "Complete Form",
      desc: "Click here to complete the form",
      stage: 1,
      className: css.stepOne
    },
    {
      title: "Complete Videos",
      desc: "Click here to complete the videos",
      stage: 2,
      className: css.stepTwo
    },
    {
      title: "Interview Day",
      desc: "Click here to accept place for interview",
      stage: 3,
      className: css.stepThree
    }
  ]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user.uid);
      setUserUid(user.uid);
    });
  }, []);

  useEffect(() => {
    // GET the current uid's application info
    if (userUid) {
      console.log("applicant dashboard userUid", userUid);
      const getUidApplicationData = async () => {
        const data = await fetch(`${api.applications}/${userUid}`);
        const response = await data.json();
        console.log("GET uid application", response);
        setUsers({ ...response.result });
      };

      getUidApplicationData();
    }
  }, [userUid]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const goToApplicationForm = () => {
    props.props.history.push(`application-form`);
  };

  const goToApplicationVideo = () => {
    props.props.history.push(`application-video`);
  };

  const redirectTo = stage => {
    if (stage === 1) {
      return goToApplicationForm();
    }
    if (stage === 2) {
      return goToApplicationVideo();
    }

    if (stage === 3) {
      props.props.history.push("bootcamper-dashboard");
    }
  };
  const ApplicationStage = () => {
    let stage = "";
    if (userUid.passInterviewStage === true) {
      stage = "You passed them all! ";
    } else if (userUid.passVideoStage) {
      stage = "You are at stage 3";
    } else if (userUid.passFormStage === true) {
      stage = "You are at stage 2";
    } else {
      stage = "You are at stage 1";
    }
    return <h3> There are three stages. {stage} </h3>;
  };

  const Step = ({ passFirstStage, passSecondStage, passFinalStage }) => {
    return stepInfo.map((info, idx) => {
      return (
        <div className={info.className}>
          {(info.stage === 2 && passFirstStage !== true) ||
          (info.stage === 3 && passFirstStage !== true) ||
          (info.stage === 3 && passSecondStage === false) ? (
            <div className={css.stepNotAvailable}>
              <p>Stage {info.stage}</p>
              <p>Not available yet</p>
            </div>
          ) : null}

          {(info.stage === 1 && passFirstStage === true) ||
          (info.stage === 2 && passSecondStage === true) ||
          (info.stage === 3 && passFinalStage === true) ? (
            <div className={css.stepPassed}>
              <p>You passed Stage {info.stage}!</p>
            </div>
          ) : null}
          <div
            className={
              info.stage === 1 || info.stage === 2
                ? css.stageTitle
                : css.finalStageTitle
            }
          >
            {" "}
            Stage {info.stage}{" "}
          </div>
          <div className={css.progressImgContainer}>
            <img src={socPlanet} alt="socPlanet icon" />
          </div>
          <div onClick={() => redirectTo(info.stage)} className={css.stepCard}>
            <h3> {info.title}</h3>
            <p> {info.desc} </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={css.container}>
      {console.log("in APP DASH USERS", users)}
      <div className={css.header}>
        <h2> Applicant Dashboard </h2>
      </div>
      <div className={css.mainContentContainer}>
        <div
          className={
            modal && users.passFormStage === false
              ? css.modalContainer
              : css.hideModalContainer
          }
        >
          <div className={css.modal}>
            <h3>Welcome</h3>
            <p>
              This dashboard will guide you through the application process.
            </p>
            <p>Good luck!</p>
            <button onClick={toggleModal}>
              <p> Close and continue</p>
            </button>
          </div>
        </div>
        <div className={css.introductionContainer}>
          <ApplicationStage />
        </div>
        <div className={css.stepsContainer}>
          <Step
            passFirstStage={users.passFormStage}
            passSecondStage={users.passVideoStage}
            passFinalStage={users.passInterviewStage}
          />
        </div>

        {/* <div className={css.acceptanceContainer}>
            <h3> Secondary Container</h3>
            <div className={css.acceptCard}>
              <h3> Accept place</h3>
            </div>
          </div> */}
      </div>
    </div>
  );
};
export default ApplicantDashBoard;
