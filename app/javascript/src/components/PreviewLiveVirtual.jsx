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
import oddsFormatter from "../utilities/oddsFormatter";
import Requests from "../utilities/Requests";
import Preview from "./Skeleton";

const PreviewLiveVirtual = (props) => {
  const [fixture, setFixture] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();

  useEffect(() => {
    getfixture();
  }, [props]);

  function getfixture() {
    var path = `/api/v1/fixtures/virtual_soccer/live_fixture${props.location.search}`;
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
  };

  return (
    <>
      {!pageLoading && (
        <>
          <div className="game-box">
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
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <MarketsChannel
                      channel="MarketsChannel"
                      fixture={fixture.id}
                      received={(data) => {
                        updateMatchInfo(
                          data,
                          fixture,
                          setFixture,
                          `${data.market}`,
                          "Market"
                        );
                      }}
                    >
                      <div className="market-label">
                        <div className="row">
                          <div className="col-lg-12 ">
                            Match Result 1X2 - FT
                          </div>
                        </div>
                      </div>
                    </MarketsChannel>
                    <div className="market-odds mb-3 mt-3">
                      <LiveOddsChannel
                        channel="LiveOddsChannel"
                        fixture={fixture.id}
                        market="1"
                        received={(data) => {
                          updateMatchInfo(
                            data,
                            fixture,
                            setFixture,
                            "1",
                            "Live"
                          );
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1",
                                  "Market1Live",
                                  fixture.id,
                                  "1X2 FT - 1"
                                )
                              }
                            >
                              <span>Home Win</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt1_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt1_1)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "X",
                                  "Market1Live",
                                  fixture.id,
                                  "1X2 FT - X"
                                )
                              }
                            >
                              <span>Draw</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt1_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt1_X)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "2",
                                  "Market1Live",
                                  fixture.id,
                                  "1X2 FT - 2"
                                )
                              }
                            >
                              <span>Away Win</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt1_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt1_2)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>
                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">Double Chance - FT</div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <LiveOddsChannel
                        channel="LiveOddsChannel"
                        fixture={fixture.id}
                        market="7"
                        received={(data) => {
                          updateMatchInfo(
                            data,
                            fixture,
                            setFixture,
                            "7",
                            "Live"
                          );
                        }}
                      >
                        <div className="row market">
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1X",
                                  "Market7Live",
                                  fixture.id,
                                  "Double Chance FT - HW/DR"
                                )
                              }
                            >
                              <span>Home Win / Draw</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt7_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt7_1X)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "12",
                                  "Market7Live",
                                  fixture.id,
                                  "Double Chance FT - HW/AW"
                                )
                              }
                            >
                              <span>Home / Away</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt7_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt7_12)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "X2",
                                  "Market7Live",
                                  fixture.id,
                                  "Double Chance FT - DR/AW"
                                )
                              }
                            >
                              <span>Draw / Away Win</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt7_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt7_X2)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>
                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">
                          Asian Handicap 1 Goal - FT
                        </div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <LiveOddsChannel
                        channel="LiveOddsChannel"
                        fixture={fixture.id}
                        market="3"
                        received={(data) => {
                          updateMatchInfo(
                            data,
                            fixture,
                            setFixture,
                            "3",
                            "Live"
                          );
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1",
                                  "Market3Live",
                                  fixture.id,
                                  "Handicap 1 FT - HW"
                                )
                              }
                            >
                              <span>
                                Home <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.market_mkt3_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt3_1)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "2",
                                  "Market3Live",
                                  fixture.id,
                                  "Handicap 1 FT - AW"
                                )
                              }
                            >
                              <span>
                                Away <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.market_mkt3_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt3_2)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>
                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">
                          Under 2.5 / Over 2.5 - FT
                        </div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <LiveOddsChannel
                        channel="LiveOddsChannel"
                        fixture={fixture.id}
                        market="2"
                        received={(data) => {
                          updateMatchInfo(
                            data,
                            fixture,
                            setFixture,
                            "2",
                            "Live"
                          );
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Under",
                                  "Market2Live",
                                  fixture.id,
                                  "Total 2.5 FT - Under 2.5"
                                )
                              }
                            >
                              <span>Under 2.5</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt2_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt2_Under)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Over",
                                  "Market2Live",
                                  fixture.id,
                                  "Total 2.5 FT - Over 2.5"
                                )
                              }
                            >
                              <span>Over 2.5</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt2_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt2_Over)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>

                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">Both to Score - FT</div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <LiveOddsChannel
                        channel="LiveOddsChannel"
                        fixture={fixture.id}
                        market="17"
                        received={(data) => {
                          updateMatchInfo(
                            data,
                            fixture,
                            setFixture,
                            "17",
                            "Live"
                          );
                        }}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Yes",
                                  "Market17Live",
                                  fixture.id,
                                  "Both To Score FT - Yes"
                                )
                              }
                            >
                              <span>Yes</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt17_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt17_Yes)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "No",
                                  "Market17Live",
                                  fixture.id,
                                  "Both To Score FT - No"
                                )
                              }
                            >
                              <span>No</span>
                              <span className="wagger-amt">
                                {fixture.market_mkt17_status == "Active"
                                  ? oddsFormatter(fixture.outcome_mkt17_No)
                                  : 1.0}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>
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

export default withRouter(PreviewLiveVirtual);