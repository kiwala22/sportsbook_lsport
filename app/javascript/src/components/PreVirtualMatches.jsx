import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import shortUUID from "short-uuid";
import MarketsChannel from "../../channels/marketsChannel";
import PreOddsChannel from "../../channels/preOddsChannel";
import Requests from "../utilities/Requests";

const PreVirtualMatches = (props) => {
  const [games, setGames] = useState([]);

  useEffect(() => loadPreMatchGames(), [props]);

  useEffect(() => loadPreMatchGames(), []);

  const loadPreMatchGames = () => {
    let path = `/api/v1/fixtures/virtual_soccer/virtual_pre${props.location.search}`;
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        var preMatch = response.data;
        setGames(preMatch);
      })
      .catch((error) => {
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
  };

  const displayPreMatchGames = (games, setState) => {
    return games.map((fixture) => (
      <PreOddsChannel
        key={shortUUID.generate()}
        channel="PreOddsChannel"
        fixture={fixture.id}
        market="1"
        received={(data) => {
          console.log(data);
          //updateMatchInfo(data, games, setState);
        }}
      >
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          received={(data) => {}}
          // received={(data) => {
          //   console.log(data);
          //   updateMatchInfo(data, games, setState);
          // }}
        >
          <tr>
            <td>
              <a href={`/fixtures/soccer/pre?id=${fixture.id}`}>
                <Moment local={true} format="HH:mm:ss">
                  {fixture.start_date}
                </Moment>
                <br />
                <Moment format="MM/DD/YY">{fixture.start_date}</Moment>
              </a>
            </td>
            <td>
              <a href={`/fixtures/soccer/pre?id=${fixture.id}`}>
                <strong>{fixture.part_one_name}</strong>
                <strong>{fixture.part_two_name}</strong>
              </a>
            </td>
            <td>
              <a href={`/fixtures/soccer/pre?id=${fixture.id}`}>
                {fixture.league_name} <br />
                {fixture.location}
              </a>
            </td>
            <td>
              <a
                className="btnn intialise_input"
                id={`pre_1_1_${fixture.id}`}
                data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
                data-remote="true"
                rel="nofollow"
                data-method="post"
                href={`/add_bet?fixture_id=${fixture.id}&market=Market1Pre&outcome_desc=1X2+FT+-+1&outcome_id=1`}
              >
                {fixture.outcome_1}
              </a>
              {/* <%= link_to(fixture.market1_pre.outcome_1, add_bet_path(outcome_id: "1", fixture_id: fixture.id, market: "Market1Pre", outcome_desc: "1X2 FT - 1") , class: "btnn intialise_input",id: "pre_feat_1_1_#{fixture.id}", remote: true, method: :post, data: {disable_with: "<i class='fas fa-spinner fa-spin'></i>"})%> */}
            </td>
            <td>
              <a
                className="btnn intialise_input"
                id={`pre_1_X_${fixture.id}`}
                data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
                data-remote="true"
                rel="nofollow"
                data-method="post"
                href={`/add_bet?fixture_id=${fixture.id}&market=Market1Pre&outcome_desc=1X2+FT+-+1&outcome_id=X`}
              >
                {fixture.outcome_X}
              </a>
            </td>
            <td>
              <a
                className="btnn intialise_input"
                id={`pre_1_2_${fixture.id}`}
                data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
                data-remote="true"
                rel="nofollow"
                data-method="post"
                href={`/add_bet?fixture_id=${fixture.id}&market=Market1Pre&outcome_desc=1X2+FT+-+1&outcome_id=2`}
              >
                {fixture.outcome_2}
              </a>
            </td>
          </tr>
        </MarketsChannel>
      </PreOddsChannel>
    ));
  };

  return (
    <>
      <div className="game-box">
        <div className="card">
          <div className="card-header">
            <h3>
              Upcoming Fixtures - Virtual Soccer{" "}
              <i className="fas fa-futbol fa-lg fa-fw mr-2 match-time"></i>
            </h3>
            <span className="float-right ">
              <Link
                className="btnn btn-blink"
                to={"/fixtures/virtual_soccer/lives"}
              >
                <i className="fas fa-bolt"></i> Live
              </Link>
            </span>
          </div>
          <div className="card-body">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
                data-controller=""
              >
                <table className="table table-borderless ">
                  <thead>
                    <tr>
                      <th className="col-1">Date</th>
                      <th className="col-4">Teams</th>
                      <th className="col-4">Tournament</th>
                      <th className="col-1">1</th>
                      <th className="col-1">X</th>
                      <th className="col-1">2</th>
                    </tr>
                  </thead>
                  <tbody id="fixture-table-body">
                    {games && displayPreMatchGames(games, setGames)}
                    {games.length == 0 && (
                      <tr>
                        <td colSpan="6">
                          <span className="noEvents">No Matches Found</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div id="bottom">
                  <div className="d-flex justify-content-center">
                    <div
                      data-target="match-fixtures.spinner"
                      id="spinner"
                    ></div>
                  </div>
                  <div className="table-navigation">{/* Pagination */}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreVirtualMatches;
