import React, { useState } from "react";

const CommentBox = ({
  title,
  update,
  value,
  reset,
  setAdminFeedbackComment
}) => {
  const [comment, setComment] = useState("");
  return (
    <form>
      <textarea
        name="leaveComment"
        autoFocus
        placeholder="leave a comment"
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
      <button
        onClick={e => {
          e.preventDefault();
          setAdminFeedbackComment(comment);
          update(title, value, comment);
          reset();
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CommentBox;
