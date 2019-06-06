import React, { useState } from "react";
import FeedbackCard from "../FeedbackCard";
import moment from "moment";
import css from "./FeedbackTray.module.css";

const todaysDate = moment().format("DD/MM/YYYY");
const data = [
  { title: "Please Rate", rating: 0, complete: false, date: todaysDate }
];

const FeedbackTray = ({
  adminFeedbackRating,
  setAdminFeedbackRating,
  // setAdminFeedbackComment,
  collateFeedback,
  setCollateFeedback,
  videoUrl,
  setVideoCounter,
  videoCounter,
  videoApplicationData
}) => {
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
  console.log("DUMMYFEEDBACKDATA", dummyFeedbackData);
  return (
    <>
      {console.log("feedback tray", dummyFeedbackData)}
      {dummyFeedbackData
        .filter(i => i.complete === false)
        .slice(carouselIndex, carouselIndex + 3)
        .map((item, index) => {
          return (
            <>
              <div
                className={
                  videoCounter + 1 !== videoApplicationData.length
                    ? css.feedbackContainer
                    : css.finalFeedbackContainer
                }
              >
                <FeedbackCard
                  key={index}
                  item={item}
                  update={updateFeedback}
                  adminFeedbackRating={adminFeedbackRating}
                  setAdminFeedbackRating={setAdminFeedbackRating}
                  // setAdminFeedbackComment={setAdminFeedbackComment}
                  collateFeedback={collateFeedback}
                  setCollateFeedback={setCollateFeedback}
                  videoUrl={videoUrl}
                  videoCounter={videoCounter}
                  setVideoCounter={setVideoCounter}
                  videoApplicationData={videoApplicationData}
                />
              </div>
            </>
          );
        })}

      {/* </Paper> */}
      {/* <button
        onClick={() => {
          if (carouselIndex === 0) {
            return;
          }
          setCarouselIndex(carouselIndex - 1);
        }}
      >
        &lt;
      </button> */}
    </>
  );
};

export default FeedbackTray;
