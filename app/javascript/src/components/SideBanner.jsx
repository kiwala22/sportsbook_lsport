import React from "react";
import BannerOne from "../Images/side_banner_1.webp";
import BannerTwo from "../Images/side_banner_2.webp";
import Mobile from "../utilities/Mobile";

const SideBanner = () => {
  return (
    <>
      {!Mobile.isMobile() && (
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
