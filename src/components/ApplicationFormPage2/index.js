import React from "react";
import css from "../ApplicationFormPage2/ApplicationFormPage2.module.css";
const FormPart2 = ({
  step,
  setStep,
  formValues,
  setFormValues,
  formError,
  setFormError
}) => {
  const saveAndContinue = e => {
    e.preventDefault();

    if (
      !Boolean(formValues.phoneNumber) ||
      !Boolean(formValues.age) ||
      formValues.location === ""
    ) {
      setFormError({
        ...formError,
        inputError: "Please complete all the fields"
      });
      return;
    }
    setFormError({
      ...formError,
      inputError: ""
    });
    setStep(step + 1);
  };
  const previous = e => {
    e.preventDefault();
    setStep(step - 1);
  };

  const updateField = e => {
    if (e.target.type === "number") {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
      });
    } else
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value
      });
  };

  return (
    <>
      <h1>
        Application Form: <span style={{ color: "black" }}>Step 2 of 5</span>
      </h1>
      <div className={css.formContainer}>
        <div>
          <label>Phone</label>
          <input
            className={css.phone}
            type="number"
            name="phoneNumber"
            onChange={updateField}
            defaultValue={formValues.phoneNumber}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            className={css.age}
            type="number"
            name="age"
            onChange={updateField}
            defaultValue={formValues.age}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            className={css.location}
            type="text"
            name="location"
            onChange={updateField}
            defaultValue={formValues.location}
          />
        </div>
        <div style={{ color: "red", fontSize: 12 }}>
          {" "}
          {formError.inputError}
        </div>
        <div style={{ color: "red", fontSize: 12 }}>
          {" "}
          {formError.numberError}
        </div>

        <button onClick={previous} className={css.previousButton}>
          {" "}
          Previous{" "}
        </button>
        <button onClick={saveAndContinue} className={css.saveAndContinueButton}>
          {" "}
          Save and Continue{" "}
        </button>
      </div>
    </>
  );
};

export default FormPart2;
