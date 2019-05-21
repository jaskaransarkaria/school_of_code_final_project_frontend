import React from "react";
import css from "../ApplicationFormPage3/ApplicationFormPage3.module.css";
import SocImage from "../../Images/soc-logo.png";

const FormPart4 = ({
  step,
  setStep,
  formValues,
  setFormValues,
  formError,
  setFormError
}) => {
  const review = e => {
    e.preventDefault();
    if (formValues.motivationQuestion === "") {
      setFormError({
        ...formError,
        inputError: "Please complete the question"
      });
      return;
    }
    setFormError({
      ...formError,
      inputError: "",
      emailError: ""
    });
    setStep(step + 1);
  };

  const previous = e => {
    e.preventDefault();
    setStep(step - 1);
    setFormError({
      ...formError,
      inputError: ""
    });
  };

  const updateField = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
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
                you will receive and email which will notify you if you have
                successfully made it to the next process.
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
            <h1 className={css.applicationStepText}>Step 4</h1>
            <div className={css.formContainer}>
              <div className={css.question}>
                <label>
                  Please explain why you would like to do the School of Code
                </label>
              </div>
              <input
                className={css.input}
                type="text"
                name="motivationQuestion"
                onChange={updateField}
                defaultValue={formValues.motivationQuestion}
              />
              <div style={{ color: "red", fontSize: 12 }}>
                {formError.inputError}
              </div>
            </div>
            <div className={css.previousAndNextContainer}>
              <button onClick={previous} className={css.previousButton}>
                {" "}
                Previous{" "}
              </button>
              <div className={css.nextButtonContainer}>
                <button onClick={review} className={css.nextButton}>
                  {" "}
                  Next{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPart4;
