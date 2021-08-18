import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Moment from "react-moment";
import shortUUID from "short-uuid";
import PreOddsChannel from "../../channels/fixtures_channel";
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
        setFeaturedGames(response.data.featured);
        setPrematchGames(response.data.prematch);
      })
      .catch((error) => {
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
  };

  const fixtureOutcome = () => {};

  const displayLiveGames = () => {
    return liveGames.map((fixture) => (
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
    ));
  };

  const displayFeaturedGames = (games, prefix) => {
    return games.map((fixture) => (
      <PreOddsChannel
        key={shortUUID.generate()}
        channel="PreOddsChannel"
        fixture={fixture.id}
        market="1"
        received={(data) => {
          loadGames();
          // console.log(data);
        }}
      >
        <tr
        // data-controller="pre-odds-channel #markets-channel slips"
        // data-pre-odds-channel-fixture=""
        // data-markets-channel-fixture=""
        // data-slips-fixture=""
        // data-pre-odds-channel-market="1"
        // data-markets-channel-market="1"
        // data-slips-market="1"
        >
          <td>
            <a href={`/fixtures/soccer/pre?id=${fixture.id}`}>
              <Moment local format="HH:mm:ss">
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
          {/* <% if @live_fixtures.present? %> */}
          {liveGames.length && (
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
                      <tbody
                      // id="fixture-table-body-live"
                      // data-controller="refresh"
                      // data-refresh-interval="60000"
                      // data-refresh-url="<% home_page_refresh_path %>"
                      // data-refresh-method="GET"
                      >
                        {/* <%= render partial: 'live_fixture_table' %> */}
                        {displayLiveGames()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="text-center mb-2">
                <a
                  id="live-tab"
                  className="match-time show-more"
                  href="/fixtures/soccer/lives"
                >
                  Show More
                </a>
                {/* <%= link_to "Show More".html_safe, fixtures_soccer_lives_path, id: "live-tab", className: "match-time show-more" %> */}
              </div>
            </>
          )}
          {/* <% else %> */}
          {!liveGames.length && (
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
          {/* <% end %> */}
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
          {/* <% if !@featured.empty? %> */}
          {featuredGames.length && (
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
                    <tbody
                    // id="fixture-table-body-1"
                    // data-controller="refresh"
                    // data-refresh-interval="60000"
                    // data-refresh-url="<% home_page_refresh_path %>"
                    // data-refresh-method="GET"
                    >
                      {displayFeaturedGames(featuredGames, "_feat")}
                      {/* <%= render partial: 'feat_prematch_fixture_table' %> */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-center mb-2">
                <a
                  id="live-tab"
                  className="match-time show-more"
                  href="/fixtures/soccer/featured"
                >
                  Show More
                </a>
                {/* <%= link_to "Show More".html_safe, fixtures_soccer_featured_path, id: "live-tab", className: "match-time show-more" %> */}
              </div>
            </div>
          )}
          {/* <%else%> */}
          {!featuredGames.length && (
            <div className="card-body">
              <div className="tab-content" id="">
                <div
                  className="tab-pane fade show active"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h6 className="event">No Featured Matches</h6>
                </div>
              </div>
            </div>
          )}
          {/* <% end %> */}
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
              {/* <% if @prematch_fixtures.present? %> */}
              {prematchGames.length && (
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
                    <tbody
                      id="fixture-table-body"
                      // data-target="match-fixtures.fixtures"
                      // data-controller="fixture-channel pre-odds-channel refresh"
                      // data-refresh-interval="60000"
                      // data-refresh-url="<% home_page_refresh_path %>"
                      // data-refresh-method="GET"
                    >
                      {displayFeaturedGames(prematchGames, "")}
                      {/* <%= render partial: 'pre_match_fixture_table' %> */}
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
                        <a
                          id="pre-tab"
                          className="match-time show-more"
                          href="/fixtures/soccer/pres"
                        >
                          Show More
                        </a>
                        {/* <%= link_to "Show More".html_safe, fixtures_soccer_pres_path, id: "pre-tab", 
                                          className: "match-time show-more" %> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* <% else %> */}
              {!prematchGames.length && (
                <div className="card-body">
                  <div className="tab-content" id="">
                    <div>
                      <h6 className="event">No Upcoming Events</h6>
                    </div>
                  </div>
                </div>
              )}
              {/* <% end %>                    */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

document.addEventListener("DOMContentLoaded", () => {
  const home = document.getElementById("home");
  home && ReactDOM.render(<Home />, home);
});
