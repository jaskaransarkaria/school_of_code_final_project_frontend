import React from "react";
import SocImage from "../../Images/soc-logo.png";
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
            <h1 className={css.applicationStepText}>Step 2/5</h1>
            <div className={css.formContainer}>
              {/* <div className={css.instructionsContainer} /> */}

              <div className={css.phoneContainer}>
                <label className={css.phoneLabel}>Phone</label>
                <div className={css.phoneInputContainer}>
                  <input
                    placeholder="Enter phone*"
                    className={css.phone}
                    type="number"
                    name="phoneNumber"
                    onChange={updateField}
                    defaultValue={formValues.phoneNumber}
                  />
                </div>
              </div>

              <div className={css.ageContainer}>
                <label className={css.ageLabel}>Age</label>

                <div className={css.ageInputContainer}>
                  <input
                    placeholder="Enter age*"
                    className={css.age}
                    type="number"
                    name="age"
                    onChange={updateField}
                    defaultValue={formValues.age}
                  />
                </div>
              </div>

              <div className={css.locationContainer}>
                <label className={css.locationLabel}>Location</label>
                <div className={css.locationInputContainer}>
                  <input
                    placeholder="Enter location*"
                    className={css.location}
                    type="text"
                    name="location"
                    onChange={updateField}
                    defaultValue={formValues.location}
                  />
                </div>
              </div>
              <div style={{ color: "red", fontSize: 12 }}>
                {" "}
                {formError.inputError}
              </div>
              <div style={{ color: "red", fontSize: 12 }}>
                {" "}
                {formError.emailError}
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

export default FormPart2;
