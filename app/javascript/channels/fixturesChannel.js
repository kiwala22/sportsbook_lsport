// This will connect the liveodds, preodds and betslip channels
import React from "react";
import consumer from "./consumer";

const FixtureChannel = (props) => {
  consumer.subscriptions.create(
    {
      channel: props.channel,
      fixture: props.fixture,
    },
    {
      connected() {
        //when channel is ready for use
      },
      disconnected() {
        //when channel is disconnected
      },
      received(data) {
        //when data is received
        console.log("received");
        props.received(data);
      },
    }
  );
  return <>{props.children}</>;
};

export default FixtureChannel;