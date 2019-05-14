import React from "react";
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
      <div>
        <label>How do you identify?</label>
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

      <div>
        <label>Which best describes your current situation</label>
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
      <div style={{ color: "red", fontSize: 12 }}>{formError.inputError}</div>
      <button onClick={previous}> Previous </button>
      <button onClick={saveAndContinue}> Save and Continue </button>
    </>
  );
};

export default FormPart3;
