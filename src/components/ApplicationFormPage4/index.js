import React from "react";

const FormPart4 = ({
  step,
  setStep,
  formValues,
  setFormValues,
  formError,
  setFormError
}) => {
  const review = e => {
    e.preventDefault();
    if (formValues.motivationQuestion === "") {
      setFormError({
        ...formError,
        inputError: "Please complete the question"
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
      <div>
        <label>
          Please explain why you would like to do the School of Code
        </label>
        <input
          type="text"
          name="motivationQuestion"
          onChange={updateField}
          defaultValue={formValues.motivationQuestion}
        />
        <div style={{ color: "red", fontSize: 12 }}>{formError.inputError}</div>
      </div>

      <button onClick={previous}> Previous </button>

      <button onClick={review}> Review </button>
    </>
  );
};

export default FormPart4;
