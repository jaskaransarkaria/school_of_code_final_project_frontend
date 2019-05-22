import React from "react";
import NavBar from "../components/NavBar";
import TopicsTray from "../components/TopicsTray";
import DashboardBanner from "../components/DashboardBanner";

const BootcamperDashboardPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <NavBar propsUser={"Bootcamper"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "0%",
          width: "94%",
          height: "100vh"
        }}
      >
        <DashboardBanner />
        <TopicsTray style={{ margin: "20%" }} />
      </div>
    </div>
  );
};

export default BootcamperDashboardPage;
