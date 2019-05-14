import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Welcome from "../components/Welcome";

const LoginPage = () => {
  const [signedIn, setSignedIn] = useState(false);

  let savedDisplayName;
  let savedPhotoURL;
  let savedUid;
  let savedEmail;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        savedDisplayName = user.displayName;
        savedPhotoURL = user.photoURL;
        savedUid = user.uid;
        savedEmail = user.email;
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
          <Welcome fullName={savedDisplayName} photo={savedPhotoURL} />
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
