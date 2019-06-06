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
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    async function fetchTopicData() {
      const data = await fetch(`${api.topics}`);
      const response = await data.json();
      setTopicKeys([...response.topics]); // make an array of topics
    }
    fetchTopicData();
  }, []);

  const searchTopics = (array, searchInput) => {
    return array.filter(topic => {
      let regex = new RegExp(searchInput, "gi");
      return topic.match(regex);
    });
  };

  return (
    <>
      <div>
        <h2 className={css.topicsTitle}>Link Library</h2>
        <input
          placeholder="search for a topic"
          autofocus
          id={css.searchBar}
          type="search"
          onChange={e => setSearchField(e.target.value)}
        />
        <div className={css.topicsContainer}>
          {searchField === ""
            ? topicKeys.sort().map(topic => (
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
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
              ))
            : topicKeys
                .sort()
                .filter(topic => {
                  let regex = new RegExp(searchField, "gi");
                  return topic.match(regex);
                })
                .map(topic => (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
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
