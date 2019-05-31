import React, { useState, useEffect } from "react";
import { api } from "../../config";

const UserName = ({ uid, classToBe, click, key, dispatch }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const getAllUsers = async () => {
    const data = await fetch(`${api.users}`);
    const response = await data.json();
    console.log("get all USERS", response);
    console.log("getAll users", response.result);
    setAllUsers([...response.result]);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    const matchUidToName = () => {
      let matchedUser = allUsers.find(user => user.firebaseUid === uid);
      if (!matchedUser) {
        matchedUser = {};
        matchedUser.firstName = "defaultFIRSTName";
        matchedUser.lastName = "defaultLASTName";
      } else if (
        matchedUser.firstName === false &&
        matchedUser.lastName === false
      ) {
        matchedUser.firstName = "defaultFIRSTName";
        matchedUser.lastName = "defaultLASTName";
      }
      setCurrentUser(`${matchedUser.firstName} ${matchedUser.lastName}`);
    };
    matchUidToName();
  }, [allUsers]);
  return (
    <button
      className={classToBe}
      onClick={(dispatch, click)}
      key={key}
    >{`${currentUser}`}</button>
  );
};

export default UserName;
