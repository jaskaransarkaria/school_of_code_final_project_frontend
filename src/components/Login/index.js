import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Redirect } from "react-router-dom";
import { api } from "../../config";
import { UserUidContext } from "../App";

function Login(props) {
  const [signedIn, setSignedIn] = useState(false);
  const userUid = useContext(UserUidContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setSignedIn(!!user); // not not meaning if the user is an object it will revert to true and if it isn't an object it will revert to false
      console.log("user", user);
      console.log("uid", user.uid);
    });
  }, []);

  console.log("uid from context", userUid);

  return (
    <>
      {!signedIn ? (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <Redirect to="applicant-dashboard" />
      )}
    </>
  );
}

export default Login;
