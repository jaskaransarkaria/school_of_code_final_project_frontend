import React, { useState, useEffect } from "react";
import FeedbackTray from "../FeedbackTray";
import { api } from "../../config";

const VideoRating = () => {
  const [pendingVideosData, setPendingVideosData] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
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
      //setUserInfo(data.userInfo);
    };
    getPendingVideos();
  }, []);

  useEffect(() => {
    console.log("mapping over GET users info");
    const grabAll = () =>
      Promise.all(pendingVideosData.map(getUserInfo)).then(users =>
        setUserInfo([...userInfo, users])
      );
    grabAll();
  }, [pendingVideosData]);

  // GET in personal details from the USERS based on uid
  // calculate overall rating
  // POST ratings for each video all at once && POST whether they have passed or failed this stage

  return (
    <>
      {console.log("the stuff", userInfo)}
      {pendingVideosData.map((item, ind) => {
        return (
          <div id="userTray">
            <p>{item.firebaseUid}</p>
            <div id="videoTray">
              {item.videoApplicationData.map(video => {
                return (
                  <>
                    <>
                      <p>{item.firebaseUid}</p>

                      <p>{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                      <p>{`number: ${userInfo.phoneNumber}`}</p>
                      <p>{`gender: ${userInfo.identify}`}</p>
                      <p>{`email: ${userInfo.email}`}</p>
                      <p>{`age: ${userInfo.age}`}</p>
                      <p>{`location: ${userInfo.location}`}</p>
                      <p>{`background: ${userInfo.background}`}</p>
                    </>
                    <>
                      <video controls autoplay src={video.videoUrl} />
                      <FeedbackTray />
                    </>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default VideoRating;
