import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBar from "../NavBar";
import css from "../AdminDashboard/AdminDashboard.module.css";

class AdminDashBoard extends Component {
  render() {
    return (
      <>
        <DashboardBanner />
        <NavBar propsUser="Admin" />
        <div className={css.container} />
      </>
    );
  }
}
export default AdminDashBoard;
