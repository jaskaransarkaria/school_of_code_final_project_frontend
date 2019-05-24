import React, { useState, useEffect, useReducer } from "react";
import FeedbackTray from "../FeedbackTray";
import DashboardBanner from "../DashboardBanner";
import { api } from "../../config";
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
  const [showSpecificApplication, setShowSpecificApplication] = useState();
  const [rateVideoAlert, setRateVideoAlert] = useState(false);
  const [showApplicants, dispatch] = useReducer((state, action, e) => {
    switch (action) {
      case "pending":
        return state === "pending" ? null : "pending";
      case "accepted":
        return state === "accepted" ? null : "accepted";
      case "rejected":
        return state === "rejected" ? null : "rejected";
      default:
        return state;
    }
  }, null);

  // GET in videos from APPLICATIONS for each applicant based on uid which have a status 'pending'

  const AverageScore = () => {
    let score;

    score =
      (collateFeedback
        .map(item => item.rating)
        .reduce((accumulator, currentValue) => accumulator + currentValue) /
        collateFeedback.length /
        10) *
      100;

    return (
      <p>
        <span>Overall Score: {score.toFixed(0)}%</span>
      </p>
    );
  };
  // {
  //   debugger;
  //   let score = Object.keys(collateFeedback).reduce(function(
  //     total,
  //     current,
  //     idx
  //   ) {
  //     const nextItem = collateFeedback[current];
  //     console.log(nextItem[idx].rating);
  //     return total + nextItem[idx].rating;
  //   },
  //   0);
  //   return score;
  // };

  const calculateOverallRating = () =>
    collateFeedback
      .map(item => item.rating)
      .reduce((accumulator, currentValue) => accumulator + currentValue) /
    collateFeedback.length;

  const goToHome = () => {
    props.history.push(`/admin-dashboard`);
  };

  const postRatingsToServer = async () => {
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
    console.log(response);
  };

  const getAllUsers = async () => {
    const data = await fetch(`${api.users}`);
    const response = await data.json();
    setAllUsers(response.result);
  };

  const getUserInfo = data => {
    console.log("userinfo data", data);
    const { firebaseUid } = data;
    return fetch(`${api.users}/${firebaseUid}`)
      .then(res => res.json())
      .then(json => {
        console.log("JSON response", json);
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

  const viewApplication = (e, id) => {
    // if (showSpecificApplications[0] === applicationStatus) {
    //   return setShowSpecificApplications([]);
    // } else if (e.type !== "click" && e.key !== "Enter") {
    //   return;
    // }
    setShowSpecificApplication([id]);
    console.log("ShowSpecificApplications:", showSpecificApplication);
  };

  const updatePassStage = async () => {
    const data = await fetch(
      `${api.applications}/admin-video-descion-update-many`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ratingsData: [...acceptedVideosData, ...rejectedVideosData]
        })
      }
    );
    const response = await data.json();
    console.log(response);
  };

  useEffect(() => {
    const getVideos = async () => {
      const response = await fetch(
        `${api.applications}/make-descion-videos/pending`
      );
      const data = await response.json();
      console.log(data);
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
      console.log(data);
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
      console.log(data);
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

    //return updatePassStage();
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
        <div id="videoTray">
          {pendingVideosData.map(
            ({ videoApplicationData, firebaseUid }, applicantIndex) => {
              console.log("VIDEOAPPLICATIONDATA:", videoApplicationData);
              console.log("FIREBASE-ID:", firebaseUid);
              if (applicantIndex === applicantCounter) {
                return (
                  <>
                    <div>
                      <button
                        onClick={() => {
                          if (applicantIndex > 0) {
                            setApplicantCounter(applicantCounter - 1);
                          }
                        }}
                      >
                        previous Video
                      </button>
                      <button
                        onClick={() => {
                          if (applicantCounter + 1 < pendingVideosData.length)
                            setApplicantCounter(applicantCounter + 1);
                        }}
                      >
                        next Video
                      </button>
                    </div>

                    <div className={css.applicationStatusContainer}>
                      <div>
                        <button
                          className={
                            showApplicants === "pending"
                              ? css.applicationStatusButtonActive
                              : css.applicationStatusButton
                          }
                          onClick={() => dispatch("pending")}
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
                          {pendingVideosData.map(applicant => {
                            return (
                              <>
                                <button
                                  className={css.applicant}
                                  onClick={e =>
                                    viewApplication(e, applicant.firebaseUid)
                                  }
                                  // onKeyUp={e => viewApplication(e, applicant.id)}
                                >
                                  {applicant.firebaseUid}
                                </button>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <button
                          className={
                            showApplicants === "accepted"
                              ? css.applicationStatusButtonActive
                              : css.applicationStatusButton
                          }
                          onClick={() => dispatch("accepted")}
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
                            showApplicants === "accepted"
                              ? css.applicantListContainer
                              : css.hideApplicantListContainer
                          }
                        >
                          {/* List all applicants, unless the search input is used  */}
                          {acceptedVideosData.map(applicant => {
                            return (
                              <>
                                <button
                                  className={css.applicant}
                                  // onClick={e => viewApplication(e, applicant.id)}
                                  // onKeyUp={e => viewApplication(e, applicant.id)}
                                >
                                  {applicant.firebaseUid}
                                </button>
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
                            showApplicants === "rejected"
                              ? css.applicationStatusButtonActive
                              : css.applicationStatusButton
                          }
                          onClick={() => dispatch("rejected")}
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
                            showApplicants === "rejected"
                              ? css.applicantListContainer
                              : css.hideApplicantListContainer
                          }
                        >
                          {/* List all applicants, unless the search input is used  */}
                          {rejectedVideosData.map(applicant => {
                            return (
                              <>
                                <button
                                  className={css.applicant}
                                  // onClick={e => viewApplication(e, applicant.id)}
                                  // onKeyUp={e => viewApplication(e, applicant.id)}
                                >
                                  {applicant.firebaseUid}
                                </button>
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
                                              Video {videoCounter + 1}
                                            </span>{" "}
                                          </p>
                                          {collateFeedback.length === 0 ? (
                                            <p>
                                              <span>Overall Score: 0</span>
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
                                            {/* {videoCounter + 1 <
                                              videoApplicationData.length && (
                                              <button
                                                onClick={() => {
                                                  console.log(
                                                    "ADMINFEEDBACKRATING:",
                                                    adminFeedbackRating
                                                  );
                                                  if (
                                                    rateVideoAlert === false
                                                  ) {
                                                    return setRateVideoAlert(
                                                      true
                                                    );
                                                  }
                                                  setCurrentUid(firebaseUid);
                                                  setCollateFeedback([
                                                    ...collateFeedback,
                                                    {
                                                      videoUrl: videoUrl,
                                                      rating: adminFeedbackRating,
                                                      comment: adminFeedbackComment
                                                    }
                                                  ]);
                                                  setVideoCounter(
                                                    videoCounter + 1
                                                  );
                                                }}
                                              >
                                                Next Video
                                              </button>
                                            )} */}
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
          <input
            type="text"
            onChange={e => {
              setSliderPassValue(e.target.value);
            }}
          />
          <button onClick={() => updatePassStage()}>Confirm Accepted!</button>
        </div>
      </div>
    </>
  );
};

export default VideoRating;
