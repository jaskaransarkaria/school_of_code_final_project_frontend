import React from "react";
import css from "../ApplicationFormReviewPage/ApplicationFormReviewPage.module.css";
const ReviewForm = ({ step, setStep, formValues, submitForm }) => {
  const previous = e => {
    e.preventDefault();
    setStep(step - 1);
  };
  return (
    <>
      <h1>
        Application Form: <span style={{ color: "black" }}>Step 5 of 5</span>
      </h1>
      <h2>Review Information</h2>
      <div className={css.container}>
        <ul>
          {Object.keys(formValues).map(item => (
            <li>{formValues[item]}</li>
          ))}
        </ul>

        <button onClick={previous}> Previous </button>
        <button onClick={submitForm}> Submit </button>
      </div>
    </>
  );
};

export default ReviewForm;
