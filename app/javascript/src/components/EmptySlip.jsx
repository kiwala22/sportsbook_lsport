import { Empty } from "antd";
import React from "react";
import NotFound from "../Images/empty.svg";

export default function EmptySlip() {
  return (
    <Empty
      image={<img src={NotFound} className="empty-image-custom" />}
      imageStyle={{
        height: 70,
      }}
      description={<span className="font-18">No Games Selected</span>}
    ></Empty>
  );
}
