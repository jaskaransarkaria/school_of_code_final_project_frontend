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
  const [userInfo, setUserInfo] = useState([]);
  const [videoCounter, setVideoCounter] = useState(0);
  const [applicantCounter, setApplicantCounter] = useState(0);
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
        passVideoStage: overallRating >= 6 ? true : false
      })
    });
    const response = await data.json();
    console.log(response);
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

  useEffect(() => {
    const getPendingVideos = async () => {
      const response = await fetch(`${api.applications}/pending-videos`);
      const data = await response.json();
      console.log(data);
      console.log(data.result);
      setPendingVideosData(data.result);
    };
    getPendingVideos();
    console.log("PENDINGVIDEODATA", pendingVideosData);
  }, []);

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
      {console.log("userInfo", userInfo)}
      {console.log("adminFeedbackRating", adminFeedbackRating)}
      {console.log("adminFeedbackComment", adminFeedbackComment)}
      {console.log("collated ratings", collateFeedback)}
      {console.log("current uid", currentUid)}
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
                                    console.log(collateFeedback.length);
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
        </div>
      </div>
    </>
  );
};

export default VideoRating;
