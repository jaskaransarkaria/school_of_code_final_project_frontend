import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Welcome from "../components/Welcome";
import { api } from "../config";

firebase.initializeApp({
  apiKey: api.firebase_key,
  authDomain: api.firebase_auth_domain
});
const LoginPage = () => {
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
      // logic which dictates if they are already in the db or they need to register
      // if they need to register push them to the applicant dashboard page

      async function isUserRegistered(user) {
        console.log("in async post", user.uid);
        const response = await fetch(`${api.users}`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            firebaseUid: user.uid
          })
        });
        const data = await response.json();
        console.log(data.result);
        if (data.result === null) {
          // send them to the register page
        } else {
          setSignedIn(
            !!user
            // not not meaning if the user is an object it will revert to true
            // and if it isn't an object it will revert to false
          );
          console.log("user exists in db");
        }
      }

      isUserRegistered(user);

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

export default LoginPage;
