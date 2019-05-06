import React, { useState } from "react";

const CommentBox = ({ title, update, value, reset }) => {
  const [comment, setComment] = useState("");
  return (
    <form>
      <textarea
        name="leaveComment"
        autoFocus
        placeholder="Please leave a comment"
        onChange={event => setComment(event.target.value)}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            e.preventDefault();
            update(title, value, comment);
            reset();
          }
        }}
      />
      <button
        onClick={e => {
          e.preventDefault();
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
