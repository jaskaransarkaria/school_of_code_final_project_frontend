import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import FeedbackCard from "../FeedbackCard";

const data = [
  { title: "React", rating: 0, complete: false, date: "05/05/19" },
  {
    title: "React Hooks Overview",
    rating: 0,
    complete: false,
    date: "05/05/19"
  },
  { title: "React Material UI", rating: 0, complete: false, date: "05/05/19" },
  { title: "React Proptypes", rating: 0, complete: false, date: "05/05/19" },
  { title: "React useContext", rating: 0, complete: false, date: "05/05/19" },
  { title: "React useReducer", rating: 0, complete: false, date: "05/05/19" },
  {
    title: "React useful JS patterns",
    rating: 0,
    complete: false,
    date: "05/05/19"
  }
];

const FeedbackTray = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [dummyFeedbackData, setDummyFeedbackData] = useState(data);

  const updateFeedback = (titleMatch, newRating, newComment) => {
    const matchedIndex = dummyFeedbackData.findIndex(
      item => titleMatch === item.title
    );
    setDummyFeedbackData([
      ...dummyFeedbackData.slice(0, matchedIndex),
      {
        ...dummyFeedbackData[matchedIndex],
        complete: true,
        rating: newRating * 2,
        comment: newComment
      },
      ...dummyFeedbackData.slice(matchedIndex + 1)
    ]);
    if (carouselIndex > 0) {
      setCarouselIndex(carouselIndex - 1);
    }
  };
  return (
    <>
      {console.log("dummyData", dummyFeedbackData)}
      <button
        onClick={() => {
          if (
            carouselIndex ===
              dummyFeedbackData.filter(i => i.complete === false).length - 3 ||
            dummyFeedbackData.filter(i => i.complete === false).length <= 3
          ) {
            return;
          }
          setCarouselIndex(carouselIndex + 1);
        }}
      >
        &gt;
      </button>
      <Paper>
        {dummyFeedbackData
          .filter(i => i.complete === false)
          .slice(carouselIndex, carouselIndex + 3)
          .map((item, index) => {
            return (
              <>
                <br />
                <FeedbackCard
                  key={index}
                  item={item}
                  update={updateFeedback}
                  style={{ margin: "20px auto" }}
                />
                <br />
              </>
            );
          })}
      </Paper>
      <button
        onClick={() => {
          if (carouselIndex === 0) {
            return;
          }
          setCarouselIndex(carouselIndex - 1);
        }}
      >
        &lt;
      </button>
    </>
  );
};

export default FeedbackTray;
