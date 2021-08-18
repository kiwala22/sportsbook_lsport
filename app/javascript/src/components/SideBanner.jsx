import React from "react";
import ReactDOM from "react-dom";
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

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banners");
  banner && ReactDOM.render(<SideBanner />, banner);
});
