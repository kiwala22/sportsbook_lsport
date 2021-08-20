import React from "react";
import BannerOne from "../Images/side_banner_1.webp";
import BannerTwo from "../Images/side_banner_2.webp";

const SideBanner = () => {
  return (
    <>
      <div className="card ">
        <div className="card-header side-banner ">
          <img src={BannerOne} />
        </div>
      </div>
      <br />
      <div className="card ">
        <div className="card-header side-banner ">
          <img src={BannerTwo} />
        </div>
      </div>
    </>
  );
};
export default SideBanner;
