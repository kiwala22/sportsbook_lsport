// This will connect the liveodds, preodds and betslip channels
import React, { useEffect } from "react";
import consumer from "./consumer";

const BetSlipsChannel = (props) => {
  useEffect(() => {
    const channel = consumer.subscriptions.create(
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

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return <>{props.children}</>;
};

export default BetSlipsChannel;
