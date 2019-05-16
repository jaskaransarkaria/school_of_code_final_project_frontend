import React, { useState, useEffect } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Welcome from "../components/Welcome";
import ApplicationLandingPage from "../components/ApplicationLandingPage";

const LoginPage = () => {
  return (
    <>
      <ApplicationLandingPage />
    </>
  );
};

export default LoginPage;
