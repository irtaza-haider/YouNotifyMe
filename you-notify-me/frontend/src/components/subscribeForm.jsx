import React, { useState } from "react";
import * as verify from "../api/verify";

function SubscribeForm(props) {
  const [subscriber, setSubscriber] = useState({
    name: "",
    zipcode: 0,
    phoneNumber: "",
  });

  const onPhoneNumberChange = (event) => {
    setSubscriber((prevState) => ({
      ...prevState,
      phoneNumber: event.target.value,
    }));
  };

  const onzipcodeChange = (event) => {
    setSubscriber((prevState) => ({
      ...prevState,
      zipcode: event.target.value,
    }));
  };

  const onNameChange = (event) => {
    setSubscriber((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const onSubmit = () => {
    verify.getCode(subscriber.phoneNumber);
    props.setSubscriber(subscriber);
    props.setShowOpt(true);
  };

  return (
    <React.Fragment>
      <label>
        First Name:
        <input type="text" name="Name" onChange={onNameChange} />
      </label>
      <label>
        Phone number:
        <input type="tel" name="Phone number" onChange={onPhoneNumberChange} />
      </label>

      <label>
        Zip code:
        <input type="number" name="Zip code" onChange={onzipcodeChange} />
      </label>
      <input type="submit" value="Submit" onClick={() => onSubmit()} />
    </React.Fragment>
  );
}

export default SubscribeForm;
