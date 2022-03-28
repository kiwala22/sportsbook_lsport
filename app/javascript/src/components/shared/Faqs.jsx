import React from "react";
import { useSelector } from "react-redux";

const Faqs = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className={isMobile ? "game-box mobile-table-padding" : "game-box"}>
        <div className="card">
          <div className="card-header">
            <h3>About Us</h3>
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
                  About Us
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
                <div className="heads paragraph">
                  <h4>
                    <strong>Introduction</strong>
                  </h4>
                  <p>
                    BetSports is a&nbsp;Standard, licensed and well-funded
                    sports betting company that will be located in Bukoto
                    Kampala, Uganda. We at BetSports have been able to secure a
                    standard facility in the central and easy to locate Bukoto
                    Street in Kampala.
                  </p>
                  <p>
                    While offering generous bonuses and more favourable
                    odds,&nbsp;Betsports&nbsp;Uganda Limited bring&nbsp;product
                    innovation, which benefits consumers by way of enhanced user
                    experience.&nbsp;
                  </p>
                  <p>BetSports</p>
                  <p>
                    Betsports gives&nbsp;dreamer&nbsp;chasers&nbsp;their
                    opportunity to&nbsp;achieve greater heights by staking as
                    little as UGX 1. Being an online betting platform, it gives
                    the client to have a 24 how access to variety of games
                    across the world.
                  </p>
                  <p>
                    <br />
                    <strong>Join Betsports for a range of goodies like:</strong>
                  </p>
                  <p>-&gt; Bet small from just UGX 1</p>
                  <p>-&gt; Get a 20% bonus on first deposit</p>
                  <p>
                    -&gt; Enjoy a 24/7 access to an easy to load gaming platform
                  </p>
                  <p>-&gt; Play Virtual and Games at your convenience</p>
                  <p>
                    -&gt; Get 24/7 customer support that speaks your language
                  </p>
                  <p>
                    <br />
                  </p>
                  <p>
                    <strong>Betsports Products&nbsp;</strong>
                  </p>
                  <p>
                    Betsports offers an online sports betting platform, with a
                    wide range of games that include
                  </p>
                  <ul>
                    <li>
                      <p>
                        • Football &ndash; including all major leagues, and
                        tournaments
                      </p>
                    </li>
                    <li>
                      <p>• Basketball</p>
                    </li>
                    <li>
                      <p>• Tennis</p>
                    </li>
                    <li>
                      <p>• Virtual sports</p>
                    </li>
                    <li>
                      <p>• Horse Racing</p>
                    </li>
                    <li>
                      <p>• Dog Racing&nbsp;</p>
                    </li>
                    <li>
                      <p>• And many more</p>
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

export default Faqs;
