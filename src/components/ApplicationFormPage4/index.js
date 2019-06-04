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
            <h1 className={css.applicationFormText}>Application Form</h1>
            <div className={css.socImageContainer}>
              <img
                src={SocImage}
                className={css.socImage}
                alt="School of code logo"
              />
            </div>
            <div className={css.instructionsBox}>Instructions</div>
            <ol className={css.instructionsContainer}>
              <li>Please complete all five sections of the form</li>

              <li>
                You will receive an email notifying you if have made it to the
                next stage!
              </li>
            </ol>
          </div>
          <div className={css.rightContainer}>
            <h1 className={css.applicationStepText}>Step 4/5</h1>
            <div className={css.formContainer}>
              <div className={css.questionContainer}>
                <label className={css.questionOne}>
                  <div style={{ textAlign: "center" }}>
                    Please explain why you would like to join
                  </div>

                  <div style={{ textAlign: "center" }}>
                    the School of Code Bootcamp
                  </div>
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

              <button onClick={review} className={css.nextButton}>
                {" "}
                Next{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPart4;
