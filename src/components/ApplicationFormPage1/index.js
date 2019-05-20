import React from "react";
import css from "../ApplicationFormPage1/ApplicationFormPage1.module.css";
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
      <div className={css.header}>
        <h1>Application Form</h1> <h1>Step 1 of 5</h1>
      </div>
      <div className={css.wrapper}>
        <div className={css.formContainer}>
          <div className={css.firstAndLastNameContainer}>
            <label>First Name</label>

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

            <div className={css.lastNameContainer}>
              <label>Last Name</label>

              <div className={css.lastNameInputContainer}>
                <input
                  placeholder="Enter Last name.."
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
            <label>Email</label>
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
          <div className={css.nextButton}>
            <button onClick={saveAndContinue} className={css.nextInput}>
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
