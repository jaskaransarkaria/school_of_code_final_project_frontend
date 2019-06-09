import React from "react";
import css from "../ApplicationFormPage3/ApplicationFormPage3.module.css";
import SocImage from "../../Images/soc-logo.png";
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

    if (formValues.background === "" || formValues.identify === "") {
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
            {/* <div className={css.instructionsBox}>Instructions</div> */}
            <ol className={css.instructionsContainer}>
              <li>Please complete all five sections of the form.</li>

              <li>
                You will receive an email notifying you the outcome of the first
                stage within a few weeks!
              </li>
            </ol>
          </div>
          <div className={css.rightContainer}>
            <h1 className={css.applicationStepText}>Step 3/5</h1>
            <div className={css.formContainer}>
              <div className={css.identifyContainer}>
                <label className={css.identifyText}>How do you identify?</label>
                <br />
                {identityAnswers.map(item => (
                  <>
                    <div className={css.questionOneContainer}>
                      <input
                        type="radio"
                        name="identify"
                        value={item}
                        onChange={updateField}
                        checked={
                          formValues.identify === item ? "checked" : null
                        }
                        defaultValue={formValues.identify}
                      />
                      {item}
                    </div>
                  </>
                ))}
              </div>

              <div className={css.situationContainer}>
                <label className={css.situationText}>
                  Which best describes your current situation?
                </label>
                <br />
                {situationAnswers.map(item => (
                  <>
                    <div className={css.questionTwoContainer}>
                      <input
                        type="radio"
                        name="background"
                        value={item}
                        onChange={updateField}
                        checked={
                          formValues.background === item ? "checked" : null
                        }
                        defaultValue={formValues.background}
                      />
                      {item}
                    </div>
                  </>
                ))}
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

              <button onClick={saveAndContinue} className={css.nextButton}>
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

export default FormPart3;
