import React from "react";
const VideoUpload = () => {
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
    try {
      console.log("into the fire");
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        localStream = stream;
        stream.getTracks().forEach(function(track) {
          console.log(track.getSettings()); //returns an object with all applicable constraints
        });
        recorder = new MediaRecorder(stream);
        recorder.addEventListener("dataavailable", function(e) {
          // e.data contains the audio data! let's associate it to an <audio> element
          var el = document.querySelector("video");
          el.src = URL.createObjectURL(e.data);
        });

        // start recording here...
        recorder.start();

        return (document.getElementById("videoUpload").srcObject = stream);

        // here we are feeding the video tag the mediaStram from the webcam
      });
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("no feature detected");
  }

  // getUserMedia() can only be called from an HTTPS URL, localhost or a file:// URL.
  // Otherwise, the promise from the call will be rejected. getUserMedia() also won't work for cross origin
  // calls from iframes

  return (
    <div style={{ textAlign: "center" }}>
      <video
        controls
        autoPlay
        id="videoUpload"
        height="50%"
        width="80%"
        display="block"
      />
      <br />
      <>
        <button
          onClick={() => {
            document.getElementById("videoUpload").pause();
          }}
        >
          Pause Recording
        </button>
        <button
          onClick={() => {
            try {
              navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                var track = stream.getTracks()[0];
                document.getElementById("videoUpload").pause();
                document.getElementById("videoUpload").srcObject = null;
                localStream.getTracks()[0].stop();
                track.stop();
                recorder.stop();
              });
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Stop Recording
        </button>
        <button
          onClick={() => {
            try {
              navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                document.getElementById("videoUpload").play();
                localStream = stream;
                return (document.getElementById(
                  "videoUpload"
                ).srcObject = stream);
                // here we are feeding the video tag the mediaStram from the webcam
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Resume Recording
        </button>
        <button
          onClick={() => {
            try {
              navigator.mediaDevices.getUserMedia(constraints).then(stream => {
                document.getElementById("videoUpload").play();
                localStream = stream;
                recorder = new MediaRecorder(stream);
                recorder.addEventListener("dataavailable", function(e) {
                  // e.data contains the audio data! let's associate it to an <audio> element
                  var el = document.querySelector("video");
                  el.src = URL.createObjectURL(e.data);
                });

                recorder.start();
                return (document.getElementById(
                  "videoUpload"
                ).srcObject = stream);

                // here we are feeding the video tag the mediaStram from the webcam
              });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Restart Recording
        </button>
      </>
    </div>
  );
};

export default VideoUpload;
