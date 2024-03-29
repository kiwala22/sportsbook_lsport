import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      {isMobile && (
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
                            <Link to={"/about/"}>About Us</Link>
                          </li>
                          <li className="col-3">
                            <Link to={"/responsible_gambling/"}>
                              Responsible Gambling
                            </Link>
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
                      <Link to={"/contacts/"}>Support Info</Link>
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
      {!isMobile && (
        <div className="copyright" id="footer">
          <div className="container">
            <>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-6">
                  <ul className="footer-size custom-anchor">
                    <li>
                      <Link to={"/about/"}>About Us</Link>
                    </li>
                    <li>
                      <Link to={"/responsible_gambling/"}>
                        Responsible Gambling
                      </Link>
                    </li>
                    <li>
                      <Link to={"/rules/"}>Game Rules</Link>
                    </li>
                    <li>
                      <Link to={"/terms/"}>Terms and Conditions</Link>
                    </li>
                    <li>
                      <Link to={"/contacts/"}>Support Info</Link>
                    </li>
                    <li>
                      BetSports is licensed by the National Gaming Board of
                      Uganda. License #: <strong>GB-69-056</strong>. You have to
                      be 25 years and above to bet. Betting is addictive and can
                      be psychologically harmful.
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
