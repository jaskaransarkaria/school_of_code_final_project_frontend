import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Welcome from "../Welcome";

import { api } from "../../config";

firebase.initializeApp({
  apiKey: api.firebase_key,
  authDomain: api.firebase_auth_domain
});
const Login = () => {
  const [signedIn, setSignedIn] = useState(false);

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
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
