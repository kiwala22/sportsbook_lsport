import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shortUUID from "short-uuid";
import LiveOddsChannel from "../../channels/liveOddsChannel";
// import MarketsChannel from "../../channels/marketsChannel";
import Requests from "../utilities/Requests";

const LiveMatches = (props) => {
  const [games, setGames] = useState([]);

  useEffect(() => loadLiveGames(), []);

  const loadLiveGames = () => {
    let path = "/api/v1/fixtures/soccer/live";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        var liveGames = response.data;
        setGames(liveGames);
      })
      .catch((error) => {
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
  };

  const displayLiveGames = (games, setState) => {
    return games.map((fixture) => (
      <LiveOddsChannel
        key={shortUUID.generate()}
        channel="LiveOddsChannel"
        fixture={fixture.id}
        market="1"
        received={(data) => {
          console.log(data);
          //updateMatchInfo(data, games, setState);
        }}
      >
        <tr
          key={shortUUID.generate()}
          // data-controller="live-odds-channel fixture-channel"
          // data-fixture-channel-fixture=""
          // data-live-odds-channel-fixture=""
          // data-markets-channel-fixture=""
        >
          <td>
            <a href={`/fixtures/soccer/live?id=${fixture.id}`}>
              <strong>{fixture.part_one_name}</strong>
              <strong>{fixture.part_two_name}</strong>
            </a>
          </td>
          <td>
            <a href={`/fixtures/soccer/live?id=${fixture.id}`}>
              <strong>
                <span
                  className="blinking match-time"
                  id={`match_time_${fixture.id}`}
                >
                  {fixture.match_time}
                </span>
              </strong>
              <strong>
                <span className="score" id={`match_score_${fixture.id}`}>
                  {fixture.home_score} - {fixture.away_score}
                </span>
              </strong>
            </a>
          </td>
          <td>
            <a href={`/fixtures/soccer/live?id=${fixture.id}`}>
              {fixture.league_name} <br />
              {fixture.location}
            </a>
          </td>
          <td>
            <a
              className="btnn intialise_input"
              id={`live_1_1_${fixture.id}`}
              data-remote="true"
              rel="nofollow"
              data-method="post"
              href={`/add_bet?fixture_id=${fixture.id}&market=Market1Live&outcome_desc=1X2+FT+-+1&outcome_id=1`}
            >
              {fixture.outcome_1}
            </a>
          </td>
          <td>
            <a
              className="btnn intialise_input"
              id={`live_1_X_${fixture.id}`}
              data-remote="true"
              rel="nofollow"
              data-method="post"
              href={`/add_bet?fixture_id=${fixture.id}&market=Market1Live&outcome_desc=1X2+FT+-+X&outcome_id=X`}
            >
              {fixture.outcome_X}
            </a>
          </td>
          <td>
            <a
              className="btnn intialise_input"
              id={`live_1_2_${fixture.id}`}
              data-remote="true"
              rel="nofollow"
              data-method="post"
              href={`/add_bet?fixture_id=${fixture.id}&market=Market1Live&outcome_desc=1X2+FT+-+2&outcome_id=2`}
            >
              {fixture.outcome_2}
            </a>
            {/* <%= link_to(fixture.market1_live.outcome_2, add_bet_path(outcome_id: "2", fixture_id: fixture.id, market: "Market1Live", outcome_desc: "1X2 FT - 2") , class: "btnn intialise_input", id:"live_1_2_#{fixture.id}", remote: true, method: :post )%> */}
          </td>
        </tr>
      </LiveOddsChannel>
    ));
  };
  return (
    <>
      <div className="game-box" id="live">
        <div className="card">
          <div className="card-header">
            <h3>
              Live Fixtures - Soccer{" "}
              <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2"></i>
            </h3>
            <span className="float-right">
              <Link className="btnn btn-blink" to={"/fixtures/soccer/pres/"}>
                <i className="fas fa-futbol"></i> Pre-Match
              </Link>
            </span>
          </div>
          {games && (
            <>
              <div className="card-body">
                <div className="tab-content" id="">
                  <div
                    className="tab-pane fade show active"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <table className="table table-borderless">
                      <thead>
                        <tr>
                          <th className="col-4">Teams</th>
                          <th className="col-1">Score</th>
                          <th className="col-4">Tournament</th>
                          <th className="col-1">1</th>
                          <th className="col-1">X</th>
                          <th className="col-1">2</th>
                        </tr>
                      </thead>
                      <tbody>{displayLiveGames(games, setGames)}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* <div className="text-center mb-2">
                <Link
                  className="match-time show-more"
                  to={"/fixtures/soccer/lives/"}
                >
                  Show More
                </Link>
              </div> */}
            </>
          )}
          {games == 0 && (
            <div className="card-body">
              <div className="tab-content" id="">
                <div
                  className="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h6 className=" event">No Live Matches</h6>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LiveMatches;
