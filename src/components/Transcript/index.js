import React, { useState, useEffect } from "react";
import TranscribeService from "aws-sdk/clients/transcribeservice";
import { aws } from "../../config";
import AWS from "aws-sdk";

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: `${aws.key_id}`,
  secretAccessKey: `${aws.secret_key}`
});

var transcribeservice = new TranscribeService({ apiVersion: "2017-10-26" });

const Transcript = ({ uid, questionNumber }) => {
  const [transcript, setTranscript] = useState("");

  const getTranscript = () => {
    return new Promise((res, rej) => {
      const params = { TranscriptionJobName: uid + `_Q${questionNumber}` };
      transcribeservice.getTranscriptionJob(
        params,
        function(err, data) {
          if (err) {
            console.log("error getting transcript", err, err.stack);
          } // an error occurred
          else {
            console.log(`transcript data ${uid}_Q${questionNumber}`, data);
          }
          //setTranscript(data)
        } // successful response
      );
    });
  };

  useEffect(() => {
    getTranscript();
  });

  return <p>{transcript}</p>;
};

export default Transcript;
