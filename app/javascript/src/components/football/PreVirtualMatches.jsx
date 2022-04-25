import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import shortUUID from "short-uuid";
import MarketsChannel from "../../../channels/marketsChannel";
import PreOddsChannel from "../../../channels/preOddsChannel";
import addBet from "../../redux/actions";
import * as DataUpdate from "../../utilities/DataUpdate";
import oddsFormatter from "../../utilities/oddsFormatter";
import Requests from "../../utilities/Requests";
import NoData from "../shared/NoData";
import Preview from "../shared/Skeleton";

const PreVirtualMatches = (props) => {
  const [games, setGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const history = useHistory();

  useEffect(() => loadPreMatchGames(), []);

  const loadPreMatchGames = () => {
    let path = "/api/v1/fixtures/virtual_soccer/virtual_pre";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        var preMatch = response.data;
        if (preMatch instanceof Array) {
          setGames(preMatch);
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
      ? { className: "mobile-none-display" }
      : {
          title: "Date",
          dataIndex: "start_date",
          render: (date) => (
            <>
              <Moment local={true} format="HH:mm">
                {date}
              </Moment>
              <br />
              <Moment format="DD-MMM">{date}</Moment>
            </>
          ),
        },
    isMobile
      ? {
          title: "Fixture",
          render: (_, fixture) => (
            <>
              <p className="date-pr-bottom">
                <Moment format="DD-MMM HH:mm">{fixture.start_date}</Moment>
              </p>
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
                <PreOddsChannel
                  channel="PreOddsChannel"
                  fixture={fixture.id}
                  market="1"
                  received={(data) => {
                    updateMatchInfo(
                      data,
                      games,
                      setGames,
                      data.market_identifier,
                      "Pre"
                    );
                  }}
                >
                  {fixture.league_name}
                </PreOddsChannel>
              </p>
            </>
          ),
        }
      : {
          title: "Fixture",
          render: (_, fixture) => (
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
          ),
        },
    isMobile
      ? { className: "mobile-none-display" }
      : {
          title: "League",
          render: (_, fixture) => (
            <PreOddsChannel
              channel="PreOddsChannel"
              fixture={fixture.id}
              market="1"
              received={(data) => {
                updateMatchInfo(
                  data,
                  games,
                  setGames,
                  data.market_identifier,
                  "Pre"
                );
              }}
            >
              {fixture.league_name} <br />
              {fixture.location}
            </PreOddsChannel>
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
            addBet(dispatcher, "1", "PreMarket", fixture.id, "1X2 FT - 1", "1")
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
            addBet(dispatcher, "X", "PreMarket", fixture.id, "1X2 FT - X", "1")
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
            addBet(dispatcher, "2", "PreMarket", fixture.id, "1X2 FT - 2", "1")
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
            history.push(`/fixtures/virtual_soccer/pre?id=${fixture.id}`)
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
          >
            <div className="card">
              <div className="card-header">
                <h3>
                  Upcoming - Virtual Soccer{" "}
                  <i className="fas fa-futbol fa-lg fa-fw mr-2 match-time"></i>
                </h3>
                <span className="float-right custom-span">
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
                            {NoData("Upcoming Virtual Events")}
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
            </div>
          </div>
        </>
      )}
      {/* {pageLoading && <Spinner />} */}
      {pageLoading && <Preview />}
    </>
  );
};

export default PreVirtualMatches;
