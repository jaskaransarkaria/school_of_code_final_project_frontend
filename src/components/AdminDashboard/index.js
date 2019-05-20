import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import NavBar from "../NavBar";
import AdminUserOptions from "../AdminUserOptions";
import FormRating from "../FormRating";
import VideoRating from "../VideoRating";
import AdminUploadSchedule from "../AdminUploadSchedule";
import css from "../AdminDashboard/AdminDashboard.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class AdminDashBoard extends Component {
  render() {
    return (
      <>
        <DashboardBanner />
        <NavBar propsUser="Admin" />
        <div className={css.container}>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/admin-dashboard/"
                component={AdminUserOptions}
              />
              <Route
                path="/admin-dashboard/form-processing"
                component={FormRating}
              />
              <Route
                path="/admin-dashboard/video-processing"
                component={VideoRating}
              />
              <Route
                path="/admin-dashboard/upload-schedule"
                component={AdminUploadSchedule}
              />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </BrowserRouter>
        </div>
      </>
    );
  }
}
export default AdminDashBoard;
