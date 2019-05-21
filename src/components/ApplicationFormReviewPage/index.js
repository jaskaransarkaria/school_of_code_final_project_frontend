import React from "react";
import css from "../ApplicationFormReviewPage/ApplicationFormReviewPage.module.css";
import SocImage from "../../Images/soc-logo.png";
const ReviewForm = ({ step, setStep, formValues, submitForm }) => {
  const previous = e => {
    e.preventDefault();
    setStep(step - 1);
  };
  return (
    <>
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.leftContainer}>
            <div className={css.socImageContainer}>
              <img
                src={SocImage}
                className={css.socImage}
                alt="School of code logo"
              />
            </div>
            <div className={css.instructionsContainer}>
              <h2 className={css.instructionsText}>Instructions</h2>
              <br />
              <p className={css.instructionsParagraph}>
                Please fill out steps 1-5 of the application form so we can get
                to know more about you. Once you have submitted the information
                you will receive an email which will notify you if you have
                successfully made it to the next stage.
              </p>
            </div>
            <div className={css.questionBoxContainer}>
              <div className={css.selectdiv}>
                <label>
                  <select>
                    <option selected>-- Questions --</option>
                    <option>Step 1 of 5</option>
                    <option>Step 2 of 5</option>
                    <option>Step 3 of 5</option>
                    <option>Step 4 of 5</option>
                    <option>Step 5 of 5</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
          <div className={css.rightContainer}>
            <h1 className={css.applicationFormText}>Application Form</h1>
            <h1 className={css.applicationStepText}>Step 5</h1>
            <div className={css.formContainer}>
              <ul>
                {Object.keys(formValues).map(item => (
                  <li>{formValues[item]}</li>
                ))}
              </ul>
            </div>
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
      </div>
    </>
  );
};

export default ReviewForm;
