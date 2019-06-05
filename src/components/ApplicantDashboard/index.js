import React, { useState, useEffect } from "react";
import css from "../ApplicantDashboard/ApplicantDashboard.module.css";
import socPlanet from "../../Images/planet_soc.png";
import { api } from "../../config";
import firebase from "firebase";
import rocket from "../../Images/spaceship.png";

const ApplicantDashBoard = props => {
  const [userUid, setUserUid] = useState("");
  const [modal, setModal] = useState(true);
  const [users, setUsers] = useState({});
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

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user === null) {
        return;
      } else {
        setUserUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    // GET the current uid's application info

    const getUidApplicationData = async () => {
      if (userUid) {
        const data = await fetch(`${api.applications}/${userUid}`);
        const response = await data.json();
        console.log("GET uid application", response);
        setUsers({ ...response.result });
      }
    };
    getUidApplicationData();
  }, [userUid]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const goToApplicationForm = () => {
    props.history.push(`/application-form`);
  };

  const goToApplicationVideo = () => {
    console.log(props);
    console.log(props.props);
    props.history.push(`/application-video`);
  };

  const redirectTo = stage => {
    if (stage === 1) {
      return goToApplicationForm();
    }
    if (stage === 2) {
      return goToApplicationVideo();
    }

    if (stage === 3) {
      props.history.push("/bootcamper-dashboard");
    }
  };
  const ApplicationStage = () => {
    let stage;
    if (userUid.passInterviewStage === true) {
      stage = "You passed them all! ";
    } else if (userUid.passVideoStage === true) {
      stage = "You are at stage 3";
    } else if (userUid.passFormStage === true) {
      stage = "You are at stage 2";
    } else {
      stage = "You are at stage 1";
    }
    return <h3>Track your journey to becoming a Bootcamper.</h3>;
  };

  const Steps = ({ passFirstStage, passSecondStage, passFinalStage }) => {
    const renderStep = (info, idx) => {
      console.log(info);
      return (
        <div className={info.className}>
          {(info.stage === 2 && Object.entries(users).length === 0) ||
          (info.stage === 3 && Object.entries(users).length === 0) ||
          (info.stage === 2 && passFirstStage === false) ||
          (info.stage === 2 && passFirstStage === "pending") ||
          (info.stage === 3 && passFirstStage === false) ||
          (info.stage === 3 && passFirstStage === "pending") ||
          (info.stage === 3 && passSecondStage === "pending") ||
          (info.stage === 3 && passSecondStage === false) ? (
            <div className={css.stepNotAvailable}>
              <img
                src="/lock_white.png"
                alt="padlocked stage"
                style={{ width: "40%" }}
              />
            </div>
          ) : null}

          {(info.stage === 1 && passFirstStage === true) ||
          (info.stage === 2 && passSecondStage === true) ||
          (info.stage === 3 && passFinalStage === true) ? (
            <div className={css.stepPassed}>
              <div className={css.congratsMessage}>Congratulations</div>
              <div className={css.congratsMessage}>
                {" "}
                You passed Stage {info.stage}!
              </div>
            </div>
          ) : null}
          {/* <button onClick={() => changeStage(info)}> Pass </button> */}
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
            <img
              src={rocket}
              alt="socPlanet icon"
              style={{
                width: "50px",
                height: "50px",
                position: "absolute",
                left: `${info.progression}%`,
                bottom: `${info.progression}%`,
                animation: `${css[`rocketFlight${info.progression}`]} 1s`
              }}
            />
          </div>
          <div onClick={() => redirectTo(info.stage)} className={css.stepCard}>
            <h3> {info.title}</h3>
            <p> {info.desc} </p>
          </div>
        </div>
      );
    };
    console.log(css);
    return stepInfo.map(addProgressionMock).map(renderStep);
  };
  const addProgressionMock = (info, idx) => ({
    progression: (idx + 1) * 25,
    ...info
  });

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
          <Steps
            passFirstStage={users.passFormStage}
            passSecondStage={users.passVideoStage}
            passFinalStage={users.passInterviewStage}
          />
        </div>
      </div>
    </div>
  );
};
export default ApplicantDashBoard;
