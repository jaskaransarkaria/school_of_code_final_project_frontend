import React from "react";
import css from "../ApplicationFormPage4/ApplicationFormPage4.module.css";
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
            <div className={css.instructionsBox}>Instructions</div>
            <ol className={css.instructionsContainer}>
              <li>Please fill out the form</li>
              <li>There are 5 sections in total which need completed</li>

              <li>
                You will be sent an email notifying if you have made it to the
                next stage
              </li>
            </ol>
          </div>
          <div className={css.rightContainer}>
            <h1 className={css.applicationFormText}>Application Form</h1>
            <h1 className={css.applicationStepText}>Step 4/5</h1>
            <div className={css.formContainer}>
              <div className={css.questionContainer}>
                <label className={css.questionOne}>
                  Please explain why you would like to join the School of Code
                  Bootcamp
                </label>
                <textarea
                  className={css.inputBox}
                  type="text"
                  name="motivationQuestion"
                  onChange={updateField}
                  defaultValue={formValues.motivationQuestion}
                />
              </div>

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
