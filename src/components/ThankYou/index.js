import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SocImage from "../../Images/soc-logo.png";
import css from "../ThankYou/ThankYou.module.css";
import TickImage from "../../Images/checked.png";

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
              <ol className={css.instructionsContainer}>
                <li>
                  Please be patient receiving a response as we process a high
                  number of applicants.
                </li>

                <li>
                  You will receive an email notifying if you have made it to the
                  next stage!
                </li>
              </ol>
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
