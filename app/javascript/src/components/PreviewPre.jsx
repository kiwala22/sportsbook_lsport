import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";
import Requests from "../utilities/Requests";

const PreviewPre = (props) => {
  const [fixture, setFixture] = useState([]);

  useEffect(() => {
    getfixture();
  }, [props]);

  function getfixture() {
    var path = `/api/v1/fixtures/soccer/pre_fixture${props.location.search}`;
    var values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        setFixture(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="game-box">
        <div className="card" id="show-markets">
          <div className="card-header">
            <h6>
              {fixture.part_one_name} <BsDash /> {fixture.part_two_name}{" "}
              {fixture.league_name} {fixture.location}
            </h6>
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
                </div>
                <div className="market-label">
                  <div className="row">
                    <div className="col-lg-12 ">Double Chance - FT</div>
                  </div>
                </div>
                <div className="market-odds mb-3 mt-3">
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
                </div>
                <div className="market-label">
                  <div className="row">
                    <div className="col-lg-12 ">Asian Handicap 1 Goal - FT</div>
                  </div>
                </div>
                <div className="market-odds mb-3 mt-3">
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
                </div>
                <div className="market-label">
                  <div className="row">
                    <div className="col-lg-12 ">Under 2.5 / Over 2.5 - FT</div>
                  </div>
                </div>
                <div className="market-odds mb-3 mt-3">
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
                </div>

                <div className="market-label">
                  <div className="row">
                    <div className="col-lg-12 ">Both to Score - FT</div>
                  </div>
                </div>
                <div className="market-odds mb-3 mt-3">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(PreviewPre);
