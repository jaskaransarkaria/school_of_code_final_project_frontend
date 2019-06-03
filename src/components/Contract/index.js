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
              <div className={css.instructionsBox}>Instructions</div>
              <ol className={css.instructionsContainer}>
                <li>Please complete the contract form</li>
                <li>
                  Please read through the terms and conditions and either accept
                  or decline a place on the school of code bootcamp
                </li>

                {/* <li>
                  You will be sent an email notifying ...
                </li> */}
              </ol>
            </div>

            <div className={css.rightContainer}>
              <h1 className={css.contractText}>School of Code Contract</h1>

              <div className={css.formContainer}>
                <div className={css.termsAndConditionsContainer}>
                  <span
                    style={{
                      color: "#555555",
                      textTransform: "uppercase",
                      fontSize: "1.3em"
                    }}
                  >
                    Terms and Conditions
                  </span>
                  <br />
                  <span
                    style={{
                      color: "#555555",
                      fontSize: "1em"
                    }}
                  >
                    We will be asking you to sign your agreement to the
                    following points:
                  </span>
                  <hr className={css.horizontalLine} />

                  <div className={css.textContainer}>
                    <div className={css.paragraphOne}>
                      The success of the bootcamp is based on mutual trust.
                      We'll do our best to help you and in return we need you to
                      work hard and be eager to learn. As a result there will be
                      regular meetings to ensure everyone is putting effort in
                      and is happy with the way the course is going. This will
                      help us all work together in the most efficient way
                      possible.
                    </div>
                    <br />
                    <div className={css.paragraphTwo}>
                      Things that would cause concern for us would include:
                    </div>
                    <br />
                    <span>*Arriving late to the course or key events.</span>
                    <br />
                    <span>*Missing days on the course or key events.</span>
                    <br />
                    <span>*Missing deadlines for projects.</span>
                    <br />
                    <span>*Aggressive behavious.</span>
                    <br />
                    <span>*General bad attitude/anti-social behaviour.</span>
                    <br />
                    <span>*Negative response to feedback.</span>
                    <br />
                    <span>
                      *Disrespecting fellow bootcampers, School of Code staff,
                      or the wider community.
                    </span>
                    <br />
                    <span>
                      *Not holding yourself to the standards and values of the
                      School of Code.
                    </span>
                    <br />
                    <div className={css.paragraphThree}>
                      Please read the following community Code of Conduct for
                      what we expect of behaviour and how to treat one another
                      on the Bootcamp:
                    </div>
                    <div className={css.paragraphFour}>
                      We will be asking for your consent to be photographed,
                      filmed and interviewed over the course of the 16 weeks. We
                      want you to be the ambassadors for the School of Code and
                      as such hope to document your journeys throughout the
                      course. If you have any issues with this please contact
                      us. Finally to help our Bootcamp model stay free to
                      participants, we help you find a job through our community
                      and our exclusive recruitment partners. When we
                      successfully place someone, we arrange a recruitment fee.
                      We ask that you help us achieve this through engaging with
                      our recruitment partners. Our focus is to try and secure a
                      position for everyone within 3 months after graduation.
                    </div>
                  </div>
                </div>
                <div className={css.termsContainerText}>
                  <label style={{ color: "black" }}>
                    Terms <span style={{ color: "red" }}>*</span>
                    &nbsp;&nbsp;&nbsp;
                  </label>

                  <span style={{ color: "black" }}>
                    I agree to the terms and agreement.
                    <input type="checkbox" required />
                  </span>
                </div>
                <div className={css.buttonContainer}>
                  <button className={css.acceptButton}>Accept</button>
                  <button className={css.declineButton}>Decline</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
export default Contract;
