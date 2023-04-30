import React, { useState } from "react";
import * as verify from "../api/verify";

function Opt(props) {
  const [enteredCode, setEnteredCode] = useState(0);
  const [responseStatus, setResponseStatus] = useState(0);

  const onCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const onSubmit = () => {
    // TODO: Add validation to ensure only 6 digits entered
    verify
      .verifyCodeAndSubscribe(
        enteredCode,
        props.subscriber.name,
        props.subscriber.phoneNumber,
        props.subscriber.zipcode
      )
      .then((response) => {
        setResponseStatus(response.status);
      });
  };

  return (
    <React.Fragment>
      <h1>
        "Please enter the six digit code that has been sent to your phone
        number"
      </h1>
      <label>
        Code
        <input type="number" onChange={onCodeChange} />
      </label>
      <input type="submit" value="Submit" onClick={() => onSubmit()} />
      {responseStatus === 400 && (
        <h1>You've entered an incorrect code. Please try again</h1>
      )}
      {responseStatus === 409 && (
        <h1>This phone number has already been registered</h1>
      )}
      {responseStatus === 200 && <h1>Congratulation, you're subscribed!!</h1>}
    </React.Fragment>
  );
}

export default Opt;
