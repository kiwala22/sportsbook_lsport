import React from "react";
import ReactDOM from "react-dom";

const Footer = (props) => {
  return (
    <>
      <div className="container">
        <>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-6">
              <ul className="footer-size">
                <li>
                  <a href="#">Faq</a>
                </li>
                <li>
                  <a href="#">Privacy</a>
                </li>
                <li>
                  <a href="#">Game Rules</a>
                </li>
                <li>
                  <a href="#">Terms and Conditions</a>
                </li>
                <li>
                  <a href="#">Support contact</a>
                </li>
                <li>
                  SkylineBet is licensed by the National Gaming Board of Uganda.
                  Licence #__ Reg. Number:__ . You have to be 18 years and above
                  to bet. Betting is addictive and can be psychologically
                  harmful.
                </li>
              </ul>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Footer;

document.addEventListener("DOMContentLoaded", () => {
  const footing = document.getElementById("footer");
  ReactDOM.render(<Footer />, footing);
});
