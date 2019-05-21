import React from "react";
import css from "../ApplicationFormPage3/ApplicationFormPage3.module.css";
const identityAnswers = ["Male", "Female", "Non-Binary", "Prefer no to say"];
const situationAnswers = [
  "Finishing School",
  "Graduating from university",
  "Finishing/finished service in the military",
  "Employed but looking for a career change",
  "Unemployed and looking for work",
  "Other"
];

const FormPart3 = ({
  step,
  setStep,
  formValues,
  setFormValues,
  formError,
  setFormError
}) => {
  const saveAndContinue = e => {
    e.preventDefault();

    if (formValues.situation === "" || formValues.identify === "") {
      console.log("error");
      setFormError({
        ...formError,
        inputError: "Please answer all the questions"
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
        <h1>Application Form</h1> <h1>Step 3 of 5</h1>
      </div>
      <div className={css.wrapper}>
        <div className={css.container}>
          <div className={css.identifyContainer}>
            <label>How do you identify?</label>
            <br />
            {identityAnswers.map(item => (
              <>
                <input
                  type="radio"
                  name="identify"
                  value={item}
                  onChange={updateField}
                  checked={formValues.identify === item ? "checked" : null}
                  defaultValue={formValues.identify}
                />
                {item}
              </>
            ))}
          </div>

          <div className={css.situationContainer}>
            <label>Which best describes your current situation</label>
            <br />
            {situationAnswers.map(item => (
              <>
                <input
                  type="radio"
                  name="situation"
                  value={item}
                  onChange={updateField}
                  checked={formValues.situation === item ? "checked" : null}
                  defaultValue={formValues.situation}
                />
                {item}
              </>
            ))}
          </div>
          <div style={{ color: "red", fontSize: 12 }}>
            {formError.inputError}
          </div>
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
    </>
  );
};

export default FormPart3;
