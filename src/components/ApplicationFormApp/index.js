import React, { useState } from "react";

import FormPart1 from "../ApplicationFormPage1";
import FormPart2 from "../ApplicationFormPage2";
import FormPart3 from "../ApplicationFormPage3";
import FormPart4 from "../ApplicationFormPage4";
import ReviewForm from "../ApplicationFormReviewPage";

import "./App.css";

const App = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: null,
    age: null,
    location: "",
    identify: "",
    situation: "",
    motivationQuestion: ""
  });
  const [formError, setFormError] = useState({
    inputError: "",
    emailError: ""
  });

  const submitForm = () => {
    // Link up to POST request
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
      <h1> School of Code Application Form </h1>
      <div className="formContainer">
        <div> {renderSwitch()}</div>
      </div>
    </>
  );
};

export default App;
