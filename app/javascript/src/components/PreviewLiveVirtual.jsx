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
import Mobile from "../utilities/Mobile";
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
                    <MarketsChannel
                      channel="MarketsChannel"
                      fixture={fixture.id}
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
                              className={
                                fixture.market_1_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_1_odds["outcome_1"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_1_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1",
                                  "LiveMarket",
                                  fixture.id,
                                  "1X2 FT - 1",
                                  "1"
                                )
                              }
                            >
                              <span>Home Win</span>
                              <span className="wagger-amt">
                                {fixture.market_1_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_1_odds["outcome_1"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className={
                                fixture.market_1_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_1_odds["outcome_X"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_1_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "X",
                                  "LiveMarket",
                                  fixture.id,
                                  "1X2 FT - X",
                                  "1"
                                )
                              }
                            >
                              <span>Draw</span>
                              <span className="wagger-amt">
                                {fixture.market_1_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_1_odds["outcome_X"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className={
                                fixture.market_1_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_1_odds["outcome_2"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_1_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "2",
                                  "LiveMarket",
                                  fixture.id,
                                  "1X2 FT - 2",
                                  "1"
                                )
                              }
                            >
                              <span>Away Win</span>
                              <span className="wagger-amt">
                                {fixture.market_1_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_1_odds["outcome_2"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>
                    <div
                      className={
                        Mobile.isMobile()
                          ? "market-label market-label-fixture"
                          : "market-label"
                      }
                    >
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
                              className={
                                fixture.market_7_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_7_odds["outcome_1X"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_7_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1X",
                                  "LiveMarket",
                                  fixture.id,
                                  "Double Chance FT - HW/DR",
                                  "7"
                                )
                              }
                            >
                              <span>Home Win / Draw</span>
                              <span className="wagger-amt">
                                {fixture.market_7_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_7_odds["outcome_1X"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className={
                                fixture.market_7_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_7_odds["outcome_12"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_7_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "12",
                                  "LiveMarket",
                                  fixture.id,
                                  "Double Chance FT - HW/AW",
                                  "7"
                                )
                              }
                            >
                              <span>Home / Away</span>
                              <span className="wagger-amt">
                                {fixture.market_7_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_7_odds["outcome_12"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-4">
                            <a
                              className={
                                fixture.market_7_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_7_odds["outcome_X2"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_7_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "X2",
                                  "LiveMarket",
                                  fixture.id,
                                  "Double Chance FT - DR/AW",
                                  "7"
                                )
                              }
                            >
                              <span>Draw / Away Win</span>
                              <span className="wagger-amt">
                                {fixture.market_7_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_7_odds["outcome_X2"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>
                    <div
                      className={
                        Mobile.isMobile()
                          ? "market-label market-label-fixture"
                          : "market-label"
                      }
                    >
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
                              className={
                                fixture.market_3_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_3_odds["outcome_1"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_3_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1",
                                  "LiveMarket",
                                  fixture.id,
                                  "Handicap 1 FT - HW",
                                  "3",
                                  "-1.0 (0-0)"
                                )
                              }
                            >
                              <span>
                                Home <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.market_3_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_3_odds["outcome_1"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-6">
                            <a
                              className={
                                fixture.market_3_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_3_odds["outcome_2"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_3_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "2",
                                  "LiveMarket",
                                  fixture.id,
                                  "Handicap 1 FT - AW",
                                  "3",
                                  "-1.0 (0-0)"
                                )
                              }
                            >
                              <span>
                                Away <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.market_3_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_3_odds["outcome_2"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>
                    <div
                      className={
                        Mobile.isMobile()
                          ? "market-label market-label-fixture"
                          : "market-label"
                      }
                    >
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
                              className={
                                fixture.market_2_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_2_odds["outcome_Under"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_2_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Under",
                                  "LiveMarket",
                                  fixture.id,
                                  "Total 2.5 FT - Under 2.5",
                                  "2",
                                  "2.5"
                                )
                              }
                            >
                              <span>Under 2.5</span>
                              <span className="wagger-amt">
                                {fixture.market_2_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_2_odds["outcome_Under"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-6">
                            <a
                              className={
                                fixture.market_2_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_2_odds["outcome_Over"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_2_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Over",
                                  "LiveMarket",
                                  fixture.id,
                                  "Total 2.5 FT - Over 2.5",
                                  "2",
                                  "2.5"
                                )
                              }
                            >
                              <span>Over 2.5</span>
                              <span className="wagger-amt">
                                {fixture.market_2_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_2_odds["outcome_Over"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                        </div>
                      </LiveOddsChannel>
                    </div>

                    <div
                      className={
                        Mobile.isMobile()
                          ? "market-label market-label-fixture"
                          : "market-label"
                      }
                    >
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
                              className={
                                fixture.market_17_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_17_odds["outcome_Yes"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_17_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Yes",
                                  "LiveMarket",
                                  fixture.id,
                                  "Both To Score FT - Yes",
                                  "17"
                                )
                              }
                            >
                              <span>Yes</span>
                              <span className="wagger-amt">
                                {fixture.market_17_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_17_odds["outcome_Yes"]
                                    )
                                  : oddsFormatter(1.0)}
                              </span>
                            </a>
                          </div>
                          <div className="col-lg-6">
                            <a
                              className={
                                fixture.market_17_odds === undefined ||
                                oddsFormatter(
                                  fixture.market_17_odds["outcome_No"]
                                ) == parseFloat(1.0).toFixed(2) ||
                                fixture.market_17_status != "Active"
                                  ? "btn btn-light wagger-btn intialise_input disabled"
                                  : "btn btn-light wagger-btn intialise_input"
                              }
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "No",
                                  "LiveMarket",
                                  fixture.id,
                                  "Both To Score FT - No",
                                  "17"
                                )
                              }
                            >
                              <span>No</span>
                              <span className="wagger-amt">
                                {fixture.market_17_status == "Active"
                                  ? oddsFormatter(
                                      fixture.market_17_odds["outcome_No"]
                                    )
                                  : oddsFormatter(1.0)}
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
