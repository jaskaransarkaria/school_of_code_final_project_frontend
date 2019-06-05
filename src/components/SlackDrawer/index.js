import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import TopicsTray from "../TopicsTray";
import css from "./SlackDrawer.module.css";

const SlackDrawer = () => {
  function TempDrawer() {
    const [state, setState] = useState({
      left: false
    });

    const toggleDrawer = (side, open) => event => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setState({ [side]: open });
    };

    return (
      <div className={css.slackDrawerContainer}>
        <button
          style={{
            border: "none",
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "0",
            width: "125px",
            height: "125px",
            border: "2.5px #11cf84 solid"
          }}
          onClick={toggleDrawer("left", true)}
        >
          <img
            src="/slackIcon.png"
            alt="Slack resources"
            style={{
              width: "125px",
              height: "125px",
              borderRadius: "50%",
              cursor: "pointer"
            }}
          />
        </button>
        <Drawer
          open={state.left}
          onClose={toggleDrawer("left", false)}
          width={1}
        >
          <TopicsTray />
        </Drawer>
      </div>
    );
  }
  return <TempDrawer />;
};

export default SlackDrawer;
