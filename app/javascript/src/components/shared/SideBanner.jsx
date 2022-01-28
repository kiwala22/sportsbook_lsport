import React from "react";
import { useSelector } from "react-redux";
import BannerOne from "../../Images/side_banner_1.webp";
import BannerTwo from "../../Images/side_banner_2.webp";

const SideBanner = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      {!isMobile && (
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
      )}
    </>
  );
};
export default SideBanner;
