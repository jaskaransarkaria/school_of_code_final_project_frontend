import React from "react";

const AdminPageScheduleTimes = props => {
  const scheduleTimings = [
    "09.00 - 10.00",
    "10.00 - 11.00",
    "11.00 - 12.00",
    "13.00 - 14.00",
    "14.00 - 15.00",
    "15.00 - 16.00",
    "16.00 - 17.00 "
  ];

  const setTimeInParent = event => {
    const valueToSend = event.target.value;
    props.props(props.index, valueToSend);
  };

  return (
    <>
      <select
        value={props.startValue}
        onChange={event => setTimeInParent(event)}
      >
        {scheduleTimings.map(item => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </>
  );
};

export default AdminPageScheduleTimes;
