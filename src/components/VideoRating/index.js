import React, { useState, useEffect } from "react";
import FeedbackTray from "../FeedbackTray";
import { api } from "../../config";

// TODO

// add questions
// number of pending applications
// force to rate before next question

const VideoRating = () => {
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
  // GET in videos from APPLICATIONS for each applicant based on uid which have a status 'pending'

  const calculateOverallRating = () =>
    collateFeedback
      .map(item => item.rating)
      .reduce((accumulator, currentValue) => accumulator + currentValue) /
    collateFeedback.length;

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
      <div id="userTray">
        <div id="videoTray">
          {pendingVideosData.map(
            ({ videoApplicationData, firebaseUid }, applicantIndex) => {
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
                    {videoApplicationData.length === 0 && (
                      <p>no video application data for: {firebaseUid} </p>
                    )}

                    {videoApplicationData.map(({ videoUrl }, videoIndex) => {
                      if (videoIndex === videoCounter) {
                        return (
                          <>
                            <p>{firebaseUid}</p>
                            {userInfo &&
                              userInfo.map(({ result: user }, userIndex) => {
                                if (applicantIndex === userIndex) {
                                  return (
                                    <>
                                      <p>{`${user.firstName} ${
                                        user.lastName
                                      }`}</p>
                                      <p>{`number: ${user.phoneNumber}`}</p>
                                      <p>{`gender: ${user.identify}`}</p>
                                      <p>{`email: ${user.email}`}</p>
                                      <p>{`age: ${user.age}`}</p>
                                      <p>{`location: ${user.location}`}</p>
                                      <p>{`background: ${user.background}`}</p>
                                    </>
                                  );
                                } else {
                                  return;
                                }
                              })}
                            <div>
                              {videoCounter + 1 <
                                videoApplicationData.length && (
                                <button
                                  onClick={() => {
                                    setCurrentUid(firebaseUid);
                                    setCollateFeedback([
                                      ...collateFeedback,
                                      {
                                        videoUrl: videoUrl,
                                        rating: adminFeedbackRating,
                                        comment: adminFeedbackComment
                                      }
                                    ]);
                                    setVideoCounter(videoCounter + 1);
                                  }}
                                >
                                  next Video
                                </button>
                              )}

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
                            <video controls src={videoUrl} />
                            <FeedbackTray
                              setAdminFeedbackRating={setAdminFeedbackRating}
                              setAdminFeedbackComment={setAdminFeedbackComment}
                            />
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
