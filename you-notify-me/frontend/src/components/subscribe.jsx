import React, { useState } from "react";
import SubscribeForm from "./subscribeForm";
import Opt from "./otp";

function Subscribe() {
  const [showOpt, setShowOpt] = useState(false);
  const [subscriber, setSubscriber] = useState({});

  return (
    <React.Fragment>
      {showOpt ? (
        <Opt subscriber={subscriber} />
      ) : (
        <SubscribeForm setShowOpt={setShowOpt} setSubscriber={setSubscriber} />
      )}
    </React.Fragment>
  );
}

export default Subscribe;
