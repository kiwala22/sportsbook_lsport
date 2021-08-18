// This will connect the fixtures and markets channels
import React from "react";
import consumer from "./consumer";

export default function (props) {
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
        props.received(data);
      },
    }
  );
  return <div>{props.children}</div>;
}
