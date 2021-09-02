import { Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import shortUUID from "short-uuid";
import FixtureChannel from "../../channels/fixturesChannel";
import LiveOddsChannel from "../../channels/liveOddsChannel";
import MarketsChannel from "../../channels/marketsChannel";
import PreOddsChannel from "../../channels/preOddsChannel";
import Banner from "../Images/web_banner_main.webp";
import addBet from "../redux/actions";
import * as DataUpdate from "../utilities/DataUpdate";
import oddsFormatter from "../utilities/oddsFormatter";
import Requests from "../utilities/Requests";
import Spinner from "./Spinner";

const Home = (props) => {
  const [liveGames, setLiveGames] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [prematchGames, setPrematchGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();

  useEffect(() => loadGames(), []);

  const loadGames = () => {
    let path = "/api/v1/home";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        var data = response.data;
        if (
          data.live instanceof Array &&
          data.prematch instanceof Array &&
          data.featured instanceof Array
        ) {
          setLiveGames(data.live);
          setPrematchGames(data.prematch);
          setFeaturedGames(data.featured);
        }
        setPageLoading(false);
      })
      .catch((error) => {
        setPageLoading(true);
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
  };

  const updateMatchInfo = (data, currentState, setState) => {
    let updatedData = DataUpdate.marketOneUpdates(data, currentState);
    let newState = Array.from(updatedData);
    setState(newState);
  };

  const columns_live = [
    {
      title: "Teams",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          received={(data) => {
            updateMatchInfo(data, liveGames, setLiveGames);
          }}
        >
          <Link
            to={{
              pathname: "/fixtures/soccer/live",
              search: `id=${fixture.id}`,
            }}
          >
            <strong>{fixture.part_one_name}</strong>
            <strong>{fixture.part_two_name}</strong>
          </Link>
        </MarketsChannel>
      ),
    },
    {
      title: "Score",
      render: (_, fixture) => (
        <>
          <FixtureChannel
            channel="FixtureChannel"
            fixture={fixture.id}
            received={(data) => {
              updateMatchInfo(data, liveGames, setLiveGames);
            }}
          >
            <a>
              <strong>
                <span className="blinking match-time">
                  {fixture.match_time}
                </span>
              </strong>
              <strong>
                <span className="score">
                  {fixture.home_score} <BsDash /> {fixture.away_score}
                </span>
              </strong>
            </a>
          </FixtureChannel>
        </>
      ),
    },
    {
      title: "Tournament",
      render: (_, fixture) => (
        <LiveOddsChannel
          channel="LiveOddsChannel"
          fixture={fixture.id}
          market="1"
          received={(data) => {
            updateMatchInfo(data, liveGames, setLiveGames);
          }}
        >
          <a>
            {fixture.league_name} <br />
            {fixture.location}
          </a>
        </LiveOddsChannel>
      ),
    },
    {
      title: "1",
      dataIndex: "outcome_1",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "1", "Market1Live", fixture.id, "1X2 FT - 1")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
    {
      title: "X",
      dataIndex: "outcome_X",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "X", "Market1Live", fixture.id, "1X2 FT - X")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
    {
      title: "2",
      dataIndex: "outcome_2",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "2", "Market1Live", fixture.id, "1X2 FT - 2")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
  ];

  const columns_pre = [
    {
      title: "Date",
      dataIndex: "start_date",
      render: (date) => (
        <>
          <a>
            <Moment local={true} format="HH:mm:ss">
              {date}
            </Moment>
            <br />
            <Moment format="MM/DD/YY">{date}</Moment>
          </a>
        </>
      ),
    },
    {
      title: "Teams",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          received={(data) => {
            updateMatchInfo(data, prematchGames, setPrematchGames);
          }}
        >
          <Link
            to={{
              pathname: "/fixtures/soccer/pre",
              search: `id=${fixture.id}`,
            }}
          >
            <strong>{fixture.part_one_name}</strong>
            <strong>{fixture.part_two_name}</strong>
          </Link>
        </MarketsChannel>
      ),
    },
    {
      title: "Tournament",
      render: (_, fixture) => (
        <PreOddsChannel
          channel="PreOddsChannel"
          fixture={fixture.id}
          market="1"
          received={(data) => {
            updateMatchInfo(data, prematchGames, setPrematchGames);
          }}
        >
          <a>
            {fixture.league_name} <br />
            {fixture.location}
          </a>
        </PreOddsChannel>
      ),
    },
    {
      title: "1",
      dataIndex: "outcome_1",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "1", "Market1Pre", fixture.id, "1X2 FT - 1")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
    {
      title: "X",
      dataIndex: "outcome_X",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "X", "Market1Pre", fixture.id, "1X2 FT - X")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
    {
      title: "2",
      dataIndex: "outcome_2",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "2", "Market1Pre", fixture.id, "1X2 FT - 2")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
  ];

  const columns_feat = [
    {
      title: "Date",
      dataIndex: "start_date",
      render: (date) => (
        <>
          <a>
            <Moment local={true} format="HH:mm:ss">
              {date}
            </Moment>
            <br />
            <Moment format="MM/DD/YY">{date}</Moment>
          </a>
        </>
      ),
    },
    {
      title: "Teams",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          received={(data) => {
            updateMatchInfo(data, featuredGames, setFeaturedGames);
          }}
        >
          <Link
            to={{
              pathname: "/fixtures/soccer/pre",
              search: `id=${fixture.id}`,
            }}
          >
            <strong>{fixture.part_one_name}</strong>
            <strong>{fixture.part_two_name}</strong>
          </Link>
        </MarketsChannel>
      ),
    },
    {
      title: "Tournament",
      render: (_, fixture) => (
        <PreOddsChannel
          channel="PreOddsChannel"
          fixture={fixture.id}
          market="1"
          received={(data) => {
            updateMatchInfo(data, featuredGames, setFeaturedGames);
          }}
        >
          <a>
            {fixture.league_name} <br />
            {fixture.location}
          </a>
        </PreOddsChannel>
      ),
    },
    {
      title: "1",
      dataIndex: "outcome_1",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "1", "Market1Pre", fixture.id, "1X2 FT - 1")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
    {
      title: "X",
      dataIndex: "outcome_X",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "X", "Market1Pre", fixture.id, "1X2 FT - X")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
    {
      title: "2",
      dataIndex: "outcome_2",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "2", "Market1Pre", fixture.id, "1X2 FT - 2")
          }
        >
          {oddsFormatter(outcome)}
        </a>
      ),
    },
  ];

  return (
    <>
      {!pageLoading && (
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
                    <Table
                      className="table-striped-rows"
                      columns={columns_live}
                      dataSource={liveGames}
                      size="middle"
                      rowClassName={(record) =>
                        record.market_status == "Active"
                          ? "show-row"
                          : "hide-row"
                      }
                      rowKey={() => {
                        return shortUUID.generate();
                      }}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mb-2 mt-2">
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
                    <Table
                      className="table-striped-rows"
                      columns={columns_feat}
                      dataSource={featuredGames}
                      size="middle"
                      rowClassName={(record) =>
                        record.market_status == "Active"
                          ? "show-row"
                          : "hide-row"
                      }
                      rowKey={() => {
                        return shortUUID.generate();
                      }}
                      pagination={{ pageSize: 10 }}
                    />
                  </div>
                </div>
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
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    data-controller=""
                  >
                    <Table
                      className="table-striped-rows"
                      columns={columns_pre}
                      dataSource={prematchGames}
                      size="middle"
                      rowClassName={(record) =>
                        record.market_status == "Active"
                          ? "show-row"
                          : "hide-row"
                      }
                      rowKey={() => {
                        return shortUUID.generate();
                      }}
                      pagination={{ pageSize: 50 }}
                    />
                    <div className="text-center mb-2">
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
            </div>
          </div>
        </>
      )}
      {pageLoading && <Spinner />}
    </>
  );
};
export default withRouter(Home);
