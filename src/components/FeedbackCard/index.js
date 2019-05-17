import React, { useState } from "react";
import Rating from "react-rating";
import CommentBox from "../CommentBox";

const FeedbackCard = ({
  item,
  update,
  setAdminFeedbackRating,
  setAdminFeedbackComment
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const resetRatingValue = () => {
    setRatingValue(0);
  };
  return (
    <>
      <>{item.title}</>
      <br />
      {ratingValue === 0 ? (
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
      ) : (
        <CommentBox
          title={item.title}
          update={update}
          value={ratingValue}
          reset={resetRatingValue}
          setAdminFeedbackComment={setAdminFeedbackComment}
        />
      )}
    </>
  );
};

export default FeedbackCard;
