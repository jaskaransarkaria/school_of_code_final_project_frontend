import React from "react";

const ReviewForm = ({ step, setStep, formValues, submitForm }) => {
  const previous = e => {
    e.preventDefault();
    setStep(step - 1);
  };
  return (
    <>
      <div>
        <ul>
          {Object.keys(formValues).map(item => (
            <li>{formValues[item]}</li>
          ))}
        </ul>
      </div>
      <button onClick={previous}> Previous </button>
      <button onClick={submitForm}> Submit </button>
    </>
  );
};

export default ReviewForm;
