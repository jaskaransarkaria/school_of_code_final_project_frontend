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
                Please make sure that the information you have submitted is
                correct before submitting the application form. We will review
                your information and notify you by email if you have been
                successful getting through to the online video interview stage.
                You will then be able to log back in and access the video
                interview stage area.
              </p>
            </div>
            {/* <div className={css.questionBoxContainer}>
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
            </div> */}
          </div>
          <div className={css.rightContainer}>
            <h1 className={css.applicationFormText}>Application Form</h1>
            <h1 className={css.applicationStepText}>
              Please review your information
            </h1>
            <div className={css.formContainer}>
              <div>
                <ul>
                  {Object.keys(formValues).map(item => (
                    <>
                      {/* <li>{item}</li> */}
                      <li>{formValues[item]}</li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
            <div className={css.buttons}>
              <button onClick={previous} className={css.previousButton}>
                {" "}
                Previous{" "}
              </button>
              <button onClick={() => submitForm()} className={css.submitButton}>
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
