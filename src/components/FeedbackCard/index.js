import React, { useState } from "react";
import Rating from "react-rating";
import CommentBox from "../CommentBox";
import css from "./FeedbackCard.module.css";

const FeedbackCard = ({
  item,
  update,
  collateFeedback,
  setCollateFeedback,
  videoUrl,
  adminFeedbackRating,
  setAdminFeedbackRating,
  setAdminFeedbackComment,
  rateVideoAlert,
  setRateVideoAlert,
  videoCounter,
  setVideoCounter
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const resetRatingValue = () => {
    setRatingValue(0);
  };
  return (
    <>
      <div
        className={
          ratingValue === 0 ? css.ratingsContainer : css.commentsContainer
        }
      >
        <div>
          {ratingValue === 0 ? (
            <div className={css.ratingTitleContainer}>
              <p> Please Rate </p>
              <Rating
                initialRating={item.rating / 2}
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                style={{ color: "rgba(248, 180, 22, 1)" }}
                fractions={2}
                onClick={value => {
                  setRatingValue(value);
                  setAdminFeedbackRating(value * 2);
                }}
              />
            </div>
          ) : (
            <div className={css.ratingTitleContainer}>
              <div className={css.containerTitle}>
                <p className={css.title}> Leave Comment </p>
                <p className={css.rating}> Rating: {ratingValue * 2}</p>
              </div>
              <CommentBox
                title={item.title}
                update={update}
                value={ratingValue}
                reset={resetRatingValue}
                collateFeedback={collateFeedback}
                setCollateFeedback={setCollateFeedback}
                videoUrl={videoUrl}
                adminFeedbackRating={adminFeedbackRating}
                setAdminFeedbackComment={setAdminFeedbackComment}
                setRateVideoAlert={setRateVideoAlert}
                videoCounter={videoCounter}
                setVideoCounter={setVideoCounter}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
