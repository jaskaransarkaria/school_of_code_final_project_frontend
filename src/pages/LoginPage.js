import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Welcome from "../components/Welcome";

const LoginPage = () => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setSignedIn(true);
      } else {
        console.log("no user");
      }
    });
  });

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

  return (
    <>
      {!signedIn ? (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      ) : (
        <div className="App">
          <Welcome
            fullName={firebase.auth().currentUser.displayName}
            photo={firebase.auth().currentUser.photoURL}
          />
          <button
            onClick={() => {
              firebase.auth().signOut();
              setSignedIn(false);
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default LoginPage;
