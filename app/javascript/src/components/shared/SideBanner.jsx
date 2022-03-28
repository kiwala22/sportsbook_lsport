import React from "react";
import { useSelector } from "react-redux";
import Banner from "../../Images/sidder.webp"

const SideBanner = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      {!isMobile && (
        <>
          <div className="card ">
            <div className="card-header side-banner ">
              <img src={Banner} className=""/>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default SideBanner;
