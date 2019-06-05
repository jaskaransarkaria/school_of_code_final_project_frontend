import React, { useState, useEffect } from "react";
import { api } from "../../config";
import Topics from "../Topics";
import css from "./Topics.module.css";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// fetch GET topic keys

const TopicsTray = () => {
  const [topicKeys, setTopicKeys] = useState([]);
  const [showTopic, setShowTopic] = useState(false);

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
        <h2 className={css.topicsTitle}>Resources</h2>
        <div className={css.topicsContainer}>
          {topicKeys.map(topic => (
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                onClick={() => setShowTopic(showTopic ? false : topic)}
              >
                <Typography>{topic}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
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

export default TopicsTray;

function SimpleExpansionPanel() {
  return <div />;
}
