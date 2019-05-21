import React from "react";
import css from "../ApplicationFormPage1/ApplicationFormPage1.module.css";
import SocImage from "../../Images/soc-logo.png";
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
                you will receive and email which will notify you if you have
                successfully made it to the next process.
              </p>
            </div>
            <div className={css.questionBoxContainer}>
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
            </div>
          </div>

          <div className={css.rightContainer}>
            <h1 className={css.applicationFormText}>Application Form</h1>
            <h1 className={css.applicationStepText}>Step 1</h1>
            <div className={css.formContainer}>
              {/* <div className={css.instructionsContainer} /> */}
              <div className={css.firstAndLastNameContainer}>
                <div className={css.firstNameContainer}>
                  <label className={css.firstNameLabel}>First Name</label>
                  <div className={css.firstNameInputContainer}>
                    <input
                      placeholder="Enter first name.."
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
                      placeholder="Enter last name.."
                      className={css.lastName}
                      type="text"
                      name="lastName"
                      onChange={updateField}
                      defaultValue={formValues.lastName}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={css.emailContainer}>
                <label className={css.emailLabel}>Email</label>
                <div className={css.emailInputContainer}>
                  <input
                    placeholder="Enter email.."
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
            <div className={css.nextButtonContainer}>
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

export default FormPart1;
