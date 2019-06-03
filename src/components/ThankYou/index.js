import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SocImage from "../../Images/soc-logo.png";
import css from "../ThankYou/ThankYou.module.css";
import TickImage from "../../Images/checked.svg";

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/applicant-dashboard" />;
    }
  };
  render() {
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
                  Please note we receive a high number of applicants so it may
                  take up to a few weeks to find out the outcome, so we ask you
                  to be patient. If you receive an acceptance email you will
                  then be able to log back in and will automatically be taken to
                  the next stage.
                </p>
              </div>
            </div>

            <div className={css.rightContainer}>
              <div className={css.rightContentWrapper}>
                <img
                  className={css.tickImage}
                  src={TickImage}
                  alt="green tick icon"
                />

                <h1 className={css.thanksMessage}>
                  Thanks for your submission!
                </h1>
                <p className={css.subTextOne}>
                  You will receive an email within the next few weeks
                </p>

                <>
                  {this.renderRedirect()}
                  <button
                    className={css.signOutButton}
                    onClick={this.setRedirect}
                  >
                    Bootcamper Dashboard
                  </button>
                </>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ThankYou;
