import React from "react";
import { Link } from "react-router-dom";

const Footer = (props) => {
  return (
    <>
      <div className="copyright" id="footer">
        <div className="container">
          <>
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-6">
                <ul className="footer-size">
                  <li>
                    <Link to={"/faqs/"}>Faqs</Link>
                  </li>
                  <li>
                    <Link to={"/privacy/"}>Privacy</Link>
                  </li>
                  <li>
                    <Link to={"/rules/"}>Game Rules</Link>
                  </li>
                  <li>
                    <Link to={"/terms/"}>Terms and Condition</Link>
                  </li>
                  <li>
                    <Link to={"/contacts/"}>Support Contacts</Link>
                  </li>
                  <li>
                    SkylineBet is licensed by the National Gaming Board of
                    Uganda. Licence #__ Reg. Number:__ . You have to be 18 years
                    and above to bet. Betting is addictive and can be
                    psychologically harmful.
                  </li>
                </ul>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Footer;
