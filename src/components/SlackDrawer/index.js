import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";
import TopicsTray from "../TopicsTray";
import css from "./SlackDrawer.module.css";

const styles = {
  paper: {
    backgroundColor: `rgba(0,0,0, 0.9)`,
    borderRadius: 3,
    border: 0,
    width: "auto",
    padding: "0 30px"
  }
};

const SlackDrawer = props => {
  const { classes } = props;
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
            height: "125px"
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
              cursor: "pointer",
              border: "2.5px #11cf84 solid"
            }}
          />
        </button>
        <Drawer
          open={state.left}
          onClose={toggleDrawer("left", false)}
          classes={{
            paper: classes.paper
          }}
        >
          <TopicsTray />
        </Drawer>
      </div>
    );
  }
  return <TempDrawer />;
};

export default withStyles(styles)(SlackDrawer);
