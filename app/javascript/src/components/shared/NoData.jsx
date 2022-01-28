import { Empty } from "antd";
import React from "react";
import NotFound from "../../Images/empty.svg";

export default function NoData(description) {
  return (
    <Empty
      image={<img src={NotFound} className="empty-image-custom" />}
      imageStyle={{
        height: 70,
      }}
      description={
        <span className="font-18">{`There are no ${description} at the moment.`}</span>
      }
    >
      {/* <Button className="btn btn-primary mt-lg reload-btn border-transparent">
          RELOAD
        </Button> */}
    </Empty>
  );
}
