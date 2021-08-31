import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";
import FixtureChannel from "../../channels/fixturesChannel";
import LiveOddsChannel from "../../channels/liveOddsChannel";
import MarketsChannel from "../../channels/marketsChannel";
import Requests from "../utilities/Requests";
import Spinner from "./Spinner";

const PreviewLiveVirtual = (props) => {
  const [fixture, setFixture] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

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
                  received={(data) => console.log(data)}
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
                      received={(data) => console.log(data)}
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
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-4">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Home Win</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt1_1}
                              </span>
                            </Link>
                          </div>
                          <div className="col-lg-4">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Draw</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt1_X}
                              </span>
                            </Link>
                          </div>
                          <div className="col-lg-4">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Away Win</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt1_2}
                              </span>
                            </Link>
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
                        received={(data) => console.log(data)}
                      >
                        <div className="row market">
                          <div className="col-lg-4">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Home Win / Draw</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt7_1X}
                              </span>
                            </Link>
                          </div>
                          <div className="col-lg-4">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Home / Away</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt7_12}
                              </span>
                            </Link>
                          </div>
                          <div className="col-lg-4">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Draw / Away Win</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt7_X2}
                              </span>
                            </Link>
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
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>
                                Home <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt3_1}
                              </span>
                            </Link>
                          </div>
                          <div className="col-lg-6">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>
                                Away <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt3_2}
                              </span>
                            </Link>
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
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Under 2.5</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt2_Under}
                              </span>
                            </Link>
                          </div>
                          <div className="col-lg-6">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Over 2.5</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt2_Over}
                              </span>
                            </Link>
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
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>Yes</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt17_Yes}
                              </span>
                            </Link>
                          </div>
                          <div className="col-lg-6">
                            <Link className="btn btn-light wagger-btn intialise_input">
                              <span>No</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt17_No}
                              </span>
                            </Link>
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
      {pageLoading && <Spinner />}
    </>
  );
};

export default withRouter(PreviewLiveVirtual);
