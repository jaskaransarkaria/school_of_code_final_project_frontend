import React, { useState, useEffect } from "react";
import { api } from "../../config";

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
            {item.subTopic && <p>{item.subTopic}</p>}
            <a href={item.url}>{item.url}</a>
          </>
        ))}
    </div>
  );
};

export default Topics;
