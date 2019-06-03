import React, { useState, useReducer, useEffect } from "react";
import DashboardBanner from "../DashboardBanner";
import css from "./FormRating.module.css";
import { api } from "../../config";
import UserName from "../UserName";
import { useTransition, animated } from "react-spring";

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
  const [applicants, setApplicants] = useState([]);
  const [applicantCounter, setApplicantCounter] = useState(0);

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

  // Created an array of all applicants to use in the transitions array below
  const allApplicants = [
    ...pendingApplicants,
    ...rejectedApplicants,
    ...acceptedApplicants
  ];

  // Transitions contains the data which will be mapped over for the animations
  const transitions = useTransition(
    allApplicants,
    allApplicants => allApplicants._id,
    {
      from: {
        transform: "translateX(-1000px) rotate(0deg)"
      },
      enter: {
        transform: "translateX(0) rotate(360deg)"
      },
      leave: {
        transform: "translateX(-500px)"
      },
      config: { duration: 1500 }
    }
  );
  console.log("TRANSITION", transitions);

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
            onClick={() => {
              dispatch("pending");
              setShowSpecificApplications([]);
            }}
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
            {pendingApplicants.map((applicant, pendingApplicationIndex) => {
              console.log("PENDING APPLICATION FORMS", pendingApplicants);
              return (
                <>
                  {/* showSpecificApplications.length === 0 &&
                applicationStatus === "pending" &&
                applicant.passFormStage === applicationStatus &&
                input === "" && ( */}
                  <UserName
                    classToBe={css.applicant}
                    dispatch={() => dispatch("pending")}
                    click={e => viewApplications(e, applicant.firebaseUid)}
                    indexKey={applicant.firebaseUid}
                    uid={applicant.firebaseUid}
                  />
                  {/* ); */}
                </>
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
                      indexKey={applicant.firebaseUid}
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
            onClick={() => {
              dispatch(true);
              setShowSpecificApplications([]);
            }}
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
                <>
                  {/* showSpecificApplications.length === 0 &&
                applicationStatus === true &&
                applicant.passFormStage === applicationStatus &&
                input === "" && ( */}
                  <UserName
                    classToBe={css.applicant}
                    click={e => viewApplications(e, applicant.firebaseUid)}
                    indexKey={applicant.firebaseUid}
                    uid={applicant.firebaseUid}
                    dispatch={() => dispatch(true)}
                  />
                  {/* ); */}
                </>
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
                      indexKey={applicant.firebaseUid}
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
            onClick={() => {
              dispatch(false);
              setShowSpecificApplications([]);
            }}
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
                <>
                  {/* showSpecificApplications.length === 0 &&
                applicationStatus === false &&
                applicant.passFormStage === applicationStatus &&
                input === "" && ( */}
                  <UserName
                    classToBe={css.applicant}
                    click={e => viewApplications(e, applicant.firebaseUid)}
                    indexKey={applicant.firebaseUid}
                    uid={applicant.firebaseUid}
                    dispatch={() => dispatch(false)}
                  />
                  {/* ); */}
                </>
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
                      indexKey={applicant.firebaseUid}
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
          {transitions.map(({ item, key, props }) => {
            console.log("APPLICANT", item);
            const matchedUser =
              allUsers.find(user => user.firebaseUid === item.firebaseUid) ||
              "no matched User";

            return (
              showSpecificApplications[0] === item.passFormStage && // this will be passFormStage
              item.firebaseUid === showSpecificApplications[1] && ( // an array with 2 args (1st arg is application status)
                // and the 2nd arg is id - this needs to be set as at the minute the function is pointing to just the id not the uid
                <animated.div key={key} style={props}>
                  <div>
                    <div
                      className={css.detailsSubContainer}
                      key={item.firebaseUid}
                    >
                      <h2>item Details </h2>
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
                          Background: {matchedUser.background || "noBackground"}
                        </p>{" "}
                        {/*access the user database for this info*/}
                      </div>
                    </div>
                    <div className={css.reasonSubContainer}>
                      <h3>Reason for applying </h3>
                      <p>
                        {item.formApplicationData.motivationQuestion ||
                          "noMotivationQuestion"}
                      </p>
                    </div>
                    <div className={css.applicationButtonsContainer}>
                      <button
                        onClick={() => {
                          //changeStatus(item.firebaseUid, "accepted");
                          setShowSpecificApplications([]);

                          // this is not connected up correctly
                          // this function changes the status in the list which contains all the the
                          // data locally

                          // this won't be neccessary if I fill the accepted and rejected trays from the
                          // database
                        }}
                        onMouseUp={() => {
                          dispatch(item.passFormStage); // this isnt connected up either
                          postForm(true, item.firebaseUid);
                        }}
                      >
                        ACCEPT
                      </button>
                      <button
                        onClick={() =>
                          //changeStatus(item.firebaseUid, "rejected")
                          setShowSpecificApplications([])
                        } // this is not connected up correctly
                        onMouseUp={() => {
                          dispatch(item.passFormStage); // this isnt connected up either
                          postForm(false, item.firebaseUid);
                        }}
                      >
                        DECLINE
                      </button>
                      <button
                        onClick={() =>
                          // changeStatus(
                          //   item.firebaseUid,
                          //   item.passFormStage
                          // )
                          setShowSpecificApplications([])
                        }
                        onMouseUp={() => dispatch(item.passFormStage)}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </animated.div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FormRating;
