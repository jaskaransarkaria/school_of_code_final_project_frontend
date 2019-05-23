import React, { useState } from "react";
import css from "../ApplicantDashboard/ApplicantDashboard.module.css";
// import socPlanet from "../../Images/SOCPlanet.png";

const ApplicantDashBoard = props => {
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
  const [users, setUsers] = useState([
    {
      uid: "ijdofij932098",
      name: "Matthew Wendzina",
      stagePassed: 1,
      applicationForm: false,
      applicationVideos: false,
      applicationDay: false
    }
  ]);

  // const changeStage = info => {
  //   if (info.stage === 1) {
  //     setUsers([{ ...users }]);
  //   }
  // };

  const toggleModal = () => {
    setModal(!modal);
  };

  const goToApplicationForm = () => {
    props.props.history.push(`application-form`);
  };

  const ApplicationStage = () => {
    let stage = "";
    if (users[0].applicationDay === true) {
      stage = "You passed them all! ";
    } else if (users[0].applicationVideos === true) {
      stage = "You are at stage 3";
    } else if (users[0].applicationForm === true) {
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
            {/* <img src={socPlanet} alt="socPlanet icon" /> */}
          </div>
          <div onClick={goToApplicationForm} className={css.stepCard}>
            <h3> {info.title}</h3>
            <p> {info.desc} </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2> Applicant Dashboard </h2>
      </div>
      <div className={css.mainContentContainer}>
        <div
          className={
            modal && users[0].applicationForm === false
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
            passFirstStage={users[0].applicationForm}
            passSecondStage={users[0].applicationVideos}
            passFinalStage={users[0].applicationDay}
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
