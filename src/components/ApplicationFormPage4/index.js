import React from "react";
import css from "../ApplicationFormPage4/ApplicationFormPage4.module.css";
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
      <div className={css.header}>
        <h1>Application Form</h1> <h1>Step 4 of 5</h1>
      </div>
      <div className={css.wrapper}>
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

          <button onClick={previous} className={css.previousButton}>
            {" "}
            Previous{" "}
          </button>

          <button onClick={review} className={css.reviewButton}>
            {" "}
            Review{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default FormPart4;
