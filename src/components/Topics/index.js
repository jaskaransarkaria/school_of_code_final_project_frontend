import React, { useState, useEffect } from "react";
import { api } from "../../config";
import css from "./Topics.module.css";

const Topics = ({ topicKey }) => {
  const [topicData, setTopicData] = useState({});

  useEffect(() => {
    async function getThisTopicData() {
      console.log("from topics component", topicKey);
      const data = await fetch(`${api.topics}/${topicKey.slice(1)}`);
      const response = await data.json();
      console.log("from topc component", response);
      setTopicData(response.result);
    }
    getThisTopicData();
  }, []);

  return (
    <div style={{ display: "inline-block" }}>
      {topicData.entries &&
        topicData.entries.map(item => (
          <>
            <br />
            {item.subTopic && <p classname={css.topic}>{item.subTopic}</p>}
            <a href={item.url} style={{ color: "yellow" }}>
              {item.url}
            </a>
          </>
        ))}
    </div>
  );
};

export default Topics;
