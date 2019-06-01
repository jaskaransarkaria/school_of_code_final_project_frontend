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
  setAdminFeedbackComment,
  setRateVideoAlert,
  setVideoCounter,
  videoCounter
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
            setAdminFeedbackComment(comment);
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
          setAdminFeedbackComment(comment);
          setCollateFeedback([
            ...collateFeedback,
            {
              videoUrl: videoUrl,
              rating: adminFeedbackRating,
              comment: comment
            }
          ]);

          update(title, value, comment);
          setRateVideoAlert(false);
          setVideoCounter(videoCounter + 1);
          reset();
          console.log("COLLATE FEEDBACK:", collateFeedback);
        }}
      >
        Submit Rating and Comment
      </button>
    </form>
  );
};

export default CommentBox;
