import React, { useState, useEffect } from "react";
import { api } from "../../config";
import Topics from "../Topics";
import css from "./Topics.module.css";
import { withStyles } from "@material-ui/core/styles";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// fetch GET topic keys

const styles = {
  root: {
    backgroundColor: "#11cf84",
    borderRadius: "5px",
    margin: 5
  },
  broot: {
    backgroundColor: `rgba(0,0,0, 0.9)`
  },
  p: { fontSize: 32 },
  subPara: { fontSize: 24, color: "white" }
};

const TopicsTray = props => {
  const [topicKeys, setTopicKeys] = useState([]);
  const [showTopic, setShowTopic] = useState(false);
  const [searchField, setSearchField] = useState("");

  const { classes } = props;

  useEffect(() => {
    async function fetchTopicData() {
      const data = await fetch(`${api.topics}`);
      const response = await data.json();
      setTopicKeys([...response.topics]); // make an array of topics
    }
    fetchTopicData();
  }, []);

  return (
    <>
      <div>
        <h2 className={css.topicsTitle}>Resource Archive</h2>
        <input
          placeholder="search for a topic"
          id={css.searchBar}
          onChange={e => setSearchField(e.target.value)}
        />
        <div className={css.topicsContainer}>
          {searchField === ""
            ? topicKeys.sort().map(topic => (
                <ExpansionPanel classes={{ root: classes.broot }}>
                  <ExpansionPanelSummary
                    classes={{ root: classes.root }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    onClick={() => setShowTopic(showTopic ? false : topic)}
                  >
                    <Typography classes={{ root: classes.p }}>
                      {topic}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography classes={{ root: classes.subPara }}>
                      {showTopic && <Topics topicKey={showTopic} />}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))
            : topicKeys
                .sort()
                .filter(topic => {
                  let regex = new RegExp(searchField, "gi");
                  return topic.match(regex);
                })
                .map(topic => (
                  <ExpansionPanel classes={{ root: classes.root }}>
                    <ExpansionPanelSummary
                      classes={{ root: classes.root }}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      onClick={() => setShowTopic(showTopic ? false : topic)}
                    >
                      <Typography classes={{ root: classes.p }}>
                        {topic}
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography classes={{ root: classes.subPara }}>
                        {showTopic && <Topics topicKey={showTopic} />}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(TopicsTray);
