import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Rating from "react-rating";
import CommentBox from "../CommentBox";

const FeedbackCard = ({ item, update }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const resetRatingValue = () => {
    setRatingValue(0);
  };
  return (
    <>
      <Paper>
        <>{item.title}</>
        <br />
        {ratingValue === 0 ? (
          <Rating
            initialRating={item.rating / 2}
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            style={{ color: "rgba(248, 180, 22, 1)" }}
            fractions={2}
            onClick={value => setRatingValue(value)}
          />
        ) : (
          <CommentBox
            title={item.title}
            update={update}
            value={ratingValue}
            reset={resetRatingValue}
          />
        )}
      </Paper>
    </>
  );
};

export default FeedbackCard;
