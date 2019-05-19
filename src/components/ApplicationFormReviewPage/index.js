import React from "react";
import css from "../ApplicationFormReviewPage/ApplicationFormReviewPage.module.css";
const ReviewForm = ({ step, setStep, formValues, submitForm }) => {
  const previous = e => {
    e.preventDefault();
    setStep(step - 1);
  };
  return (
    <>
      <div className={css.header}>
        <h1>Application Form</h1> <h1>Step 5 of 5</h1>
      </div>
      <h2>Review Information</h2>
      <div className={css.wrapper}>
        <div className={css.formContainer}>
          <ul>
            {Object.keys(formValues).map(item => (
              <li>{formValues[item]}</li>
            ))}
          </ul>

          <div className={css.buttons}>
            <button onClick={previous} className={css.previousButton}>
              {" "}
              Previous{" "}
            </button>
            <button onClick={submitForm} className={css.submitButton}>
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
