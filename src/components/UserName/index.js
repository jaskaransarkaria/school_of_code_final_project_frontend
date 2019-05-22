import React, { useState, useEffect } from "react";
import { api } from "../../config";

const UserName = ({ uid }) => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await fetch(`${api.users}`);
      const response = await data.json();
      setAllUsers(response.result);
    };
    getAllUsers();
  }, []);

  const matchUidToName = uid => {
    const matchedUser = allUsers.find(user => user.firebaseUid === uid);
    if (
      "firstName" in matchedUser === false &&
      "lastName" in matchedUser === false
    ) {
      matchedUser.firstName = "defaultFIRSTName";
      matchedUser.lastName = "defaultLASTName";
    }
    return `${matchedUser.firstName} ${matchedUser.lastName}`;
  };
  return <p>{matchUidToName(uid)}</p>;
};

export default UserName;
