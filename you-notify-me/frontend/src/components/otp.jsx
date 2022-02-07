import React, { useState } from "react";
import * as verify from "../api/verify";

function Opt(props) {
  const [enteredCode, setEnteredCode] = useState(0);
  const [incorrectCode, setInorrectCode] = useState(false);
  const [correctCode, setCorrectCode] = useState(false);

  const onCodeChange = (event) => {
    setEnteredCode(event.target.value);
  };

  const onSubmit = () => {
    let approved = verify.verifyCodeAndSubscribe(
      enteredCode,
      props.subscriber.name,
      props.subscriber.phoneNumber,
      props.subscriber.zipcode
    );
    setCorrectCode(approved);
    setInorrectCode(!approved);
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
      {incorrectCode && (
        <h1>You've entered an incorrect code. Please try again</h1>
      )}
      {correctCode && <h1>Congratulation, you're subscribed!!</h1>}
    </React.Fragment>
  );
}

export default Opt;
