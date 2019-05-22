import React, { useState, useReducer, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import css from "./FormRating.module.css";
import { api } from "../../config";

// GET for draw in users
// POST users on accept/ reject

function FormRating(props) {
  const [showSpecificApplications, setShowSpecificApplications] = useState([]);
  const [searchedApplications, setSearchedApplications] = useState([]);
  const [input, setInput] = useState("");
  const [applicants, setApplicants] = useState([
    {
      firstName: "Matt",
      lastName: "Wendzina",
      email: "mattwendzina@hotmail.com",
      phoneNumber: 7575557979,
      age: 36,
      location: "Coventry",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Because SoC Rocks",
      passForm: "pending",
      id: 0
    },
    {
      firstName: "Kathyrn",
      lastName: "Burgess",
      email: "kathryn@burgess.com",
      phoneNumber: 909812471,
      age: 46,
      location: "London",
      identify: "Female",
      background: "Employed",
      motivationQuestion: "To learn to code",
      passForm: "pending",
      id: 1
    },
    {
      firstName: "Aidan",
      lastName: "Walker",
      email: "aidan@walker.com",
      phoneNumber: 298124890,
      age: 24,
      location: "Birmingham",
      identify: "Male",
      background: "Student",
      motivationQuestion: "To nail coding",
      passForm: "pending",
      id: 2
    },
    {
      firstName: "Jazz",
      lastName: "Sarkaria",
      email: "jazz@sakaria.com",
      phoneNumber: 1209832481,
      age: 29,
      location: "Birmingham",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Master Javascript",
      passForm: "pending",
      id: 3
    },
    {
      firstName: "Oliva",
      lastName: "Winteringham",
      email: "oliva@winteringham.com",
      phoneNumber: 7575557979,
      age: 36,
      location: "Coventry",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Because SoC Rocks",
      passForm: "pending",
      id: 4
    },
    {
      firstName: "Alex",
      lastName: "Wiley",
      email: "alex@wiley.com",
      phoneNumber: 909812471,
      age: 46,
      location: "London",
      identify: "Female",
      background: "Employed",
      motivationQuestion: "To learn to code",
      passForm: "pending",
      id: 5
    },
    {
      firstName: "David",
      lastName: "Ashcroft",
      email: "david@ashcroft.com",
      phoneNumber: 298124890,
      age: 24,
      location: "Birmingham",
      identify: "Male",
      background: "Student",
      motivationQuestion: "To nail coding",
      passForm: "pending",
      id: 6
    },
    {
      firstName: "Bukola",
      lastName: "Java",
      email: "bukola@java.com",
      phoneNumber: 1098828719,
      age: 35,
      location: "Birmingham",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Master Javascript",
      passForm: "pending",
      id: 7
    },
    {
      firstName: "Brendan",
      lastName: "Richards",
      email: "brendan@richards.com",
      phoneNumber: 7575557979,
      age: 36,
      location: "Coventry",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Because SoC Rocks",
      passForm: "pending",
      id: 8
    },
    {
      firstName: "Luke",
      lastName: "Bennett",
      email: "like@bennett.com",
      phoneNumber: 909812471,
      age: 46,
      location: "London",
      identify: "Female",
      background: "Employed",
      motivationQuestion: "To learn to code",
      passForm: "pending",
      id: 9
    },
    {
      firstName: "Chris",
      lastName: "Meah",
      email: "chris@meah.com",
      phoneNumber: 298124890,
      age: 24,
      location: "Birmingham",
      identify: "Male",
      background: "Student",
      motivationQuestion: "To nail coding",
      passForm: "pending",
      id: 10
    },
    {
      firstName: "Karen",
      lastName: "Chahal",
      email: "karen@chahal.com",
      phoneNumber: 1098828719,
      age: 35,
      location: "Birmingham",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Master Javascript",
      passForm: "pending",
      id: 11
    },
    {
      firstName: "Lee",
      lastName: "Cheneler",
      email: "lee@cheneler.com",
      phoneNumber: 7575557979,
      age: 36,
      location: "Coventry",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Because SoC Rocks",
      passForm: "pending",
      id: 12
    },
    {
      firstName: "Kira",
      lastName: "Green",
      email: "kira@green.com",
      phoneNumber: 909812471,
      age: 46,
      location: "London",
      identify: "Female",
      background: "Employed",
      motivationQuestion: "To learn to code",
      passForm: "pending",
      id: 13
    },
    {
      firstName: "Kim",
      lastName: "McGrath",
      email: "kim@mcgrath.com",
      phoneNumber: 298124890,
      age: 24,
      location: "Birmingham",
      identify: "Male",
      background: "Student",
      motivationQuestion: "To nail coding",
      passForm: "pending",
      id: 14
    },
    {
      firstName: "Liam",
      lastName: "Johnson",
      email: "laim@johnson.com",
      phoneNumber: 1098828719,
      age: 35,
      location: "Birmingham",
      identify: "Male",
      background: "Employed",
      motivationQuestion: "Master Javascript",
      passForm: "pending",
      id: 15
    }
  ]);
  // This function has been created to avoid a double call of dispacth on the useReducer the first time.

  const [applicationStatus, dispatch] = useReducer((state, action, e) => {
    switch (action) {
      case "pending":
        return state === "pending" ? null : "pending";
      case "accepted":
        return state === "accepted" ? null : "accepted";
      case "rejected":
        return state === "rejected" ? null : "rejected";
      default:
        return state;
    }
  }, null);

  const postForm = async (descion, id) => {
    // admin makes a descion here
    const data = await fetch(`${api.users}/admin-descion`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        firebaseUid: id,
        stage: "passFormStage",
        descion: descion
      })
    });
    const response = await data.json();
    console.log(response);
  };

  const goToHome = () => {
    props.history.push(`/admin-dashboard`);
  };

  const viewApplications = (e, id) => {
    if (showSpecificApplications[0] === applicationStatus) {
      return setShowSpecificApplications([]);
    } else if (e.type !== "click" && e.key !== "Enter") {
      return;
    }
    setShowSpecificApplications([applicationStatus, id]);
    setInput("");
  };

  const changeStatus = (id, status) => {
    const toChange = applicants[id];
    setApplicants([
      ...applicants.slice(0, id),
      { ...toChange, passForm: status },
      ...applicants.slice(id + 1)
    ]);
    setShowSpecificApplications([]);
  };

  const handleInput = e => {
    const { value } = e.target;
    setInput(value);
  };
  const changeInput = e => {
    e.currentTarget.focus();
    console.log({ E: e.currentTarget.focus() });
  };

  const findMatches = (input, applicants, applicationType) => {
    const currentApplications = applicants.filter(applicant => {
      if (applicant.passForm === applicationType) {
        return applicant;
      }
    });
    return currentApplications.filter(applicant => {
      let regex = new RegExp(input, "gi");
      return (
        applicant.firstName.match(regex) || applicant.lastName.match(regex)
      );
    });
  };
  useEffect(() => {
    setSearchedApplications(findMatches(input, applicants, applicationStatus));
  }, [input]);

  return (
    <>
      <h1> Admin Form Processing</h1>
      <div className={css.applicationStatusContainer}>
        <div>
          <button
            className={
              applicationStatus === "pending"
                ? css.applicationStatusButtonActive
                : css.applicationStatusButton
            }
            onClick={() => dispatch("pending")}
          >
            <p> Pending Applications</p>
            <p className={css.applicationsNumber}>
              {
                applicants.filter(applicant => applicant.passForm === "pending")
                  .length
              }
            </p>
          </button>
          <ul
            className={
              applicationStatus === "pending"
                ? css.applicantListContainer
                : css.hideApplicantListContainer
            }
          >
            <input
              onClick={changeInput}
              onChange={e => handleInput(e)}
              value={input}
              className={
                applicationStatus === "pending"
                  ? css.showSearchInput
                  : css.hideSearchInput
              }
              placeholder="Search Applicants"
            />
            {/* List all applicants, unless the search input is used  */}
            {applicants.map(applicant => {
              return (
                showSpecificApplications.length === 0 &&
                applicationStatus === "pending" &&
                applicant.passForm === applicationStatus &&
                input === "" && (
                  <button
                    className={css.applicant}
                    onClick={e => viewApplications(e, applicant.id)}
                    onKeyUp={e => viewApplications(e, applicant.id)}
                  >
                    {applicant.firstName} {applicant.lastName}
                  </button>
                )
              );
            })}
            {/* Lists all applicants when search input is used */}
            {searchedApplications.map(applicant => {
              return (
                input !== "" &&
                applicant.passForm === "pending" && (
                  <button
                    className={css.applicant}
                    onMouseDown={() => viewApplications(applicant.id)}
                    onKeyUp={e => viewApplications(e, applicant.id)}
                  >
                    {applicant.firstName} {applicant.lastName}
                  </button>
                )
              );
            })}
          </ul>
        </div>
        <div>
          <button
            className={
              applicationStatus === "accepted"
                ? css.applicationStatusButtonActive
                : css.applicationStatusButton
            }
            onClick={() => dispatch("accepted")}
          >
            <p> Accepted Applications </p>
            <p className={css.applicationsNumber}>
              {
                applicants.filter(
                  applicant => applicant.passForm === "accepted"
                ).length
              }
            </p>
          </button>
          <ul
            className={
              applicationStatus === "accepted"
                ? css.applicantListContainer
                : css.hideApplicantListContainer
            }
          >
            <input
              onChange={e => handleInput(e)}
              className={
                applicationStatus === "accepted"
                  ? css.showSearchInput
                  : css.hideSearchInput
              }
              placeholder="Search Applicants"
            />
            {/* List all applicants, unless the search input is used  */}
            {applicants.map(applicant => {
              return (
                showSpecificApplications.length === 0 &&
                applicationStatus === "accepted" &&
                applicant.passForm === applicationStatus &&
                input === "" && (
                  <button
                    className={css.applicant}
                    onClick={e => viewApplications(e, applicant.id)}
                    onKeyUp={e => viewApplications(e, applicant.id)}
                  >
                    {applicant.firstName} {applicant.lastName}
                  </button>
                )
              );
            })}
            {/* Lists all applicants when search input is used */}
            {searchedApplications.map(applicant => {
              return (
                input !== "" &&
                applicant.passForm === "accepted" && (
                  <button
                    className={css.applicant}
                    onMouseDown={() => viewApplications(applicant.id)}
                    onKeyUp={e => viewApplications(e, applicant.id)}
                  >
                    {applicant.firstName} {applicant.lastName}
                  </button>
                )
              );
            })}
          </ul>
        </div>
        <div>
          <button
            className={
              applicationStatus === "rejected"
                ? css.applicationStatusButtonActive
                : css.applicationStatusButton
            }
            onClick={() => dispatch("rejected")}
          >
            <p> Rejected Applications </p>
            <p className={css.applicationsNumber}>
              {
                applicants.filter(
                  applicant => applicant.passForm === "rejected"
                ).length
              }
            </p>
          </button>
          <ul
            className={
              applicationStatus === "rejected"
                ? css.applicantListContainer
                : css.hideApplicantListContainer
            }
          >
            <input
              onChange={e => handleInput(e)}
              className={
                applicationStatus === "rejected"
                  ? css.showSearchInput
                  : css.hideSearchInput
              }
              placeholder="Search Applicants"
            />
            {/* List all applicants, unless the search input is used  */}
            {applicants.map(applicant => {
              return (
                showSpecificApplications.length === 0 &&
                applicationStatus === "rejected" &&
                applicant.passForm === applicationStatus &&
                input === "" && (
                  <button
                    className={css.applicant}
                    onClick={e => viewApplications(e, applicant.id)}
                    onKeyUp={e => viewApplications(e, applicant.id)}
                  >
                    {applicant.firstName} {applicant.lastName}
                  </button>
                )
              );
            })}
            {/* Lists all applicants when search input is used */}
            {searchedApplications.map(applicant => {
              return (
                input !== "" &&
                applicant.passForm === "rejected" && (
                  <button
                    className={css.applicant}
                    onMouseDown={() => viewApplications(applicant.id)}
                    onKeyUp={e => viewApplications(e, applicant.id)}
                  >
                    {applicant.firstName} {applicant.lastName}
                  </button>
                )
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        <TransitionGroup className={css.item}>
          {applicants.map(
            applicant =>
              showSpecificApplications[0] === applicant.passForm &&
              applicant.id === showSpecificApplications[1] && (
                <CSSTransition timeout={200} classNames="item">
                  <div className={css.applicantDetailsContainer}>
                    <div className={css.detailsSubContainer} key={applicant.id}>
                      <h2>Applicant Details </h2>
                      <h3>
                        {applicant.firstName} {applicant.lastName}
                      </h3>
                      <div className={css.metaData}>
                        <p>Age: {applicant.age}</p>
                        <p>Location: {applicant.location}</p>
                        <p>Background: {applicant.background}</p>
                      </div>
                    </div>
                    <div className={css.reasonSubContainer}>
                      <h3>Reason for applying </h3>
                      <p>{applicant.motivationQuestion}</p>
                    </div>
                    <div className={css.applicationButtonsContainer}>
                      <button
                        onClick={() => {
                          changeStatus(applicant.id, "accepted");
                        }}
                        onMouseUp={() => {
                          dispatch(applicant.passForm);
                          postForm(true, applicant.id);
                        }}
                      >
                        ACCEPT
                      </button>
                      <button
                        onClick={() => changeStatus(applicant.id, "rejected")}
                        onMouseUp={() => {
                          dispatch(applicant.passForm);
                          postForm(false, applicant.id);
                        }}
                      >
                        DECLINE
                      </button>
                      <button
                        onClick={() =>
                          changeStatus(applicant.id, applicant.passForm)
                        }
                        onMouseUp={() => dispatch(applicant.passForm)}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </CSSTransition>
              )
          )}
        </TransitionGroup>
      </div>
      <div onClick={goToHome} className={css.adminDashboardHome}>
        <button> Admin Home</button>
      </div>
    </>
  );
}

export default FormRating;
