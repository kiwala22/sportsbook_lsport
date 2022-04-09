import React from "react";
import { useSelector } from "react-redux";
import Banner from "../../Images/sidder.webp";
import SecondaryBanner from "../../Images/sidder-2.webp";

const SideBanner = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      {!isMobile && (
        <>
          {/* Primary banner */}
          <div className="card ">
            <div className="card-header side-banner ">
              <img src={Banner} className="" />
            </div>
          </div>
          {/* Secondary Banner */}
          <div className="card ">
            <div className="card-header side-banner ">
              <img src={SecondaryBanner} className="" />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default SideBanner;
