import React, { useState, useEffect } from "react";
import { api } from "../../config";
import Topics from "../Topics";
import css from "./Topics.module.css";
// fetch GET topic keys

// {
//   "success": true,
//   "result": [
//       {
//           "entries": [
//               {
//                   "subTopic": "#hooks",
//                   "url": "https://reactjs.org/docs/hooks-intro.html",
//                   "date": "18/05/2019"
//               },
//               {
//                   "subTopic": "#contextAPI",
//                   "url": "https://reactjs.org/docs/hooks-intro.html",
//                   "date": "18/05/2019"
//               },
//               {
//                   "subTopic": "#reducer",
//                   "url": "https://reactjs.org/docs/hooks-intro.html",
//                   "date": "18/05/2019"
//               }
//           ],
//           "_id": "5ce05cc925a9325ee686d5a1",
//           "topic": "#react",
//           "__v": 0,
//           "createdAt": "2019-05-18T19:28:09.046Z",
//           "updatedAt": "2019-05-18T19:45:15.091Z"
//       }
//   ]
// }

const TopicsTray = () => {
  const [topicKeys, setTopicKeys] = useState([]);
  const [showTopic, setShowTopic] = useState(false);

  useEffect(() => {
    async function fetchTopicData() {
      const data = await fetch(`${api.topics}`);
      const response = await data.json();
      console.log(response);
      console.log(response.topics);
      setTopicKeys([...response.topics]); // make an array of topics
    }
    fetchTopicData();
  }, []);
  return (
    <>
      <div className={css.topicsContainer}>
        <h2>Resources</h2>
        {!showTopic ? (
          topicKeys.map(topic => (
            <div className={css.topicContainer}>
              <button onClick={() => setShowTopic(topic)}>{topic}</button>
              {/* <Topics topicKey={topic} /> */}
            </div>
          ))
        ) : (
          <>
            <button onClick={() => setShowTopic(false)}>back</button>
            <Topics topicKey={showTopic} />
          </>
        )}
      </div>
    </>
  );
};

export default TopicsTray;
