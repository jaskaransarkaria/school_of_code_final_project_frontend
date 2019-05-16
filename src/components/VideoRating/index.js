import React, { useState, useEffect } from "react";
import FeedbackTray from "../FeedbackTray";
import { api } from "../../config";

const VideoRating = () => {
  const [pendingVideosData, setPendingVideosData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [videoCounter, setVideoCounter] = useState(0);
  const [applicantCounter, setApplicantCounter] = useState(0);
  // GET in videos from APPLICATIONS for each applicant based on uid which have a status 'pending'

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
  }, []);

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

  // calculate overall rating

  // POST ratings for each video all at once && POST whether they have passed or failed this stage

  return (
    <>
      {console.log("pendingvideodata", pendingVideosData)}
      {console.log("userInfo", userInfo)}
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
                              <button
                                onClick={() => {
                                  if (videoCounter > 0) {
                                    setVideoCounter(videoCounter - 1);
                                  }
                                }}
                              >
                                previous Video
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    videoCounter + 1 <
                                    videoApplicationData.length
                                  )
                                    setVideoCounter(videoCounter + 1);
                                }}
                              >
                                next Video
                              </button>
                            </div>
                            <video controls autoplay src={videoUrl} />
                            <FeedbackTray />
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
