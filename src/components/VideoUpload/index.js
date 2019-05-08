import React, { useState } from "react";

const interviewQuestions = [
  { question: "Tell us about yourself." },
  { question: "Why do you want to learn to code?" },
  { question: "What drives you?" },
  { question: "Why do you want to join School of Code?" },
  { question: "Explain something complex in simple terms." }
];

// bug you can't stop it from seperate places
// bug can't keep stopping something that is already stopped errors at different points that call stop...
// bug it actually starts recording if you pass stop twice
// check video and audio are available, if not post alert.

const VideoUpload = () => {
  const [questionCounter, setQuestionCounter] = useState(0);
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
    // audio: {
    //   sampleRate: 48000,
    //   channelCount: 2,
    //   volume: 1.0
    // },
    video: {
      width: { min: 1280 },
      height: { min: 720 },
      frameRate: { ideal: 60, min: 20 }
    }
  };

  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    // the parameter passed into getUserMedia() is an object eg. {video: true, audio: true}
  };

  if (hasGetUserMedia()) {
    console.log("features detected");
  } else {
    console.log("no feature detected");
  }

  const handleRecording = action => {
    try {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        switch (action) {
          case "stop":
            var track = stream.getTracks()[0];
            document.getElementById("videoUpload").pause();
            document.getElementById("videoUpload").srcObject = null;

            localStream.getTracks()[0].stop();
            track.stop();
            if (recorder.state === "recording") {
              recorder.stop();
            } else {
              return;
            }
            return;
          case "start":
            document.getElementById("videoUpload").play();
            localStream = stream;
            recorder = new MediaRecorder(stream);
            recorder.addEventListener("dataavailable", function(e) {
              // e.data contains the audio data! let's associate it to an <audio> element

              var el = document.querySelector("video");
              el.src = URL.createObjectURL(e.data);
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
                />
                <br />
                <button
                  onClick={() => {
                    handleRecording("start");
                  }}
                >
                  Start Recording
                </button>
                <>
                  <button
                    onClick={() => {
                      handleRecording("stop");
                    }}
                  >
                    Stop Recording
                  </button>
                </>
                {questionCounter + 1 < interviewQuestions.length ? (
                  <button
                    onClick={() => {
                      // handleRecording("stop");
                      setQuestionCounter(questionCounter + 1);
                      // upload to datbase;
                    }}
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // handleRecording("stop");
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
