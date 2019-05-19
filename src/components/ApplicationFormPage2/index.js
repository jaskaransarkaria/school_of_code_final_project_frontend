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
      <div className={css.header}>
        <h1>Application Form</h1> <h1>Step 2 of 5</h1>
      </div>
      <div className={css.wrapper}>
        <div className={css.formContainer}>
          <br />
          <div className={css.phoneContainer}>
            <label>Phone</label>
            <input
              placeholder="Enter phone..."
              className={css.phone}
              type="number"
              name="phoneNumber"
              onChange={updateField}
              defaultValue={formValues.phoneNumber}
            />
          </div>
          <div className={css.ageContainer}>
            <label>Age</label>
            <input
              placeholder="Enter age..."
              className={css.age}
              type="number"
              name="age"
              onChange={updateField}
              defaultValue={formValues.age}
            />
          </div>
          <div className={css.locationContainer}>
            <label>Location</label>
            <input
              placeholder="Enter location..."
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
          <div className={css.buttonContainer}>
            <button onClick={previous} className={css.previousButton}>
              {" "}
              Previous{" "}
            </button>
            <button
              onClick={saveAndContinue}
              className={css.saveAndContinueButton}
            >
              {" "}
              Save and Continue{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPart2;
