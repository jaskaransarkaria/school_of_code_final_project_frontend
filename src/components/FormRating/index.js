import React, { useState, useReducer, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DashboardBanner from "../DashboardBanner";
import css from "./FormRating.module.css";
import { api } from "../../config";
import UserName from "../UserName";

// every time it re-renders it's adding another list of people to the dropdown (which are buttons)
// search functionality is not hooked up

function FormRating(props) {
  const [showSpecificApplications, setShowSpecificApplications] = useState([]);
  const [searchedApplications, setSearchedApplications] = useState([]);
  const [input, setInput] = useState("");
  const [pendingApplicants, setPendingApplicants] = useState([]);
  const [acceptedApplicants, setAcceptedApplicants] = useState([]);
  const [rejectedApplicants, setRejectedApplicants] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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
  // This function has been created to avoid a double call of
  // dispacth on the useReducer the first time.

  const [applicationStatus, dispatch] = useReducer((state, action, e) => {
    switch (action) {
      case "pending":
        return state === "pending" ? null : "pending";
      case true:
        return state === true ? null : true;
      case false:
        return state === false ? null : false;
      default:
        return state;
    }
  }, null);

  const getAllUsers = async () => {
    const data = await fetch(`${api.users}`);
    const response = await data.json();
    setAllUsers(response.result);
  };

  const getPendingForm = async () => {
    console.log("firing fetch GET");
    const data = await fetch(`${api.applications}/pending-forms`);
    const response = await data.json();
    console.log("inside getpendingform", response);
    console.log("inside getpendingform", response.result);
    setPendingApplicants([...response.result]);
  };
  const getAcceptedForm = async () => {
    console.log("firing fetch GET");
    const data = await fetch(`${api.applications}/accepted-forms`);
    const response = await data.json();
    console.log("inside getacceptedform", response);
    console.log("inside getacceptedform", response.result);
    setAcceptedApplicants([...response.result]);
  };
  const getRejectedForm = async () => {
    console.log("firing fetch GET");
    const data = await fetch(`${api.applications}/rejected-forms`);
    const response = await data.json();
    console.log("inside getrejectedform", response);
    console.log("inside getrejectedform", response.result);
    setRejectedApplicants([...response.result]);
  };

  useEffect(() => {
    getPendingForm();
    getAcceptedForm();
    getRejectedForm();
    getAllUsers();
  }, []);

  const postForm = async (descion, id) => {
    // admin makes a descion here
    const data = await fetch(`${api.applications}/admin-descion`, {
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
    getPendingForm();
    getAcceptedForm();
    getRejectedForm();
  };

  const goToHome = () => {
    props.history.push(`/admin-dashboard`);
  };

  const viewApplications = (e, id) => {
    // if (showSpecificApplications[0] === applicationStatus) {
    //   return setShowSpecificApplications([]);
    // } else if (e.type !== "click" && e.key !== "Enter") {
    //   return;
    // }
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

  console.log("acceptedapplicants", acceptedApplicants);
  return (
    <>
      <DashboardBanner title={"Form Applications"} />

      {console.log("pending applications", pendingApplicants)}
      {console.log("accepted applications", acceptedApplicants)}
      {console.log("rejected applications", rejectedApplicants)}

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
                // this is the applications number
                pendingApplicants.filter(
                  applicant => applicant.passFormStage === "pending"
                ).length
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
            {pendingApplicants.map(applicant => {
              console.log("PENDING APPLICATION FORMS", pendingApplicants);
              return (
                showSpecificApplications.length === 0 &&
                applicationStatus === "pending" &&
                applicant.passFormStage === applicationStatus &&
                input === "" && (
                  <>
                    <UserName
                      classToBe={css.applicant}
                      dispatch={() => dispatch("pending")}
                      click={e => viewApplications(e, applicant.firebaseUid)}
                      key={e => viewApplications(e, applicant.firebaseUid)}
                      uid={applicant.firebaseUid}
                    />
                  </>
                )
              );
            })}
            {/* Lists all applicants when search input is used */}
            {searchedApplications.map(applicant => {
              return (
                input !== "" &&
                applicant.passFormStage === "pending" && (
                  <>
                    <UserName
                      classToBe={css.applicant}
                      dispatch={() => dispatch("pending")}
                      click={e => viewApplications(e, applicant.firebaseUid)}
                      key={e => viewApplications(e, applicant.firebaseUid)}
                      uid={applicant.firebaseUid}
                    />
                  </>
                )
              );
            })}
          </ul>
        </div>
        <div>
          <button
            className={
              applicationStatus === true
                ? css.applicationStatusButtonActive
                : css.applicationStatusButton
            }
            onClick={() => dispatch(true)}
          >
            <p> Accepted Applications </p>
            <p className={css.applicationsNumber}>
              {
                acceptedApplicants.filter(
                  applicant => applicant.passFormStage === true
                ).length
              }
            </p>
          </button>
          <ul
            className={
              applicationStatus === true
                ? css.applicantListContainer
                : css.hideApplicantListContainer
            }
          >
            <input
              onChange={e => handleInput(e)}
              className={
                applicationStatus === true
                  ? css.showSearchInput
                  : css.hideSearchInput
              }
              placeholder="Search Applicants"
            />
            {/* List all applicants, unless the search input is used  */}
            {acceptedApplicants.map(applicant => {
              return (
                showSpecificApplications.length === 0 &&
                applicationStatus === true &&
                applicant.passFormStage === applicationStatus &&
                input === "" && (
                  <>
                    <UserName
                      classToBe={css.applicant}
                      click={e => viewApplications(e, applicant.firebaseUid)}
                      key={e => viewApplications(e, applicant.firebaseUid)}
                      uid={applicant.firebaseUid}
                      dispatch={() => dispatch(true)}
                    />
                  </>
                )
              );
            })}
            {/* Lists all applicants when search input is used */}
            {searchedApplications.map(applicant => {
              return (
                input !== "" &&
                applicant.passFormStage === true && (
                  <>
                    <UserName
                      classToBe={css.applicant}
                      click={e => viewApplications(e, applicant.firebaseUid)}
                      key={e => viewApplications(e, applicant.firebaseUid)}
                      uid={applicant.firebaseUid}
                      dispatch={() => dispatch(true)}
                    />
                  </>
                )
              );
            })}
          </ul>
        </div>
        <div>
          <button
            className={
              applicationStatus === false
                ? css.applicationStatusButtonActive
                : css.applicationStatusButton
            }
            onClick={() => dispatch(false)}
          >
            <p> Rejected Applications </p>
            <p className={css.applicationsNumber}>
              {
                rejectedApplicants.filter(
                  applicant => applicant.passFormStage === false
                ).length
              }
            </p>
          </button>
          <ul
            className={
              applicationStatus === false
                ? css.applicantListContainer
                : css.hideApplicantListContainer
            }
          >
            <input
              onChange={e => handleInput(e)}
              className={
                applicationStatus === false
                  ? css.showSearchInput
                  : css.hideSearchInput
              }
              placeholder="Search Applicants"
            />
            {/* List all applicants, unless the search input is used  */}
            {rejectedApplicants.map(applicant => {
              return (
                showSpecificApplications.length === 0 &&
                applicationStatus === false &&
                applicant.passFormStage === applicationStatus &&
                input === "" && (
                  <>
                    <UserName
                      classToBe={css.applicant}
                      click={e => viewApplications(e, applicant.firebaseUid)}
                      key={e => viewApplications(e, applicant.firebaseUid)}
                      uid={applicant.firebaseUid}
                      dispatch={() => dispatch(false)}
                    />
                  </>
                )
              );
            })}
            {/* Lists all applicants when search input is used */}
            {searchedApplications.map(applicant => {
              return (
                input !== "" &&
                applicant.passFormStage === false && (
                  <>
                    <UserName
                      classToBe={css.applicant}
                      click={e => viewApplications(e, applicant.firebaseUid)}
                      key={e => viewApplications(e, applicant.firebaseUid)}
                      uid={applicant.firebaseUid}
                      dispatch={() => dispatch(false)}
                    />
                  </>
                )
              );
            })}
          </ul>
        </div>
        <div onClick={goToHome} className={css.adminDashboardHome}>
          <button> Admin Home</button>
        </div>
        <div className={css.applicantDetailsContainer}>
          <TransitionGroup className={css.item}>
            {[
              ...pendingApplicants,
              ...acceptedApplicants,
              ...rejectedApplicants
            ].map(
              /// ALL OF THE APPLICANTS this will be all my applications
              // nned to add ...acceptedApplicants, ...rejectedApplicants
              applicant => {
                const matchedUser =
                  allUsers.find(
                    user => user.firebaseUid === applicant.firebaseUid
                  ) || "no matched User";

                return (
                  showSpecificApplications[0] === applicant.passFormStage && // this will be passFormStage
                  applicant.firebaseUid === showSpecificApplications[1] && ( // an array with 2 args (1st arg is application status)
                    // and the 2nd arg is id - this needs to be set as at the minute the function is pointing to just the id not the uid
                    <CSSTransition timeout={200} classNames="item">
                      <div>
                        <div
                          className={css.detailsSubContainer}
                          key={applicant.firebaseUid}
                        >
                          <h2>Applicant Details </h2>
                          <h3>
                            {matchedUser.firstName || "noFirstName"}{" "}
                            {matchedUser.lastName || "noLastName"}{" "}
                            {/*access the user database for this info*/}
                          </h3>
                          <div className={css.metaData}>
                            <p>Age: {matchedUser.age || "noAge"}</p>{" "}
                            {/*access the user database for this info*/}
                            <p>
                              Location: {matchedUser.location || "noLocation"}
                            </p>{" "}
                            {/*access the user database for this info*/}
                            <p>
                              Background:{" "}
                              {matchedUser.background || "noBackground"}
                            </p>{" "}
                            {/*access the user database for this info*/}
                          </div>
                        </div>
                        <div className={css.reasonSubContainer}>
                          <h3>Reason for applying </h3>
                          <p>
                            {applicant.formApplicationData.motivationQuestion ||
                              "noMotivationQuestion"}
                          </p>
                        </div>
                        <div className={css.applicationButtonsContainer}>
                          <button
                            onClick={() => {
                              //changeStatus(applicant.firebaseUid, "accepted");
                              setShowSpecificApplications([]);

                              // this is not connected up correctly
                              // this function changes the status in the list which contains all the the
                              // data locally

                              // this won't be neccessary if I fill the accepted and rejected trays from the
                              // database
                            }}
                            onMouseUp={() => {
                              dispatch(applicant.passFormStage); // this isnt connected up either
                              postForm(true, applicant.firebaseUid);
                            }}
                          >
                            ACCEPT
                          </button>
                          <button
                            onClick={() =>
                              //changeStatus(applicant.firebaseUid, "rejected")
                              setShowSpecificApplications([])
                            } // this is not connected up correctly
                            onMouseUp={() => {
                              dispatch(applicant.passFormStage); // this isnt connected up either
                              postForm(false, applicant.firebaseUid);
                            }}
                          >
                            DECLINE
                          </button>
                          <button
                            onClick={() =>
                              // changeStatus(
                              //   applicant.firebaseUid,
                              //   applicant.passFormStage
                              // )
                              setShowSpecificApplications([])
                            }
                            onMouseUp={() => dispatch(applicant.passFormStage)}
                          >
                            CANCEL
                          </button>
                        </div>
                      </div>
                    </CSSTransition>
                  )
                );
              }
            )}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}

export default FormRating;
