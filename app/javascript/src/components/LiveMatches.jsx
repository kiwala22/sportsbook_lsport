import { DropboxOutlined } from "@ant-design/icons";
import { Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import shortUUID from "short-uuid";
import FixtureChannel from "../../channels/fixturesChannel";
import LiveOddsChannel from "../../channels/liveOddsChannel";
import MarketsChannel from "../../channels/marketsChannel";
import addBet from "../redux/actions";
import * as DataUpdate from "../utilities/DataUpdate";
import Mobile from "../utilities/Mobile";
import oddsFormatter from "../utilities/oddsFormatter";
import Requests from "../utilities/Requests";
import Preview from "./Skeleton";

const LiveMatches = (props) => {
  const [games, setGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();

  useEffect(() => loadLiveGames(), []);

  const loadLiveGames = () => {
    let path = "/api/v1/fixtures/soccer/live";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        var liveGames = response.data;
        if (liveGames instanceof Array) {
          setGames(liveGames);
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

  const columns = [
    {
      title: "Teams",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          received={(data) => {
            updateMatchInfo(data, games, setGames);
          }}
        >
          {Mobile.isMobile() ? (
            <Link
              to={{
                pathname: "/fixtures/soccer/live",
                search: `id=${fixture.id}`,
              }}
            >
              <strong>{fixture.part_one_name}</strong>
              <strong>{fixture.part_two_name}</strong>
              <strong>{fixture.league_name}</strong>
            </Link>
          ) : (
            <Link
              to={{
                pathname: "/fixtures/soccer/live",
                search: `id=${fixture.id}`,
              }}
            >
              <strong>{fixture.part_one_name}</strong>
              <strong>{fixture.part_two_name}</strong>
            </Link>
          )}
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
            received={(data) => updateMatchInfo(data, games, setGames)}
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
      responsive: ["md"],
      render: (_, fixture) => (
        <LiveOddsChannel
          channel="LiveOddsChannel"
          fixture={fixture.id}
          market="1"
          received={(data) => {
            updateMatchInfo(data, games, setGames);
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
      dataIndex: "outcome_mkt1_1",
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
      dataIndex: "outcome_mkt1_X",
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
      dataIndex: "outcome_mkt1_2",
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

  return (
    <>
      {!pageLoading && (
        <>
          <div
            className={
              Mobile.isMobile()
                ? "game-box mobile-table-padding-games"
                : "game-box"
            }
            id="live"
          >
            <div className="card">
              <div className="card-header">
                <h3>
                  Live Fixtures - Soccer{" "}
                  <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2"></i>
                </h3>
                <span className="float-right">
                  <Link
                    className="btnn btn-blink"
                    to={"/fixtures/soccer/pres/"}
                  >
                    <i className="fas fa-futbol"></i> Pre-Match
                  </Link>
                </span>
              </div>
              <>
                <div className="card-body">
                  <div className="tab-content" id="">
                    <div
                      className="tab-pane fade show active"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <Table
                        className="table-striped-rows"
                        columns={columns}
                        dataSource={games}
                        size="middle"
                        rowClassName={(record) =>
                          record.market_mkt1_status == "Active"
                            ? "show-row"
                            : "hide-row"
                        }
                        rowKey={() => {
                          return shortUUID.generate();
                        }}
                        locale={{
                          emptyText: (
                            <>
                              <span>
                                <DropboxOutlined className="font-40" />
                              </span>
                              <br />
                              <span className="font-18">No Fixtures Found</span>
                            </>
                          ),
                        }}
                        pagination={{ defaultPageSize: 50 }}
                      />
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      )}
      {/* {pageLoading && <Spinner />} */}
      {pageLoading && <Preview />}
    </>
  );
};

export default LiveMatches;
