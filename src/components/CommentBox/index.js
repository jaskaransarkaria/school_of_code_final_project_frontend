import React, { useState } from "react";
import css from "./CommentBox.module.css";

const CommentBox = ({
  title,
  update,
  value,
  reset,
  collateFeedback,
  setCollateFeedback,
  videoUrl,
  adminFeedbackRating,
  // setAdminFeedbackComment,
  setVideoCounter,
  videoCounter,
  videoApplicationData
}) => {
  const [comment, setComment] = useState("");
  return (
    <form className={css.commentContainer}>
      <textarea
        name="leaveComment"
        autoFocus
        placeholder="Enter text"
        onChange={event => setComment(event.target.value)}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault();
            // setAdminFeedbackComment(comment);
            update(title, value, comment);
            reset();
          }
        }}
      />
      <button className={css.backToRating} onClick={() => reset()}>
        {" "}
        Back to Rating{" "}
      </button>
      <button
        onClick={e => {
          e.preventDefault();
          // setAdminFeedbackComment(comment);
          setCollateFeedback([
            ...collateFeedback,
            {
              videoUrl: videoUrl,
              rating: adminFeedbackRating,
              comment: comment
            }
          ]);

          update(title, value, comment);
          setVideoCounter(videoCounter + 1);
          reset();
        }}
      >
        {videoCounter + 1 === videoApplicationData.length
          ? "Submit FINAL RATING"
          : "Submit Rating and Comment"}
      </button>
    </form>
  );
};

export default CommentBox;
