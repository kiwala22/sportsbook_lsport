import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import shortUUID from "short-uuid";
import LiveOddsChannel from "../../channels/liveOddsChannel";
import MarketsChannel from "../../channels/marketsChannel";
// import OddsChannel from "../../channels/fixtures_channel";
import PreOddsChannel from "../../channels/preOddsChannel";
import Banner from "../Images/web_banner_main.webp";
import Requests from "../utilities/Requests";

const Home = (props) => {
  const [liveGames, setLiveGames] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [prematchGames, setPrematchGames] = useState([]);

  useEffect(() => loadGames(), []);

  const loadGames = () => {
    let path = "/api/v1/home";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        setLiveGames(response.data.live);
        setPrematchGames(response.data.prematch);
        setFeaturedGames(response.data.featured);
      })
      .catch((error) => {
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
  };

  const updateMatchInfo = (data, currentState, setState) => {
    console.log(currentState);
    let fixtureIndex = currentState.findIndex((el) => data.fixture_id == el.id);
    if (data.status !== "Active") {
      currentState.splice(fixtureIndex, 1);
      let newState = Array.from(currentState);
      setState(newState);
      return;
    }
    currentState[fixtureIndex] = {
      ...currentState[fixtureIndex],
      ...{
        outcome_1: data.outcome_1,
        outcome_X: data.outcome_X,
        outcome_2: data.outcome_2,
      },
    };
    let newState = Array.from(currentState);
    setState(newState);
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
          // data-slips-fixture=""
          // data-live-odds-channel-market="1"
          // data-markets-channel-market="1"
          // data-slips-market="1"
        >
          <td>
            {/* <%= link_to fixtures_soccer_live_path(id: fixture.id) do  %> */}
            <a href={`/fixtures/soccer/live?id=${fixture.id}`}>
              <strong>{fixture.part_one_name}</strong>
              <strong>{fixture.part_two_name}</strong>
            </a>
            {/* <% end %> */}
          </td>
          <td>
            {/* <%= link_to fixtures_soccer_live_path(id: fixture.id) do  %> */}
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
            {/* <% end %> */}
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
            {/* <%= link_to(fixture.market1_live.outcome_1, add_bet_path(outcome_id: "1", fixture_id: fixture.id, market: "Market1Live", outcome_desc: "1X2 FT - 1") , class: "btnn intialise_input",id:"live_1_1_#{fixture.id}", remote: true, method: :post )%> */}
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
            {/* <%= link_to(fixture.market1_live.outcome_X, add_bet_path(outcome_id: "X", fixture_id: fixture.id, market: "Market1Live", outcome_desc: "1X2 FT - X") , class: "btnn intialise_input", id:"live_1_X_#{fixture.id}",remote: true, method: :post )%> */}
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

  const displayFeaturedGames = (games, prefix, setState) => {
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
                id={`pre${prefix}_1_1_${fixture.id}`}
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
                id={`pre${prefix}_1_X_${fixture.id}`}
                data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
                data-remote="true"
                rel="nofollow"
                data-method="post"
                href={`/add_bet?fixture_id=${fixture.id}&market=Market1Pre&outcome_desc=1X2+FT+-+1&outcome_id=X`}
              >
                {fixture.outcome_X}
              </a>
              {/* <%= link_to(fixture.market1_pre.outcome_X, add_bet_path(outcome_id: "X", fixture_id: fixture.id, market: "Market1Pre", outcome_desc: "1X2 FT - X") , class: "btnn intialise_input", id: "pre_feat_1_X_#{fixture.id}",remote: true, method: :post, data: {disable_with: "<i class='fas fa-spinner fa-spin'></i>"} )%> */}
            </td>
            <td>
              <a
                className="btnn intialise_input"
                id={`pre${prefix}_1_2_${fixture.id}`}
                data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
                data-remote="true"
                rel="nofollow"
                data-method="post"
                href={`/add_bet?fixture_id=${fixture.id}&market=Market1Pre&outcome_desc=1X2+FT+-+1&outcome_id=2`}
              >
                {fixture.outcome_2}
              </a>
              {/* <%= link_to(fixture.market1_pre.outcome_2, add_bet_path(outcome_id: "2", fixture_id: fixture.id, market: "Market1Pre", outcome_desc: "1X2 FT - 2") , class: "btnn intialise_input", id: "pre_feat_1_2_#{fixture.id}", remote: true, method: :post, data: {disable_with: "<i class='fas fa-spinner fa-spin'></i>"} )%> */}
            </td>
          </tr>
        </MarketsChannel>
      </PreOddsChannel>
    ));
  };
  return (
    <>
      <div className="card ">
        <div className="card-header side-banner ">
          <img src={Banner} className="banner-image" />
        </div>
      </div>
      <br />
      <div className="game-box" id="live">
        <div className="card">
          <div className="card-header">
            <h3>
              Live Fixtures - Soccer{" "}
              <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2"></i>
            </h3>
          </div>
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
                  <tbody>
                    {liveGames && displayLiveGames(liveGames, setLiveGames)}
                    {liveGames.length == 0 && (
                      <tr>
                        <td colSpan="6">
                          <span className="noEvents">
                            No Live Matches Found
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="text-center mb-2">
            <Link
              className="match-time show-more"
              to={"/fixtures/soccer/lives/"}
            >
              Show More
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Start Featured Fixtures Table --> */}

      <div className="game-box" id="featured">
        <div className="card">
          <div className="card-header">
            <h3>
              Featured Fixtures - Soccer{" "}
              <i className="fas fa-fire fa-lg fa-fw mr-2 match-time"></i>{" "}
            </h3>
          </div>
          <div className="card-body">
            <div className="tab-content" id="">
              <div
                className="tab-pane fade show active"
                role="tabpanel"
                aria-labelledby="home-tab"
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
                  <tbody>
                    {featuredGames &&
                      displayFeaturedGames(
                        featuredGames,
                        "_feat",
                        setFeaturedGames
                      )}
                    {featuredGames.length == 0 && (
                      <tr>
                        <td colSpan="6">
                          <span className="noEvents">
                            No Featured Matches Found
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="text-center mb-2">{/* Pagination */}</div>
          </div>
        </div>
      </div>

      {/* <!-- End Featured Fixtures Table --> */}

      {/* <!-- Start All Fixtures Table --> */}
      <div className="game-box">
        <div className="card">
          <div className="card-header">
            <h3>
              Upcoming Fixtures - Soccer{" "}
              <i className="fas fa-futbol fa-lg fa-fw mr-2 match-time"></i>
            </h3>
          </div>
          <div className="card-body">
            <div className="tab-content" id="myTabContent">
              {prematchGames && (
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
                      {prematchGames &&
                        displayFeaturedGames(
                          prematchGames,
                          "",
                          setPrematchGames
                        )}
                      {prematchGames.length == 0 && (
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
                    <div className="table-navigation">
                      <div className="text-center mb-4">
                        <Link
                          className="match-time show-more"
                          to={"/fixtures/soccer/pres/"}
                        >
                          Show More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
