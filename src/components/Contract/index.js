import React from "react";
import SocImage from "../../Images/soc-logo.png";
import css from "../Contract/Contract.module.css";
function Contract() {
  return (
    <div>
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
                  Please read the School of Code contract and submit or decline
                  your acceptance on to the course.
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
              <h1 className={css.applicationStepText}>Step 1/5</h1>
              <div className={css.formContainer} />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
export default Contract;
