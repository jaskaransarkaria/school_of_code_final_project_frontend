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
  // setAdminFeedbackComment,
  videoCounter,
  setVideoCounter,
  videoApplicationData
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const resetRatingValue = () => {
    setRatingValue(0);
  };

  return (
    <>
      <h3 className={css.rateVideoTitle}> Rate Video </h3>
      <div
        className={
          ratingValue === 0 ? css.ratingsContainer : css.commentsContainer
        }
      >
        {ratingValue === 0 ? (
          <Rating
            initialRating={item.rating / 2}
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            style={{
              color: "rgba(248, 180, 22, 1)",
              fontSize: "25px",
              top: "50%",
              left: "50%",
              transform: "translateX(-50%) translateY(-50%)",
              width: "100%",
              position: "absolute"
            }}
            fractions={2}
            onClick={value => {
              setRatingValue(value);
              setAdminFeedbackRating(value * 2);
            }}
          />
        ) : collateFeedback.length === 5 ? (
          <div>Thanks, your review has been submmited</div>
        ) : (
          <div
            className={
              videoCounter + 1 !== videoApplicationData.length
                ? css.commentsTitleContainer
                : css.finalCommentsTitleContainer
            }
          >
            <div className={css.containerTitle}>
              <p className={css.title}> Leave Comment </p>
              <p className={css.rating}> Rating: {ratingValue}</p>
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
              // setAdminFeedbackComment={setAdminFeedbackComment}
              videoCounter={videoCounter}
              setVideoCounter={setVideoCounter}
              videoApplicationData={videoApplicationData}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FeedbackCard;
