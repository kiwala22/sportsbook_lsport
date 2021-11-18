import React from "react";
import { useSelector } from "react-redux";

const Privacy = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className={isMobile ? "game-box mobile-table-padding" : "game-box"}>
        <div className="card">
          <div className="card-header">
            <h3>SkylineBet Privacy</h3>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Privacy
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="heads">
                  <ul>
                    <li>
                      <div>
                        <h6>PRIVACY</h6>
                        <p className="paragraph">
                          We will take all reasonable steps to ensure that your
                          information is kept secure and protected. All personal
                          data is stored in the database of the company and will
                          not be passed on to third parties except as required
                          by Ugandan law. The company reserves the right to
                          relay suspected offender’s details to sporting bodies
                          or authorities which deal with the investigation of
                          offences concerning match fixing or price manipulation{" "}
                        </p>
                        <br />
                        <h6>1) COLLECTION AND USAGE OF INFORMATION</h6>
                        <span className="paragraph">
                          <ul className="lists">
                            <li>
                              • The information and data about you which we may
                              collect, use and process includes the following
                            </li>
                            <li>
                              • Information that you provide to us by filling in
                              forms on the website or any other information you
                              submit to us via the website or email.
                            </li>
                            <li>
                              • Records of correspondence whether via the
                              website, email, telephone or other means.
                            </li>
                            <li>
                              • Your responses to surveys or customer research
                              that we carry out.
                            </li>
                            <li>
                              • Details of the transactions you carry out with
                              us, whether via website , telephone or other means
                            </li>
                            <li>
                              • Details of your visits on the website including,
                              but not limited to, traffic data, location data,
                              weblogs and other communication data.
                            </li>
                          </ul>
                        </span>
                        <span className="paragraph">
                          <p className="paragraph">
                            We may use your personal information and data
                            together with other information for the purposes of
                          </p>
                          <ul className="lists">
                            <li> 1) Processing your bets and payments.</li>
                            <li>
                              2) Setting up , operating and managing your
                              account
                            </li>
                            <li>
                              3) Complying with our legal and regulatory duties.
                            </li>
                            <li>4) Carrying out customer analysis.</li>
                            <li>
                              5) Providing you with information about
                              promotional offers and our products and services
                              where you have consented. 6) Monitoring
                              transactions for the purposes of preventing fraud,
                              irregular betting, cheating and money laundering.
                            </li>
                          </ul>
                        </span>
                        <br />
                        <h6>DISCLOSURE</h6>
                        <p className="paragraph">
                          We are entitled to share the information we hold on
                          you which includes personal data and betting history
                          with the regulator, sporting bodies and other bodies,
                          including the police in order to investigate fraud and
                          money laundering.
                        </p>
                        <br />
                        <h6>SECURITY</h6>
                        <p className="paragraph">
                          We will take all the reasonable steps as required by
                          law to ensure that the personal information we collect
                          is accurately recorded and kept securely. All personal
                          information will be destroyed when it is no longer
                          required to be retained or by law.
                        </p>
                        <p className="paragraph">
                          We do not warrant the security of any information
                          which you transmit to us over the Internet. Any
                          information which you transmit to us is transmitted at
                          your own risk. However, once we receive your
                          transmission, we will take reasonable steps to protect
                          your personal information from misuse, loss or
                          unauthorized access.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
