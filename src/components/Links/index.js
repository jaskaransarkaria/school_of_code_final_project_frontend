import React from "react";
import Banner from "../Banner";
import NavBar from "../NavBar";
import css from "../Links/Links.module.css";
function Links() {
  return (
    <>
      <div className={css.linksContainer}>
        <Banner />
        <NavBar />
      </div>
    </>
  );
}
export default Links;
