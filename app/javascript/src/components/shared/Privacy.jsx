import React from "react";
import { useSelector } from "react-redux";

const Privacy = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className={isMobile ? "game-box mobile-table-padding" : "game-box"}>
        <div className="card">
          <div className="card-header">
            <h3>BetSports Responsible Gambling</h3>
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
                  Responsible Gambling
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
                        <h4>RESPONSIBLE GAMBLING</h4>
                        <p className="paragraph">
                        We believe in responsible gambling and want you to always enjoy playing 
                        with us by staying in control and only betting what you can afford. 
                        If you ever feel like gambling has become a problem, 
                        tell us and we’ll be in touch to help.{" "}
                        </p>
                        <h5>1) MAINTAINING CONTROL</h5>
                        <span className="paragraph">
                          <ul className="lists">
                            <li>
                              • Consider gambling a form of entertainment, not a source of income.
                            </li>
                            <li>
                              • Accept gambling as a game of chance with no formulas to guarantee success.
                            </li>
                            <li>
                              • Don’t let gambling interfere with daily life activities and family responsibilities.
                            </li>
                            <li>
                              • Avoid gambling when under the influence of alcohol or emotional stress.
                            </li>
                            <li>
                              • Establish affordable daily/weekly/month deposit levels and stick to them.
                            </li>
                            <li>
                              • Never chase your losses or try to recoup debts.
                            </li>
                            <li>
                              • Take regular breaks and track your betting activity.
                            </li>
                            <li>
                            <h6>Monitor your betting activity</h6>
                             <p>Check your account statement regularly to stay in control of your betting activity, deposits and withdrawals.</p>
                            </li>
                          </ul>
                        </span>
                        <span className="paragraph">
                          <h5>2) WARNING SIGNS</h5>
                          <p className="paragraph">
                          If gambling feels like a burden but you can’t stop, it’s likely to indicate a problem. These are some signs to look out for, though there may be others.
                          If you recognise a few, we recommend seeking help:
                          </p>
                          <ul className="lists">
                            <li>• You perceive gambling solely as a way of making money</li>
                            <li>• Gambling negatively affects your daily life and family responsibilities</li>
                            <li>• You are neglecting personal needs like food and sleep because of it</li>
                            <li>• You are betting more than you can afford</li>
                            <li>• You steal or borrow to try to rectify the results of your gambling</li>
                            <li>• You gamble because of frustration or other negative feelings</li>
                            <li>• You are trying to conceal your gambling or its consequences</li>
                            <li>• You have repeatedly failed in efforts to control your gambling</li>
                            <li>• Others say you have a gambling addiction</li>
                          </ul>
                        </span>
                        <span className="paragraph">
                          <h5>3) Self-exclusion</h5>
                          <p className="paragraph">If you believe you may have a gambling problem, please consider self-exclusion.</p>
                          <h6>What is self-exclusion?</h6>
                          <p className="paragraph">Self-exclusion is where we close your account at your request. There are two options: temporary and permanent. Temporary exclusion makes your account inaccessible until you’re ready to go back to it. 
                            Permanent exclusion is irreversible, meaning you can never access it again.</p>
                          <p>Whenever a customer self-excludes, we do everything in our power to ensure this is honoured. 
                            Please don’t try to bypass our measures to start betting again as we’re not liable if this happens.</p>
                          <h6>Want to self-exclude?</h6>
                          <p className="paragraph">We’ll give you a call to make it happen</p>
                          <h6>Why self-exclude?</h6>
                          <p className="paragra[h">It’s a proven method of helping overcome gambling problems. Once your account is closed, we advise returning to any daily activities that were affected by gambling, and seeking further help if needed. </p>
                        </span>

                        <span className="paragraph">
                          <h5>4) Preventing Underage Gambling</h5>
                          <p className="paragraph">
                          By registering and betting with BetSports , you confirm that you’re at least 18 years old. We reserve the right to verify your age and exclude you from our services if there are any doubts over your age. 
                          If you’re found to be underage, all your winnings will be forfeited and your account disabled.
                          </p>
                          <p className="paragraph">
                          Any Client using the Company services who is identified as underage shall have all winnings forfeited and his betting account disabled.
                          </p>
                        </span>
                        
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
