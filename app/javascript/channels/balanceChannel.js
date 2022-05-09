import React, { useEffect } from "react";
import consumer from "./consumer";

const BalanceChannel = (props) => {
  useEffect(() => {
    const channel = consumer.subscriptions.create(
      {
        channel: props.channel,
        user: props.user,
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

export default BalanceChannel;
