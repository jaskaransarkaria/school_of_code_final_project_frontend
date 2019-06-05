import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import TopicsTray from "../TopicsTray";

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

      setState({ ...state, [side]: open });
    };

    return (
      <div>
        <button onClick={toggleDrawer("left", true)}>Open Left</button>
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          <TopicsTray />
        </Drawer>
      </div>
    );
  }
  return <TempDrawer />;
};

export default SlackDrawer;
