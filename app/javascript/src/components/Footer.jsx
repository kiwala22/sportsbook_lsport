import React from "react";
import { Link } from "react-router-dom";
import Mobile from "../utilities/Mobile";

const Footer = (props) => {
  return (
    <>
      {Mobile.isMobile() && (
        <>
          <div className="copyright">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div></div>

                  <div className="collapse navbar-collapse" id="footer_more">
                    <div className="row">
                      <div className="col-12">
                        <ul
                          id="mobile-shortcuts2"
                          className="d-flex justify-content-between custom-anchor"
                        >
                          <li className="col-2">
                            <Link to={"/faqs/"}>Faqs</Link>
                          </li>
                          <li className="col-3">
                            <Link to={"/privacy/"}>Privacy</Link>
                          </li>
                          <li className="col-4">
                            <Link to={"/terms/"}>{`T & Cs`}</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <ul
                    className="d-flex justify-content-between m-footer-list custom-anchor"
                    data-controller="footer"
                  >
                    <li>
                      <Link to={"/rules/"}>Game Rules</Link>
                    </li>
                    <li>
                      <Link to={"/contacts/"}>Support Contacts</Link>
                    </li>
                    <li>
                      <a
                        className="navbar-toggler toggler-example"
                        data-toggle="collapse"
                        data-target="#footer_more"
                      >
                        More{" "}
                        <span className="dark-blue-text">
                          <i className="fas fa-bars fa-1x fa-fw"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {!Mobile.isMobile() && (
        <div className="copyright" id="footer">
          <div className="container">
            <>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-6">
                  <ul className="footer-size custom-anchor">
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
                      Uganda. Licence #__ Reg. Number:__ . You have to be 18
                      years and above to bet. Betting is addictive and can be
                      psychologically harmful.
                    </li>
                  </ul>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
