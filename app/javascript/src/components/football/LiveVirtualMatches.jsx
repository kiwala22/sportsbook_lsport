import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import shortUUID from "short-uuid";
import FixtureChannel from "../../../channels/fixturesChannel";
import LiveOddsChannel from "../../../channels/liveOddsChannel";
import MarketsChannel from "../../../channels/marketsChannel";
import addBet from "../../redux/actions";
import * as DataUpdate from "../../utilities/DataUpdate";
import oddsFormatter from "../../utilities/oddsFormatter";
import Requests from "../../utilities/Requests";
import NoData from "../shared/NoData";
import Preview from "../shared/Skeleton";

const LiveVirtualMatches = (props) => {
  const [games, setGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const history = useHistory();

  useEffect(() => loadLiveGames(), []);

  const loadLiveGames = () => {
    let path = "/api/v1/fixtures/virtual_soccer/virtual_live";
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

  const updateMatchInfo = (data, currentState, setState, market, channel) => {
    let fixtureIndex = currentState.findIndex((el) => data.fixture_id == el.id);
    let fixture = currentState[fixtureIndex];
    let updatedFixture = DataUpdate.fixtureUpdate(
      data,
      fixture,
      market,
      channel
    );
    currentState[fixtureIndex] = {
      ...currentState[fixtureIndex],
      ...updatedFixture,
    };
    let newState = Array.from(currentState);
    setState(newState);
  };

  const columns = [
    isMobile
      ? {
          title: "Fixture",
          render: (_, fixture) => (
            <>
              <MarketsChannel
                channel="MarketsChannel"
                fixture={fixture.id}
                market="1"
                received={(data) => {
                  updateMatchInfo(
                    data,
                    games,
                    setGames,
                    data.market_identifier,
                    "Market"
                  );
                }}
              >
                {fixture.part_one_name} <br />
                {fixture.part_two_name}
              </MarketsChannel>
              <p className="tournament-pr-top">
                <LiveOddsChannel
                  channel="LiveOddsChannel"
                  fixture={fixture.id}
                  market="1"
                  received={(data) => {
                    updateMatchInfo(
                      data,
                      games,
                      setGames,
                      data.market_identifier,
                      "Live"
                    );
                  }}
                >
                  {fixture.league_name}
                </LiveOddsChannel>
              </p>
            </>
          ),
        }
      : {
          title: "Fixture",
          render: (_, fixture) => (
            <>
              <MarketsChannel
                channel="MarketsChannel"
                fixture={fixture.id}
                market="1"
                received={(data) => {
                  updateMatchInfo(
                    data,
                    games,
                    setGames,
                    data.market_identifier,
                    "Market"
                  );
                }}
              >
                {fixture.part_one_name} <br />
                {fixture.part_two_name}
              </MarketsChannel>
            </>
          ),
        },
    {
      title: "Score",
      render: (_, fixture) => (
        <>
          <FixtureChannel
            channel="FixtureChannel"
            fixture={fixture.id}
            received={(data) =>
              updateMatchInfo(data, games, setGames, "1", "Fixture")
            }
          >
            <strong>
              <span className="blinking match-time">{fixture.match_time}</span>
            </strong>
            <strong>
              {isMobile ? (
                <span className="score">
                  {fixture.home_score} - {fixture.away_score}
                </span>
              ) : (
                <span className="score">
                  {fixture.home_score} <BsDash /> {fixture.away_score}
                </span>
              )}
            </strong>
          </FixtureChannel>
        </>
      ),
    },
    isMobile
      ? {}
      : {
          title: "League",
          responsive: ["md"],
          render: (_, fixture) => (
            <LiveOddsChannel
              channel="LiveOddsChannel"
              fixture={fixture.id}
              market="1"
              received={(data) => {
                updateMatchInfo(
                  data,
                  games,
                  setGames,
                  data.market_identifier,
                  "Live"
                );
              }}
            >
              {fixture.league_name} <br />
              {fixture.location}
            </LiveOddsChannel>
          ),
        },
    {
      title: "1",
      render: (_, fixture) => (
        <a
          className={
            fixture.markets.length == 0 ||
            fixture.markets[0].odds === null ||
            oddsFormatter(fixture.markets[0].odds["outcome_1"]) ==
              parseFloat(1.0).toFixed(2)
              ? "btnn intialise_input disabled"
              : "btnn intialise_input btn btn-light wagger-btn"
          }
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "1", "LiveMarket", fixture.id, "1X2 FT - 1", "1")
          }
        >
          {fixture.markets.length == 0 || fixture.markets[0].odds === null
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.markets[0].odds["outcome_1"])}
        </a>
      ),
    },
    {
      title: "X",
      render: (_, fixture) => (
        <a
          className={
            fixture.markets.length == 0 ||
            fixture.markets[0].odds === null ||
            oddsFormatter(fixture.markets[0].odds["outcome_X"]) ==
              parseFloat(1.0).toFixed(2)
              ? "btnn intialise_input disabled"
              : "btnn intialise_input btn btn-light wagger-btn"
          }
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "X", "LiveMarket", fixture.id, "1X2 FT - X", "1")
          }
        >
          {fixture.markets.length == 0 || fixture.markets[0].odds === null
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.markets[0].odds["outcome_X"])}
        </a>
      ),
    },
    {
      title: "2",
      render: (_, fixture) => (
        <a
          className={
            fixture.markets.length == 0 ||
            fixture.markets[0].odds === null ||
            oddsFormatter(fixture.markets[0].odds["outcome_2"]) ==
              parseFloat(1.0).toFixed(2)
              ? "btnn intialise_input disabled"
              : "btnn intialise_input btn btn-light wagger-btn"
          }
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "2", "LiveMarket", fixture.id, "1X2 FT - 2", "1")
          }
        >
          {fixture.markets.length == 0 || fixture.markets[0].odds === null
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.markets[0].odds["outcome_2"])}
        </a>
      ),
    },
    {
      title: "",
      render: (_, fixture) => (
        <Button
          onClick={() =>
            history.push(`/fixtures/virtual_soccer/live?id=${fixture.id}`)
          }
          icon={<PlusOutlined />}
          className="icon-more"
        />
      ),
    },
  ];

  return (
    <>
      {!pageLoading && (
        <>
          <div
            className={
              isMobile ? "game-box mobile-table-padding-games" : "game-box"
            }
            id="live"
          >
            <div className="card">
              <div className="card-header">
                <h3>
                  Live Fixtures - Virtual Soccer{" "}
                  <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2"></i>
                </h3>
                <span className="float-right custom-span">
                  <Link
                    className="btnn btn-blink"
                    to={"/fixtures/virtual_soccer/pres/"}
                  >
                    <i className="fas fa-futbol"></i> PreMatch
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
                          record.markets[0].status == "Active"
                            ? "show-row"
                            : "hide-row"
                        }
                        rowKey={() => {
                          return shortUUID.generate();
                        }}
                        locale={{
                          emptyText: (
                            <>
                              {NoData("Virtual Live Events")}
                              {/* <span>
                                <DropboxOutlined className="font-40" />
                              </span>
                              <br />
                              <span className="font-18">No Fixtures Found</span> */}
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

export default LiveVirtualMatches;
