import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import shortUUID from "short-uuid";
import FixtureChannel from "../../../channels/fixturesChannel";
import LiveOddsChannel from "../../../channels/liveOddsChannel";
import MarketsChannel from "../../../channels/marketsChannel";
import addBet from "../../redux/actions";
import * as DataUpdate from "../../utilities/DataUpdate";
import format from "../../utilities/format";
import oddsFormatter from "../../utilities/oddsFormatter";
import Requests from "../../utilities/Requests";
import Preview from "../shared/Skeleton";

const PreviewLive = (props) => {
  const [fixture, setFixture] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [_, setGreeting] = useState("");
  const dispatcher = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);

  useEffect(() => {
    getfixture();
  }, [props]);

  function getfixture() {
    var path = `/api/v1/fixtures/basketball/live_fixture${props.location.search}`;
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
    let updatedData = DataUpdate.fixtureUpdate(
      data,
      currentState,
      market,
      channel
    );
    setState(updatedData);

    // Forcing Re-render //to be reviewed
    setGreeting(Math.random());
  };

  return (
    <>
      {!pageLoading && (
        <>
          <div className={isMobile ? "fixture-box" : "game-box"}>
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
              <div className={isMobile ? "fix-body" : "card-body"}>
                <div className="row">
                  <div className={isMobile ? "col-sm-12" : "col-lg-12"}>
                    {
                      /* Iteration to start here */

                      fixture.markets
                        .filter((el) => el.name !== null)
                        .map((market) => (
                          <React.Fragment key={shortUUID.generate()}>
                            <MarketsChannel
                              channel="MarketsChannel"
                              fixture={fixture.id}
                              market={market.market_identifier}
                              received={(data) => {
                                updateMatchInfo(
                                  data,
                                  fixture,
                                  setFixture,
                                  _,
                                  "Market"
                                );
                              }}
                            >
                              <div
                                className={
                                  isMobile
                                    ? "market-label market-label-fixture"
                                    : "market-label"
                                }
                              >
                                <div className="row">
                                  <div className="col-lg-12 ">
                                    <strong>{market.name} {market.specifier !== null? ` ${<BsDash/>} ${market.specifier}`:""}</strong>
                                  </div>
                                </div>
                              </div>
                            </MarketsChannel>
                            {/* Iteration of Odds */}
                            <div className="market-odds ">
                              <LiveOddsChannel
                                channel="LiveOddsChannel"
                                fixture={fixture.id}
                                market={market.market_identifier}
                                received={(data) => {
                                  updateMatchInfo(
                                    data,
                                    fixture,
                                    setFixture,
                                    _,
                                    "Live"
                                  );
                                }}
                              >
                                <div className="d-flex justify-content-around">
                                  {Object.keys(format(market.odds)).map(
                                    (element, index) => (
                                      <React.Fragment key={index}>
                                        <div
                                          className={`pl-2 pr-2 col-lg-${
                                            Object.keys(market.odds).length %
                                              2 ==
                                            0
                                              ? 6
                                              : 4
                                          } col-sm-${
                                            Object.keys(market.odds).length %
                                              2 ==
                                            0
                                              ? 6
                                              : 4
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
                                      </React.Fragment>
                                    )
                                  )}
                                </div>
                              </LiveOddsChannel>
                            </div>
                          </React.Fragment>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {pageLoading && <Preview />}
    </>
  );
};

export default withRouter(PreviewLive);
