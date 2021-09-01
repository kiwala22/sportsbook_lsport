import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import MarketsChannel from "../../channels/marketsChannel";
import PreOddsChannel from "../../channels/preOddsChannel";
import addBet from "../redux/actions";
import Requests from "../utilities/Requests";
import Spinner from "./Spinner";

const PreviewPre = (props) => {
  const [fixture, setFixture] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();

  useEffect(() => {
    getfixture();
  }, [props]);

  function getfixture() {
    var path = `/api/v1/fixtures/soccer/pre_fixture${props.location.search}`;
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
                <MarketsChannel
                  channel="MarketsChannel"
                  fixture={fixture.id}
                  received={(data) => console.log(data)}
                >
                  <h6>
                    {fixture.part_one_name} <BsDash /> {fixture.part_two_name}{" "}
                    {fixture.league_name} {fixture.location}
                  </h6>
                </MarketsChannel>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">Match Result 1X2 - FT</div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <PreOddsChannel
                        channel="PreOddsChannel"
                        fixture={fixture.id}
                        market="1"
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1",
                                  "Market1Pre",
                                  fixture.id,
                                  "1X2 FT - 1"
                                )
                              }
                            >
                              <span>Home Win</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt1_1}
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
                                  "Market1Pre",
                                  fixture.id,
                                  "1X2 FT - X"
                                )
                              }
                            >
                              <span>Draw</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt1_X}
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
                                  "Market1Pre",
                                  fixture.id,
                                  "1X2 FT - 2"
                                )
                              }
                            >
                              <span>Away Win</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt1_2}
                              </span>
                            </a>
                          </div>
                        </div>
                      </PreOddsChannel>
                    </div>
                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">Double Chance - FT</div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <PreOddsChannel
                        channel="PreOddsChannel"
                        fixture={fixture.id}
                        market="7"
                        received={(data) => console.log(data)}
                      >
                        <div className="row market">
                          <div className="col-lg-4">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1X",
                                  "Market7Pre",
                                  fixture.id,
                                  "Double Chance FT - HW/DR"
                                )
                              }
                            >
                              <span>Home Win / Draw</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt7_1X}
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
                                  "Market7Pre",
                                  fixture.id,
                                  "Double Chance FT - HW/AW"
                                )
                              }
                            >
                              <span>Home / Away</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt7_12}
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
                                  "Market7Pre",
                                  fixture.id,
                                  "Double Chance FT - DR/AW"
                                )
                              }
                            >
                              <span>Draw / Away Win</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt7_X2}
                              </span>
                            </a>
                          </div>
                        </div>
                      </PreOddsChannel>
                    </div>
                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">
                          Asian Handicap 1 Goal - FT
                        </div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <PreOddsChannel
                        channel="PreOddsChannel"
                        fixture={fixture.id}
                        market="3"
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "1",
                                  "Market3Pre",
                                  fixture.id,
                                  "Handicap 1 FT - HW"
                                )
                              }
                            >
                              <span>
                                Home <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt3_1}
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
                                  "Market3Pre",
                                  fixture.id,
                                  "Handicap 1 FT - AW"
                                )
                              }
                            >
                              <span>
                                Away <BsDash />1
                              </span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt3_2}
                              </span>
                            </a>
                          </div>
                        </div>
                      </PreOddsChannel>
                    </div>
                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">
                          Under 2.5 / Over 2.5 - FT
                        </div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <PreOddsChannel
                        channel="PreOddsChannel"
                        fixture={fixture.id}
                        market="2"
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Under",
                                  "Market2Pre",
                                  fixture.id,
                                  "Total 2.5 FT - Under 2.5"
                                )
                              }
                            >
                              <span>Under 2.5</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt2_Under}
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
                                  "Market2Pre",
                                  fixture.id,
                                  "Total 2.5 FT - Over 2.5"
                                )
                              }
                            >
                              <span>Over 2.5</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt2_Over}
                              </span>
                            </a>
                          </div>
                        </div>
                      </PreOddsChannel>
                    </div>

                    <div className="market-label">
                      <div className="row">
                        <div className="col-lg-12 ">Both to Score - FT</div>
                      </div>
                    </div>
                    <div className="market-odds mb-3 mt-3">
                      <PreOddsChannel
                        channel="PreOddsChannel"
                        fixture={fixture.id}
                        market="17"
                        received={(data) => console.log(data)}
                      >
                        <div className="row">
                          <div className="col-lg-6">
                            <a
                              className="btn btn-light wagger-btn intialise_input"
                              onClick={() =>
                                addBet(
                                  dispatcher,
                                  "Yes",
                                  "Market17Pre",
                                  fixture.id,
                                  "Both To Score FT - Yes"
                                )
                              }
                            >
                              <span>Yes</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt17_Yes}
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
                                  "Market17Pre",
                                  fixture.id,
                                  "Both To Score FT - No"
                                )
                              }
                            >
                              <span>No</span>
                              <span className="wagger-amt">
                                {fixture.outcome_mkt17_No}
                              </span>
                            </a>
                          </div>
                        </div>
                      </PreOddsChannel>
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

export default withRouter(PreviewPre);
