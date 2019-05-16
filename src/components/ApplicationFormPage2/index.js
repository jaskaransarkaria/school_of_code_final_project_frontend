import React from "react";

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
      <div>
        <label>Phone</label>
        <input
          type="number"
          name="phoneNumber"
          onChange={updateField}
          defaultValue={formValues.phoneNumber}
        />
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          onChange={updateField}
          defaultValue={formValues.age}
        />
      </div>
      <div>
        <label>Location</label>
        <input
          type="text"
          name="location"
          onChange={updateField}
          defaultValue={formValues.location}
        />
      </div>
      <div style={{ color: "red", fontSize: 12 }}> {formError.inputError}</div>
      <div style={{ color: "red", fontSize: 12 }}> {formError.numberError}</div>

      <button onClick={previous}> Previous </button>
      <button onClick={saveAndContinue}> Save and Continue </button>
    </>
  );
};

export default FormPart2;
