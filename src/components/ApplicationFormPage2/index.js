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
                you will receive an email which will notify you if you have
                successfully made it to the next stage. You will then be able to
                log back in which will take you to the video interview stage.
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
            <h1 className={css.applicationStepText}>Step 2/5</h1>
            <div className={css.formContainer}>
              {/* <div className={css.instructionsContainer} /> */}
              <div className={css.phoneAndAgeContainer}>
                <div className={css.phoneContainer}>
                  <label className={css.phoneLabel}>Phone</label>
                  <div className={css.phoneInputContainer}>
                    <input
                      placeholder="Enter phone..."
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
                      placeholder="Enter age..."
                      className={css.age}
                      type="number"
                      name="age"
                      onChange={updateField}
                      defaultValue={formValues.age}
                    />
                  </div>
                </div>
              </div>
              <div className={css.locationContainer}>
                <label className={css.locationLabel}>Location</label>
                <div className={css.locationInputContainer}>
                  <input
                    placeholder="Enter location..."
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
              <div className={css.nextButtonContainer}>
                <button onClick={saveAndContinue} className={css.nextButton}>
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

export default FormPart2;
