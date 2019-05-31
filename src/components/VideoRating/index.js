import React, { useState, useEffect, useReducer } from "react";
import FeedbackTray from "../FeedbackTray";
import DashboardBanner from "../DashboardBanner";
import { api } from "../../config";
import UserName from "../UserName";
import Rating from "react-rating";
import css from "./VideoRating.module.css";
// TODO

// add questions
// number of pending applications
// force to rate before next question

const VideoRating = props => {
  const [currentUid, setCurrentUid] = useState("");
  const [adminFeedbackRating, setAdminFeedbackRating] = useState(0);
  const [adminFeedbackComment, setAdminFeedbackComment] = useState("");
  const [overallRating, setOverallRating] = useState(0);
  const [collateFeedback, setCollateFeedback] = useState([]);
  const [pendingVideosData, setPendingVideosData] = useState([]);
  const [acceptedVideosData, setAcceptedVideosData] = useState([]);
  const [rejectedVideosData, setRejectedVideosData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [videoCounter, setVideoCounter] = useState(0);
  const [applicantCounter, setApplicantCounter] = useState(0);
  const [sliderPassValue, setSliderPassValue] = useState(6);
  const [showSpecificApplication, setShowSpecificApplication] = useState(null);
  const [rateVideoAlert, setRateVideoAlert] = useState(false);
  const [showApplicants, dispatch] = useReducer((state, action, e) => {
    switch (action) {
      case "pending":
        return state === "pending" ? null : "pending";

      case true:
        return state === true ? null : true;
      case false:
        return state === false ? null : false;
      default:
        return state;
    }
  }, null);
  const videoQuestions = [
    { question: "Tell us about yourself" },
    { question: "Why do you want to learn to code?" },
    { question: "What drives you?" },
    { question: "Why do you want to join School of Code?" },
    { question: "Explain something complex in simple terms" }
  ];
  // GET in videos from APPLICATIONS for each applicant based on uid which have a status 'pending'

  console.log("VIDEOQUESTIONS", videoQuestions[0].question);

  const AverageScore = () => {
    let score;

    score =
      collateFeedback
        .map(item => item.rating)
        .reduce((accumulator, currentValue) => accumulator + currentValue) /
      collateFeedback.length;
    ///
    //   10) *
    // 100;

    return (
      <p>
        Overall Rating:
        <Rating
          initialRating={score / 2}
          emptySymbol="fa fa-star-o fa-2x"
          fullSymbol="fa fa-star fa-2x"
          style={{ color: "rgba(248, 180, 22, 1)" }}
          fractions={2}
          readonly
        />
      </p>
    );
  };

  const calculateOverallRating = () =>
    collateFeedback
      .map(item => item.rating)
      .reduce((accumulator, currentValue) => accumulator + currentValue) /
    collateFeedback.length;

  const goToHome = () => {
    props.history.push(`/admin-dashboard`);
  };

  const postRatingsToServer = async () => {
    console.log("current uid is not set", currentUid);
    console.log(
      "FROM POST RATINGS",
      currentUid,
      collateFeedback,
      overallRating
    );
    const data = await fetch(`${api.applications}/admin-video-descion`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        applicantFirebaseUid: currentUid,
        videoApplicationData: collateFeedback,
        videoOverallRating: overallRating,
        passVideoStage: overallRating >= sliderPassValue ? true : false
      })
    });
    const response = await data.json();
    console.log("post ratings to server response", response);
  };
  const updatePassStage = async () => {
    console.log("UPDAATATATATATAT PASS STAGE UPDATE PRE");
    return await fetch(`${api.applications}/admin-video-descion-update-many`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ratingsData: [...acceptedVideosData, ...rejectedVideosData]
      })
    });
    // const response = await data.json();
    // console.log("PASS STAGE UPDATE", response); // there is no response sent
  };

  const getUserInfo = data => {
    console.log("userinfo data", data);
    const { firebaseUid } = data;
    return fetch(`${api.users}/${firebaseUid}`)
      .then(res => res.json())
      .then(json => {
        return json;
      });
  };

  const matchUidToName = uid => {
    const matchedUser = allUsers.find(user => user.firebaseUid === uid);
    if (
      "firstName" in matchedUser === false &&
      "lastName" in matchedUser === false
    ) {
      matchedUser.firstName = "defaultFIRSTName";
      matchedUser.lastName = "defaultLASTName";
    }
    return `${matchedUser.firstName} ${matchedUser.lastName}`;
  };

  const getAllUsers = async () => {
    const data = await fetch(`${api.users}`);
    const response = await data.json();
    setAllUsers(response.result);
  };
  const viewApplication = (e, id) => {
    // if (showSpecificApplications[0] === applicationStatus) {
    //   return setShowSpecificApplications([]);
    // } else if (e.type !== "click" && e.key !== "Enter") {
    //   return;
    // }
    setCurrentUid(id);
    showSpecificApplication
      ? setShowSpecificApplication(null)
      : setShowSpecificApplication([id]);
  };

  useEffect(() => {
    const getVideos = async () => {
      const response = await fetch(
        `${api.applications}/make-descion-videos/pending`
      );
      const data = await response.json();
      console.log("applications/pending-videos", data.result);
      // map over this array on the back end and send all the relevant info back
      setPendingVideosData(data.result);
    };

    getVideos();
    console.log("PENDINGVIDEODATA", pendingVideosData);
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      const response = await fetch(
        `${api.applications}/make-descion-videos/accepted`
      );
      const data = await response.json();
      console.log("applications/pending-videos", data.result);
      // map over this array on the back end and send all the relevant info back
      setAcceptedVideosData(data.result);
    };
    getVideos();
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      const response = await fetch(
        `${api.applications}/make-descion-videos/rejected`
      );
      const data = await response.json();
      console.log("applications/pending-videos", data.result);
      // map over this array on the back end and send all the relevant info back
      setRejectedVideosData(data.result);
    };
    getVideos();
  }, []);

  useEffect(() => {
    // go through accepted and rejected arrays and change the relevant data
    let updatedAccepted = acceptedVideosData.slice().map(user => {
      user.passVideoStage =
        user.videoOverallRating >= sliderPassValue ? true : false;
      return user;
    });
    let updatedRejected = rejectedVideosData.slice().map((user, indx) => {
      user.passVideoStage =
        user.videoOverallRating >= sliderPassValue ? true : false;
      return user;
    });

    setAcceptedVideosData(
      [...updatedAccepted, ...updatedRejected].filter(
        user => user.passVideoStage
      )
    );
    setRejectedVideosData(
      [...updatedAccepted, ...updatedRejected].filter(
        user => !user.passVideoStage
      )
    );
  }, [sliderPassValue]);

  useEffect(() => {
    if (collateFeedback.length > 3) {
      setOverallRating(calculateOverallRating());
      console.log("from the useEffect", calculateOverallRating());
      if (collateFeedback.length === 5) {
        postRatingsToServer();
        console.log("RATINGS POSTED!");
      }
    }
  }, [collateFeedback]);

  useEffect(() => {
    console.log("mapping over GET users info");
    const grabAll = () =>
      Promise.all(pendingVideosData.map(getUserInfo)).then(users => {
        console.log("USERS in grab all", users);
        setUserInfo(users);
      });
    grabAll();
    getAllUsers();
  }, [pendingVideosData]);

  // GET in personal details from the USERS based on uid

  // calculate overall rating && overwrite videoApplicationData with new data from collateFeedback
  // account for on last video send all of the ratings up via POST after calculating overallRating

  // logic for the "previous video" ? to prevent rating something twice?

  // POST ratings for each video all at once && POST whether they have passed or failed this stage
  // also reset the collateFeedback back to an empty array

  return (
    <>
      {console.log("pendingvideodata", pendingVideosData)}
      {console.log("acceptedvideodata", acceptedVideosData)}
      {console.log("rejectedvideodata", rejectedVideosData)}
      {console.log("userInfo", userInfo)}
      {console.log("adminFeedbackRating", adminFeedbackRating)}
      {console.log("adminFeedbackComment", adminFeedbackComment)}
      {console.log("collated ratings", collateFeedback)}
      {console.log("current uid", currentUid)}
      {console.log("current slider pass value", sliderPassValue)}
      {console.log("get ALL USERS", allUsers)}
      {allUsers.map(user =>
        console.log(
          "MAPPING AND UID TO NAME!!",
          matchUidToName(user.firebaseUid)
        )
      )}
      <DashboardBanner title={"Video Applications"} />
      <div id="userTray" className={css.userTray}>
        <div className={css.ratingTitleContainer}>
          <p> Pass Threshold </p>
          <Rating
            initialRating={sliderPassValue / 2}
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            style={{ color: "rgba(82, 226, 80, 1)" }}
            fractions={2}
            onClick={value => {
              // setRatingValue(value);
              // setAdminFeedbackRating(value * 2);
              setSliderPassValue(value * 2);
              updatePassStage();
            }}
          />
        </div>
        <div id="videoTray">
          {pendingVideosData.map(
            ({ videoApplicationData, firebaseUid }, applicantIndex) => {
              if (applicantIndex === applicantCounter) {
                return (
                  <>
                    <div className={css.applicationStatusContainer}>
                      <div>
                        <button
                          className={
                            showApplicants === "pending"
                              ? css.applicationStatusButtonActive
                              : css.applicationStatusButton
                          }
                          onClick={() => {
                            dispatch("pending");
                          }}
                        >
                          <p> Pending Applications</p>
                          <p className={css.applicationsNumber}>
                            {
                              pendingVideosData.filter(
                                applicant =>
                                  applicant.passVideoStage === "pending"
                              ).length
                            }
                          </p>
                        </button>
                        <ul
                          className={
                            showApplicants === "pending"
                              ? css.applicantListContainer
                              : css.hideApplicantListContainer
                          }
                        >
                          {/* List all applicants, unless the search input is used  */}
                          {pendingVideosData.map(
                            (applicant, pendingApplicationIndex) => {
                              return (
                                <>
                                  <UserName
                                    classToBe={css.applicant}
                                    click={e =>
                                      viewApplication(e, applicant.firebaseUid)
                                    }
                                    key={e =>
                                      viewApplication(e, applicant.firebaseUid)
                                    }
                                    uid={applicant.firebaseUid}
                                    applicantCounter={() =>
                                      setApplicantCounter(
                                        pendingApplicationIndex
                                      )
                                    }
                                    dispatch={() => dispatch("pending")}
                                  />
                                </>
                              );
                            }
                          )}
                        </ul>
                      </div>
                      <div>
                        <button
                          className={
                            showApplicants === true
                              ? css.applicationStatusButtonActive
                              : css.applicationStatusButton
                          }
                          onClick={() => dispatch(true)}
                        >
                          <p> Accepted Applications</p>
                          <p className={css.applicationsNumber}>
                            {
                              acceptedVideosData.filter(
                                applicant => applicant.passVideoStage === true
                              ).length
                            }
                          </p>
                        </button>
                        <ul
                          className={
                            showApplicants === true
                              ? css.applicantListContainer
                              : css.hideApplicantListContainer
                          }
                        >
                          {/* List all applicants, unless the search input is used  */}
                          {acceptedVideosData.map(applicant => {
                            return (
                              <>
                                <UserName
                                  classToBe={css.applicant}
                                  click={e =>
                                    viewApplication(e, applicant.firebaseUid)
                                  }
                                  key={e =>
                                    viewApplication(e, applicant.firebaseUid)
                                  }
                                  uid={applicant.firebaseUid}
                                  dispatch={() => dispatch(true)}
                                />
                              </>
                            );
                          })}
                        </ul>
                        <div
                          onClick={goToHome}
                          className={css.adminDashboardHome}
                        >
                          <button> Admin Home</button>
                        </div>
                      </div>
                      <div>
                        <button
                          className={
                            showApplicants === false
                              ? css.applicationStatusButtonActive
                              : css.applicationStatusButton
                          }
                          onClick={() => dispatch(false)}
                        >
                          <p> Rejected Applications</p>
                          <p className={css.applicationsNumber}>
                            {
                              rejectedVideosData.filter(
                                applicant => applicant.passVideoStage === false
                              ).length
                            }
                          </p>
                        </button>
                        <ul
                          className={
                            showApplicants === false
                              ? css.applicantListContainer
                              : css.hideApplicantListContainer
                          }
                        >
                          {/* List all applicants, unless the search input is used  */}
                          {rejectedVideosData.map(applicant => {
                            return (
                              <>
                                <UserName
                                  classToBe={css.applicant}
                                  click={e =>
                                    viewApplication(e, applicant.firebaseUid)
                                  }
                                  key={e =>
                                    viewApplication(e, applicant.firebaseUid)
                                  }
                                  uid={applicant.firebaseUid}
                                  dispatch={() => dispatch(false)}
                                />
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    {videoApplicationData.length === 0 && (
                      <p>no video application data for: {firebaseUid} </p>
                    )}

                    {videoApplicationData.map(({ videoUrl }, videoIndex) => {
                      if (
                        String(firebaseUid) ===
                          String(showSpecificApplication) &&
                        videoIndex === videoCounter
                      ) {
                        return (
                          <>
                            {/* <p>{firebaseUid}</p> */}

                            {userInfo &&
                              userInfo.map(({ result: user }, userIndex) => {
                                if (applicantIndex === userIndex) {
                                  return (
                                    <>
                                      <div
                                        className={css.videoRatingsContainer}
                                      >
                                        <div
                                          className={css.detailsContainer}
                                          key={userIndex}
                                        >
                                          <h2>Applicant Details </h2>
                                          <h3>
                                            {user.firstName} {user.lastName}
                                          </h3>
                                          <div className={css.metaData}>
                                            <p>Age: {user.age}</p>
                                            <p>Location: {user.location}</p>
                                            <p>Background: {user.background}</p>
                                          </div>
                                        </div>
                                        <div className={css.videoStageTitle}>
                                          <p>
                                            {" "}
                                            <span>
                                              {" "}
                                              {
                                                videoQuestions[videoCounter]
                                                  .question
                                              }
                                            </span>{" "}
                                          </p>
                                          {collateFeedback.length === 0 ? (
                                            <p>
                                              <span>
                                                Overall Rating:
                                                <div
                                                  className={
                                                    css.ratingTitleContainer
                                                  }
                                                >
                                                  <Rating
                                                    initialRating={0}
                                                    emptySymbol="fa fa-star-o fa-2x"
                                                    fullSymbol="fa fa-star fa-2x"
                                                    style={{
                                                      color:
                                                        "rgba(248, 180, 22, 1)"
                                                    }}
                                                    fractions={2}
                                                    readonly
                                                  />
                                                </div>
                                              </span>
                                            </p>
                                          ) : (
                                            <AverageScore
                                              collateFeedback={collateFeedback}
                                            />
                                          )}
                                        </div>
                                        <div className={css.videosContainer}>
                                          <video
                                            className={css.videoPlayer}
                                            controls
                                            src={videoUrl}
                                          />
                                          <div
                                            className={
                                              css.toggleVideosContainer
                                            }
                                          >
                                            <FeedbackTray
                                              adminFeedbackRating={
                                                adminFeedbackRating
                                              }
                                              setAdminFeedbackRating={
                                                setAdminFeedbackRating
                                              }
                                              videoCounter={videoCounter}
                                              setVideoCounter={setVideoCounter}
                                              collateFeedback={collateFeedback}
                                              setCollateFeedback={
                                                setCollateFeedback
                                              }
                                              videoUrl={videoUrl}
                                              rateVideoAlert={rateVideoAlert}
                                              setRateVideoAlert={
                                                setRateVideoAlert
                                              }
                                              setAdminFeedbackComment={
                                                setAdminFeedbackComment
                                              }
                                            />
                                            <button
                                              className={
                                                css.toggleVideosContainer
                                              }
                                              onClick={viewApplication}
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                } else {
                                  return;
                                }
                              })}
                            <div>
                              {videoCounter + 1 ===
                                videoApplicationData.length && (
                                <button
                                  onClick={() => {
                                    setCollateFeedback([
                                      ...collateFeedback,
                                      {
                                        videoUrl: videoUrl,
                                        rating: adminFeedbackRating,
                                        comment: adminFeedbackComment
                                      }
                                    ]);
                                    // set pending "passVideoStage" flag to true if overall rating over 6
                                    // set to false if under 6
                                    setVideoCounter(videoCounter + 1);
                                    // videoCounter will equal 6
                                    // so then remove the button and display then previous or next application
                                    // show message then remove it with setTimeout()??
                                  }}
                                >
                                  Confirm Ratings
                                </button>
                              )}
                            </div>
                          </>
                        );
                      } else {
                        return;
                      }
                    })}
                  </>
                );
              } else {
                return;
              }
            }
          )}
        </div>
      </div>
    </>
  );
};

export default VideoRating;
