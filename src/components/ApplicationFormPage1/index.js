import React from "react";
import css from "../ApplicationFormPage1/ApplicationFormPage1.module.css";
import SocImage from "../../Images/soc-logo.png";
import ufoImage from "../../Images/ufo.svg";
const FormPart1 = ({
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
      formValues.firstName === "" ||
      formValues.lastName === "" ||
      formValues.email === ""
    ) {
      setFormError({
        ...formError,
        inputError: "Please complete all the fields"
      });
      return;
    } else if (
      !formValues.email.includes("@") ||
      !formValues.email.includes(".")
    ) {
      setFormError({
        ...formError,
        emailError: "Please enter a valid email address",
        inputError: ""
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
            <h1 className={css.applicationStepText}>Step 1/5</h1>
            <div className={css.formContainer}>
              {/* <div className={css.instructionsContainer} /> */}

              <div className={css.firstNameContainer}>
                <label className={css.firstNameLabel}>First Name</label>
                <div className={css.firstNameInputContainer}>
                  <input
                    placeholder="Enter first name*"
                    className={css.firstName}
                    type="text"
                    name="firstName"
                    onChange={updateField}
                    defaultValue={formValues.firstName}
                    required
                  />
                </div>
              </div>

              <div className={css.lastNameContainer}>
                <label className={css.lastNameLabel}>Last Name</label>

                <div className={css.lastNameInputContainer}>
                  <input
                    placeholder="Enter last name*"
                    className={css.lastName}
                    type="text"
                    name="lastName"
                    onChange={updateField}
                    defaultValue={formValues.lastName}
                    required
                  />
                </div>
              </div>

              <div className={css.emailContainer}>
                <label className={css.emailLabel}>Email</label>
                <div className={css.emailInputContainer}>
                  <input
                    placeholder="Enter email*"
                    className={css.email}
                    type="email"
                    name="email"
                    onChange={updateField}
                    defaultValue={formValues.email}
                    required
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

            <button onClick={saveAndContinue} className={css.nextButton}>
              {" "}
              Next{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPart1;
