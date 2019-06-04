import css from "../VideoUpload/VideoUpload.module.css";
import React, { useState, useEffect, useRef } from "react";
import AWS from "aws-sdk";
import TranscribeService from "aws-sdk/clients/transcribeservice";
import { aws } from "../../config";
import shortid from "shortid";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "firebase";
import { api } from "../../config";
import ThankYouSubmission from "../ThankYouSubmission";

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: `${aws.key_id}`,
  secretAccessKey: `${aws.secret_key}`
});

const s3 = new AWS.S3();
var transcribeservice = new TranscribeService({ apiVersion: "2017-10-26" });

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

const interviewQuestions = [
  { question: "Tell us about yourself", poster: "/q1_poster.png" },
  { question: "Why do you want to learn to code?", poster: "/q2_poster.png" },
  { question: "What drives you?", poster: "/q3_poster.png" },
  {
    question: "Why do you want to join School of Code?",
    poster: "/q4_poster.png"
  },
  {
    question: "Explain something complex in simple terms",
    poster: "/q5_poster.png"
  }
];

// send the video to the server
// check video and audio are available, if not post alert.

const VideoUpload = () => {
  const [firebaseUid, setFirebaseUid] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [src, setSrc] = useState();
  const [allVideoLinks, setAllVideoLinks] = useState([]);
  const [autoplay, setAutoplay] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [reRecord, setReRecord] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    // feature detction - check existance of a navigator
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;
  }, []);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setFirebaseUid(user.uid);
        console.log(user.uid);
      } else {
        console.log("no user");
      }
    });
  }, []);

  const uploadVideosToDb = () => {
    fetch(`${api.applications}/video-upload`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        firebaseUid: firebaseUid,
        videoApplicationData: [...allVideoLinks.map(vid => ({ videoUrl: vid }))]
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(_ => console.log("sent", allVideoLinks))
      .then(setRedirect(true))
      .catch(err => console.error(err));
  };

  const transcribeVideo = fileToTranslate => {
    return new Promise((res, rej) => {
      const jobName = firebaseUid + `_Q${questionCounter + 1}`;
      let params = {
        LanguageCode: "en-GB",
        Media: { MediaFileUri: fileToTranslate },
        MediaFormat: "mp4",
        TranscriptionJobName: jobName,
        OutputBucketName: "school-of-code-applicant-videos"
      };
      transcribeservice.startTranscriptionJob(params, function(err, data) {
        if (err) {
          console.log("error from transcribe start", err, err.stack);
        } else {
          console.log("TRANSCRIPT DATA", data);
          res(data);
        }
      });
    });
  };

  const uploadToAWS = blob => {
    new Promise((resolve, reject) => {
      const fileName = shortid.generate();
      var params = {
        Bucket: "school-of-code-applicant-videos",
        Key: `${fileName}.mp4`,
        Body: blob,
        ContentType: "video/mp4"
      };

      s3.upload(params, function(err, data) {
        if (err) {
          console.error(err);
        } else {
          //setSrc(data.Location);
          setAllVideoLinks([...allVideoLinks, data.Location]);
          transcribeVideo(data.Location);
          setAutoplay(false);
          resolve(data);
        }
      });
    });
  };

  const hasGetUserMedia = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(function(devices) {
        devices.forEach(item => {
          //console.log(item);
          if (item.kind === "videoinput") {
            setHasVideo(true);
          } else if (item.kind === "audioinput") {
            setHasAudio(true);
          }
        });
      })
      .catch(function(err) {
        console.log("err caught in Video upload component");
        console.log(err.name + ": " + err.message);
      });
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    // the parameter passed into getUserMedia() is an object eg. {video: true, audio: true}
  };

  if (hasGetUserMedia()) {
    console.log(`video ${hasVideo}. audio ${hasAudio}`);
  }

  const handleRecording = action => {
    try {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        switch (action) {
          case "stop":
            video.current.pause();
            var tracks = stream.getTracks();
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
            video.current.load();
            setSrc(null);
            setAutoplay(false);
            if (recorder.state === "recording") {
              recorder.stop();
              setIsRecording(false);
            } else {
              return;
            }
            return;
          case "start":
            setAutoplay(true);

            video.current.play(); // use a ref here
            localStream = stream;
            var options = { mimeType: "video/webm;codecs=h264" };
            recorder = new MediaRecorder(stream, options);
            setIsRecording(true);
            recorder.ondataavailable = e => {
              if (e.data && e.data.size > 0) {
                video.current.src = URL.createObjectURL(e.data);
                setChunks([e.data]); // overwriting chunks
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

  // getUserMedia() can only be called from an HTTPS URL, localhost or a file:// URL.
  // Otherwise, the promise from the call will be rejected. getUserMedia() also won't work for cross origin
  // calls from iframes

  return !redirect ? (
    <div style={{ textAlign: "center" }}>
      {console.log("all videos", allVideoLinks)}
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
              <div className={css.videoContainer}>
                <video
                  id={css.videoUpload}
                  ref={video}
                  preload="none"
                  autoPlay={autoplay}
                  display="block"
                  poster={item.poster}
                  key={src}
                >
                  <source src={src} />
                </video>
                <br />
                <div className={css.buttonContainer}>
                  <div className={css.leftContainer}>
                    <img
                      src="/record.png"
                      alt="record video"
                      className={css.startRecording}
                      onClick={() => {
                        // check if they have a microphone and webcam here

                        hasGetUserMedia();
                        if (!hasVideo || !hasAudio) {
                          alert(
                            "Your device needs a microphone and a webcam your device is missing one"
                          );
                          return;
                        } else {
                          handleRecording("start");
                        }
                      }}
                    />

                    <img
                      src="stop.png"
                      alt="stop recording"
                      className={css.stopRecording}
                      onClick={() => {
                        if (localStream) {
                          handleRecording("stop");
                          setReRecord(true);
                        }
                      }}
                    />
                    <img
                      src="play.png"
                      alt="play recording"
                      className={css.playRecording}
                      onClick={() => {
                        video.current.play();
                      }}
                    />
                    {reRecord && (
                      <p
                        style={{
                          color: "red",
                          verticalAlign: "text-bottom",
                          textAlign: "center",
                          fontSize: "30px"
                        }}
                      >
                        Hit record, if your not happy with your first take.
                      </p>
                    )}
                  </div>
                  {!isLoading &&
                    (questionCounter + 1 < interviewQuestions.length ? (
                      <img
                        src="checked.png"
                        alt="submit video"
                        className={css.submitRecording}
                        onClick={() => {
                          handleRecording("stop");
                          const blob = new Blob(chunks, {
                            type: "video/mp4"
                          });

                          console.log(blob);
                          if (blob.size > 0 && !isRecording) {
                            // upload to datbase
                            setIsLoading(true);
                            uploadToAWS(blob)
                              .then(_ => setIsLoading(false))
                              .then(_ => {
                                setQuestionCounter(questionCounter + 1);
                                setReRecord(false);
                              });
                          }
                        }}
                      />
                    ) : (
                      <img
                        src="checked.png"
                        alt="submit video"
                        className={css.submitRecording}
                        onClick={() => {
                          const blob = new Blob(chunks, { type: "video/mp4" });
                          console.log(blob);
                          if (blob.size > 0 && !isRecording) {
                            setIsLoading(true);
                            uploadToAWS(blob)
                              .then(_ => setShowVideo(false))
                              .catch(err => console.error(err))
                              .finally(_ => setIsLoading(false));
                            // add a confirm upload button which does the upload to s3
                          }
                          return;
                        }}
                      />
                    ))}
                  {isLoading && <CircularProgress color="inherit" />}
                </div>
              </div>
            );
          })}
      {!showVideo && !redirect && (
        <button
          onClick={() => {
            uploadVideosToDb();
            // add re routing link here
          }}
        >
          confirm upload
        </button>
      )}
    </div>
  ) : (
    <ThankYouSubmission />
  );
};

export default VideoUpload;
