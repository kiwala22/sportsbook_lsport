// This will connect the liveodds, preodds and betslip channels
import React from "react";
import consumer from "./consumer";

const BetSlipsChannel = (props) => {
  consumer.subscriptions.create(
    {
      channel: props.channel,
      fixture: props.fixture,
      market: props.market,
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
        props.received(data);
      },
    }
  );
  return <>{props.children}</>;
};

export default BetSlipsChannel;
