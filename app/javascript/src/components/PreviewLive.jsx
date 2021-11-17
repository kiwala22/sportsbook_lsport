import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import FixtureChannel from "../../channels/fixturesChannel";
import LiveOddsChannel from "../../channels/liveOddsChannel";
import MarketsChannel from "../../channels/marketsChannel";
import addBet from "../redux/actions";
import * as DataUpdate from "../utilities/DataUpdate";
import format from "../utilities/format";
import Mobile from "../utilities/Mobile";
import oddsFormatter from "../utilities/oddsFormatter";
import Requests from "../utilities/Requests";
import Preview from "./Skeleton";

const PreviewLive = (props) => {
  const [fixture, setFixture] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();

  useEffect(() => {
    getfixture();
  }, [props]);

  function getfixture() {
    var path = `/api/v1/fixtures/soccer/live_fixture${props.location.search}`;
    var values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        setFixture(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        setPageLoading(true);
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
  }

  const updateMatchInfo = (data, currentState, setState, market, channel) => {
    console.log(currentState);
    let updatedData = DataUpdate.fixtureUpdate(
      data,
      currentState,
      market,
      channel
    );
    setState(updatedData);
    console.log("Setter complete");
  };

  return (
    <>
      {!pageLoading && (
        <>
          <div className={Mobile.isMobile() ? "fixture-box" : "game-box"}>
            <div className="card" id="show-markets">
              <div className="card-header">
                <FixtureChannel
                  channel="FixtureChannel"
                  fixture={fixture.id}
                  received={(data) => {
                    updateMatchInfo(data, fixture, setFixture, _, "Fixture");
                  }}
                >
                  <h6>
                    <span className="float-left">
                      <span>
                        {fixture.part_one_name}{" "}
                        <span className="score">
                          {fixture.home_score} <BsDash /> {fixture.away_score}{" "}
                        </span>
                        {fixture.part_two_name}
                      </span>
                    </span>
                    <span className="float-right blinking match-time">
                      {fixture.match_time}
                    </span>
                  </h6>
                </FixtureChannel>
              </div>
              <div className={Mobile.isMobile() ? "fix-body" : "card-body"}>
                <div className="row">
                  <div
                    className={Mobile.isMobile() ? "col-sm-12" : "col-lg-12"}
                  >
                    {
                      /* Iteration to start here */

                      fixture.markets
                        .filter((el) => el.name !== null)
                        .map((market) => (
                          <>
                            <MarketsChannel
                              channel="MarketsChannel"
                              fixture={fixture.id}
                              market={market.market_identifier}
                              received={(data) => {
                                updateMatchInfo(
                                  data,
                                  fixture,
                                  setFixture,
                                  data.market_identifier,
                                  "Market"
                                );
                              }}
                            >
                              <div
                                className={
                                  Mobile.isMobile()
                                    ? "market-label market-label-fixture"
                                    : "market-label"
                                }
                              >
                                <div className="row">
                                  {market.name == "1X2" ? (
                                    <div className="col-lg-12 ">
                                      Match Result 1X2
                                    </div>
                                  ) : (
                                    <div className="col-lg-12 ">
                                      {market.name}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </MarketsChannel>
                            {/* Iteration of Odds */}
                            <div className="market-odds mb-3 mt-3">
                              <LiveOddsChannel
                                channel="LiveOddsChannel"
                                fixture={fixture.id}
                                market={market.market_identifier}
                                received={(data) => {
                                  updateMatchInfo(
                                    data,
                                    fixture,
                                    setFixture,
                                    data.market_identifier,
                                    "Live"
                                  );
                                }}
                              >
                                <div className="row">
                                  {Object.keys(format(market.odds)).map(
                                    (element, index) => (
                                      <>
                                        <div
                                          className={`col-lg-${
                                            12 / Object.keys(market.odds).length
                                          }`}
                                        >
                                          <a
                                            className={
                                              market.odds === undefined ||
                                              oddsFormatter(
                                                market.odds[element]
                                              ) == parseFloat(1.0).toFixed(2) ||
                                              market.status != "Active"
                                                ? "btn btn-light wagger-btn intialise_input disabled"
                                                : "btn btn-light wagger-btn intialise_input"
                                            }
                                            onClick={() =>
                                              addBet(
                                                dispatcher,
                                                element.substring(8),
                                                "LiveMarket",
                                                fixture.id,
                                                `${
                                                  market.name
                                                } - ${element.substring(8)}`,
                                                market.market_identifier,
                                                market.specifier
                                              )
                                            }
                                          >
                                            <span>
                                              {/* {Strings(market.name, index)} */}
                                              {element.substring(8)}
                                            </span>
                                            <span className="wagger-amt">
                                              {oddsFormatter(
                                                market.odds[element]
                                              )}
                                            </span>
                                          </a>
                                        </div>
                                      </>
                                    )
                                  )}
                                </div>
                              </LiveOddsChannel>
                            </div>
                          </>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* {pageLoading && <Spinner />} */}
      {pageLoading && <Preview />}
    </>
  );
};

export default withRouter(PreviewLive);
