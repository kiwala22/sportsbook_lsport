// This will connect the liveodds, preodds and betslip channels
import React, { useEffect } from "react";
import consumer from "./consumer";

const FixtureChannel = (props) => {
  useEffect(() => {
    const channel = consumer.subscriptions.create(
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

export default FixtureChannel;
