import React, { Component } from "react";
import DashboardBanner from "../DashboardBanner";
import AdminUserOptions from "../AdminUserOptions";
import FormRating from "../FormRating";
import VideoRating from "../VideoRating";
import AdminUploadSchedule from "../AdminUploadSchedule";
import css from "../AdminDashboard/AdminDashboard.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class AdminDashBoard extends Component {
  render() {
    return (
      <div className={css.optionsContainer}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/admin-dashboard" component={AdminUserOptions} />
            <Route path="/form-processing" component={FormRating} />
            <Route path="/video-processing" component={VideoRating} />
            <Route path="/upload-schedule" component={AdminUploadSchedule} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default AdminDashBoard;
