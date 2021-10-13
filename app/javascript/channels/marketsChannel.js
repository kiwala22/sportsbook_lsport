// This will connect the fixtures and markets channels
import React, { useEffect } from "react";
import consumer from "./consumer";

const MarketsChannel = (props) => {
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

export default MarketsChannel;
