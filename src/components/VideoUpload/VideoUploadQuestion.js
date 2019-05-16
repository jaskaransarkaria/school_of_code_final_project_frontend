import React, { useState, useEffect, useRef } from "react";

import AWS from "aws-sdk";
import { aws } from "../../config";

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: `${aws.key_id}`,
  secretAccessKey: `${aws.secret_key}`
});
const s3 = new AWS.S3();

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
let localStream;
let recorder;

const VideoUploadQuestion = () => {
  const [src, setSrc] = useState(
    "https://school-of-code-applicant-videos.s3.eu-west-1.amazonaws.com/video5.webm"
  );
  const [autoplay, setAutoplay] = useState(true);
  const [chunks, setChunks] = useState([]);
  const video = useRef(null);
  // const [chunks, setChunks] = useState([]);
  useEffect(
    () =>
      // feature detction - check existance of a navigator
      (navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia),
    []
  );

  const handleRecording = action => {
    try {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        switch (action) {
          case "stop":
            var tracks = stream.getTracks();
            setSrc(null);
            tracks.forEach(function(track) {
              track.stop();
            });
            stream.getTracks().forEach(function(track) {
              track.stop();
            });
            if (localStream) {
              localStream.getTracks().forEach(function(track) {
                track.stop();
              });
            }
            setAutoplay(false);
            if (recorder.state === "recording") {
              recorder.stop();
            } else {
              return;
            }
            return;
          case "start":
            setAutoplay(true);

            video.current.play(); // use a ref here
            localStream = stream;
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = e => {
              if (e.data && e.data.size > 0) {
                video.current.src = URL.createObjectURL(e.data);
                setChunks([...chunks, e.data]);
              }
            };

            video.current.addEventListener("timeupdate", function() {
              // don't have set the startTime yet? set it to our currentTime
              if (!this._startTime) this._startTime = this.currentTime;

              var playedTime = this.currentTime - this._startTime;

              if (playedTime >= 30) {
                handleRecording("stop");
              }
            });

            video.current.addEventListener("seeking", function() {
              // reset the timeStart
              this._startTime = undefined;
            });

            recorder.start();
            setSrc(stream);
            video.current.srcObject = stream;
            return;
          default:
            return;
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <video
        ref={video}
        controls
        autoPlay={autoplay}
        id="videoUpload"
        height="50%"
        width="80%"
        display="block"
        poster="/school-of-code.jpg"
        key={src}
      >
        <source src={src} />
      </video>
      <br />
      <button
        onClick={() => {
          // check if they have a microphone and webcam here
          handleRecording("start");
        }}
      >
        Start Recording
      </button>
      <button
        onClick={() => {
          if (localStream) {
            handleRecording("stop");
          }
        }}
      >
        Stop Recording
      </button>
      <button
        onClick={() => {
          // upload to datbase;
          const blob = new Blob(chunks, { type: "video/webm" });
          var params = {
            Bucket: "school-of-code-applicant-videos",
            Key: "video5.webm",
            Body: blob,
            ContentType: "video/webm"
          };
          s3.upload(params, function(err, data) {
            if (err) {
              console.error(err);
            } else {
              video.current.src = data.Location;
              setAutoplay(true);
            }
          });
        }}
      >
        Submit Video
      </button>
    </>
  );
};

export default VideoUploadQuestion;

// const handleRecording = action => {
//   try {
//     navigator.mediaDevices.getUserMedia(constraints).then(stream => {
//       switch (action) {
//         case "stop":
//           var tracks = stream.getTracks();
//           document.getElementById("videoUpload").srcObject = null;
//           tracks.forEach(function(track) {
//             track.stop();
//           });
//           stream.getTracks().forEach(function(track) {
//             track.stop();
//           });
//           localStream.getTracks().forEach(function(track) {
//             track.stop();
//           });
//           setAutoplay(false);
//           if (recorder.state === "recording") {
//             console.log("stopping the recorder!!");
//             recorder.stop();

//             // convert saved chunks to blob
//             // const blob = new Blob(chunks, { type: "video/webm" });
//             // console.log(chunks);
//             // //   // generate video url from blob
//             // const videoURL = window.URL.createObjectURL(blob);
//             //   // append videoURL to list of saved videos for rendering
//             // const video = videos.concat([videoURL]); //merge the arrays....
//             // setVideos([...videos.slice(), { videoURL }]);
//             // console.log(blob); // ive got it!!!
//             // console.log(videos); // shows nothing
//             // console.log("videoURL", videoURL);
//             // console.log(video); // shows ["blob:http://localhost:3000/69a82981-c00f-4ca0-aa8a-d252af69da41"]
//             // console.log("recorder.state", recorder.state);
//             // var blob = new Blob(recorder.chunks, {
//             //   type: "video/webm" video/webm;codecs=vp8,opu
//             // });
//             // var videoURL = window.URL.createObjectURL(blob);
//             // console.log(videoURL);
//           } else {
//             return;
//           }
//           return;
//         case "start":
//           setAutoplay(true);
//           document.getElementById("videoUpload").play();
//           localStream = stream;
//           recorder = new MediaRecorder(stream);
//           var video = document.querySelector("video");

//           // wipe old data chunks
//           //chunks = [];
//           recorder.ondataavailable = e => {
//             if (e.data && e.data.size > 0) {
//               video.src = URL.createObjectURL(e.data);
//               // document.getElementById("crazyVideo").src = URL.createObjectURL(
//               //   e.data
//               // );
//               console.log(e.data);
//               chunks.push(e.data);
//               console.log("pushing chunks", chunks);
//             }
//           };

//           video.addEventListener("timeupdate", function() {
//             // don't have set the startTime yet? set it to our currentTime
//             if (!this._startTime) this._startTime = this.currentTime;

//             var playedTime = this.currentTime - this._startTime;

//             if (playedTime >= 30) {
//               handleRecording("stop");
//             }
//           });

//           video.addEventListener("seeking", function() {
//             // reset the timeStart
//             this._startTime = undefined;
//           });

//           recorder.start();
//           return (document.getElementById("videoUpload").srcObject = stream);
//         default:
//           return;
//       }
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
