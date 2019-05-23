import React, { useState, useEffect } from "react";

import FormPart1 from "../ApplicationFormPage1";
import FormPart2 from "../ApplicationFormPage2";
import FormPart3 from "../ApplicationFormPage3";
import FormPart4 from "../ApplicationFormPage4";
import ReviewForm from "../ApplicationFormReviewPage";

import firebase from "firebase";

import { api } from "../../config";

console.log("API", api);

const App = () => {
  const [uid, setUid] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUid(user.uid);
    });
  }, []);

  const [step, setStep] = useState(1);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: null,
    age: null,
    location: "",
    identify: "",
    background: "",
    motivationQuestion: ""
  });
  const [formError, setFormError] = useState({
    inputError: "",
    emailError: ""
  });

  const submitForm = () => {
    fetch(`${api.users}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        firebaseUid: uid,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phoneNumber: formValues.phoneNumber,
        age: formValues.age,
        location: formValues.location,
        identify: formValues.identify,
        background: formValues.background,
        motivationQuestion: formValues.motivationQuestion
      })
    })
      .then(res => res.json())
      .then(data => console.log("DATA", data))
      .catch(err => console.log(err));
  };

  const renderSwitch = () => {
    switch (step) {
      case 1:
        return (
          <div className="formCard">
            <FormPart1
              formValues={formValues}
              setFormValues={setFormValues}
              setStep={setStep}
              step={step}
              formError={formError}
              setFormError={setFormError}
            />
          </div>
        );
      case 2:
        return (
          <div className="formCard">
            <FormPart2
              formValues={formValues}
              setFormValues={setFormValues}
              setStep={setStep}
              step={step}
              formError={formError}
              setFormError={setFormError}
            />
          </div>
        );
      case 3:
        return (
          <div className="formCard">
            <FormPart3
              formValues={formValues}
              setFormValues={setFormValues}
              setStep={setStep}
              step={step}
              formError={formError}
              setFormError={setFormError}
            />
          </div>
        );
      case 4:
        return (
          <div className="formCard">
            <FormPart4
              formValues={formValues}
              setFormValues={setFormValues}
              setStep={setStep}
              step={step}
              formError={formError}
              setFormError={setFormError}
            />
          </div>
        );
      case 5:
        return (
          <div className="formCard">
            <ReviewForm
              formValues={formValues}
              setStep={setStep}
              step={step}
              submitForm={submitForm}
              formError={formError}
              setFormError={setFormError}
            />
          </div>
        );
      default:
        return "default";
    }
  };

  return (
    <>
      <div className="formContainer">
        <div> {renderSwitch()}</div>
      </div>
    </>
  );
};

export default App;
