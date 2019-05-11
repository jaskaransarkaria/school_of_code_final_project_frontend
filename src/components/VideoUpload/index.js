import React, { useState } from "react";

const interviewQuestions = [
  { question: "Tell us about yourself." },
  { question: "Why do you want to learn to code?" },
  { question: "What drives you?" },
  { question: "Why do you want to join School of Code?" },
  { question: "Explain something complex in simple terms." }
];

// send the video to the server
// check video and audio are available, if not post alert.

const VideoUpload = () => {
  const [questionCounter, setQuestionCounter] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  // feature detction - check existance of a navigator

  let localStream;
  let recorder;

  // no microphone on this comp!!!!
  const constraints = {
    audio: {
      sampleRate: 48000,
      channelCount: 2,
      volume: 1.0
    },
    video: {
      width: { min: 1280 },
      height: { min: 720 },
      frameRate: { ideal: 60, min: 20 }
    }
  };

  const hasGetUserMedia = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function(devices) {
        devices.forEach(item => {
          console.log(item);
          if (item.kind === "videoinput") {
            setHasVideo(true);
          } else if (item.kind === "audioinput") {
            setHasAudio(true);
          }
        });
      })
      // check a key === audioinput and a key === videoinput
      // .then(function(devices) {
      //   devices.forEach(function(device) {
      //     console.log(
      //       device.kind + ": " + device.label + " id = " + device.deviceId
      //     );
      //   });
      // })
      .catch(function(err) {
        console.log("err caught");
        console.log(err.name + ": " + err.message);
      });
    // console.log(navigator.mediaDevices);
    // console.log(navigator.mediaDevices.getUserMedia({ video: true }));
    // console.log(navigator.mediaDevices.getUserMedia({ audio: true }));
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    // the parameter passed into getUserMedia() is an object eg. {video: true, audio: true}
  };

  if (hasGetUserMedia()) {
    console.log(`video ${hasVideo}. audio ${hasAudio}`);
  }

  const sumbitVideo = () => {
    console.log("submit localc stream", localStream);
    // console.log("submit stream", stream.getTracks());
    console.log("submit recorder", recorder);
    console.log(document.getElementById("videoUpload"));
    // when video submitted old vid disappear and reset with blank screen
    localStream = null;
    document.getElementById("videoUpload").srcObject = null;
    recorder = null;
    console.log("paused?", document.getElementById("videoUpload").paused);
    console.log("ended?", document.getElementById("videoUpload").ended);
    // send video to server
    return;
  };

  const handleRecording = action => {
    try {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        switch (action) {
          case "stop":
            var tracks = stream.getTracks();
            document.getElementById("videoUpload").srcObject = null;
            //localStream.getTracks()[0].stop();
            tracks.forEach(function(track) {
              track.stop();
            });
            stream.getTracks().forEach(function(track) {
              track.stop();
            });
            localStream.getTracks().forEach(function(track) {
              track.stop();
            });
            document.getElementById("videoUpload").autoplay = false;
            if (recorder.state === "recording") {
              recorder.stop();
            } else {
              return;
            }
            return;
          case "start":
            document.getElementById("videoUpload").autoplay = true;
            document.getElementById("videoUpload").play();
            console.log("from start", stream);
            localStream = stream;
            recorder = new MediaRecorder(stream);
            var video = document.querySelector("video");
            recorder.addEventListener("dataavailable", function(e) {
              // e.data contains the audio data! let's associate it to an <audio> element
              video.src = URL.createObjectURL(e.data);
            });
            video.addEventListener("timeupdate", function() {
              // don't have set the startTime yet? set it to our currentTime
              if (!this._startTime) this._startTime = this.currentTime;

              var playedTime = this.currentTime - this._startTime;

              if (playedTime >= 30) {
                handleRecording("stop");
              }
            });

            video.addEventListener("seeking", function() {
              // reset the timeStart
              this._startTime = undefined;
            });

            recorder.start();
            return (document.getElementById("videoUpload").srcObject = stream);
          default:
            return;
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  // getUserMedia() can only be called from an HTTPS URL, localhost or a file:// URL.
  // Otherwise, the promise from the call will be rejected. getUserMedia() also won't work for cross origin
  // calls from iframes

  return (
    <div style={{ textAlign: "center" }}>
      {showVideo &&
        interviewQuestions
          .slice(
            questionCounter,
            questionCounter + 1 > interviewQuestions.length
              ? null
              : questionCounter + 1
          )
          // could cause problem when it gets to the end of the list
          .map(item => {
            return (
              <>
                <h1>
                  {item.question} {questionCounter + 1}/5
                </h1>
                <video
                  controls
                  autoPlay
                  id="videoUpload"
                  height="50%"
                  width="80%"
                  display="block"
                  poster="/school-of-code.jpg"
                />
                <br />
                <button
                  onClick={() => {
                    // check if they have a microphone and webcam here
                    hasGetUserMedia();
                    console.log(hasAudio, hasVideo);

                    if (!hasVideo || !hasAudio) {
                      alert(
                        "Your device needs a microphone and a webcam your device is missing one"
                      );
                      return;
                    } else {
                      handleRecording("start");
                    }
                  }}
                >
                  Start Recording
                </button>
                <>
                  <button
                    onClick={() => {
                      if (localStream) {
                        handleRecording("stop");
                      }
                    }}
                  >
                    Stop Recording
                  </button>
                </>
                {questionCounter + 1 < interviewQuestions.length ? (
                  <button
                    onClick={() => {
                      // upload to datbase;
                      if (localStream && localStream.active === false) {
                        console.log("from submit button", localStream);
                        sumbitVideo();
                        setQuestionCounter(questionCounter + 1);
                      } else {
                        if (localStream) {
                          alert("finish recording your video first");
                        } else {
                          alert("You must record a video before submitting.");
                        }
                      }
                    }}
                  >
                    Submit Video
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sumbitVideo();
                      setShowVideo(false);
                    }}
                  >
                    Sumbit Final
                  </button>
                )}
              </>
            );
          })}
    </div>
  );
};

export default VideoUpload;
