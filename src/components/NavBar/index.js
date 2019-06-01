import React from "react";
import NavBarAdmin from "../NavBarAdmin";
import NavBarApplicants from "../NavBarApplicants";
import NavBarBootcampers from "../NavBarBootcampers";

const NavBar = ({ propsUser }) => {
  console.log("From NavBar", propsUser);
  return (
    <>
      {propsUser === "Admin" && <NavBarAdmin />}
      {propsUser === "Applicant" && <NavBarApplicants />}
      {propsUser === "Bootcamper" && <NavBarBootcampers />}
    </>
  );
};

export default NavBar;
