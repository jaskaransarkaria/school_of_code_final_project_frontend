import React from "react";
const Welcome = ({ fullName, photo }) => {
  return (
    <h1>
      Welcome, {fullName}
      <img
        alt="profile pic"
        src={photo}
        style={{ width: "5vh", height: "5vh", borderRadius: "100%" }}
      />
    </h1>
  );
};

export default Welcome;
