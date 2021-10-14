import { DropboxOutlined } from "@ant-design/icons";
import { Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import shortUUID from "short-uuid";
import MarketsChannel from "../../channels/marketsChannel";
import PreOddsChannel from "../../channels/preOddsChannel";
import addBet from "../redux/actions";
import * as DataUpdate from "../utilities/DataUpdate";
import Mobile from "../utilities/Mobile";
import oddsFormatter from "../utilities/oddsFormatter";
import Requests from "../utilities/Requests";
import Preview from "./Skeleton";

const PreVirtualMatches = (props) => {
  const [games, setGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();

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
    let fixtureIndex = currentState.findIndex((el) => data.id == el.id);
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
    {
      title: "Date",
      dataIndex: "start_date",
      render: (date) => (
        <>
          <a>
            <Moment local={true} format="HH:mm">
              {date}
            </Moment>
            <br />
            <Moment format="DD-MMM">{date}</Moment>
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
            updateMatchInfo(
              data,
              games,
              setGames,
              data.market_identifier,
              "Market"
            );
          }}
        >
          <Link
            to={{
              pathname: "/fixtures/virtual_soccer/pre",
              search: `id=${fixture.id}`,
            }}
            className="show-more"
          >
            {fixture.part_one_name} <br />
            {fixture.part_two_name}
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
            updateMatchInfo(
              data,
              games,
              setGames,
              data.market_identifier,
              "Pre"
            );
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
      render: (_, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "1", "PreMarket", fixture.id, "1X2 FT - 1", "1")
          }
        >
          {fixture.market_1_odds === undefined
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.market_1_odds["outcome_1"])}
        </a>
      ),
    },
    {
      title: "X",
      render: (_, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "X", "PreMarket", fixture.id, "1X2 FT - X", "1")
          }
        >
          {fixture.market_1_odds === undefined
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.market_1_odds["outcome_X"])}
        </a>
      ),
    },
    {
      title: "2",
      render: (_, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "2", "PreMarket", fixture.id, "1X2 FT - 2", "1")
          }
        >
          {fixture.market_1_odds === undefined
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.market_1_odds["outcome_2"])}
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
          >
            <div className="card">
              <div className="card-header">
                <h3>
                  Upcoming Fixtures - Virtual Soccer{" "}
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
                        record.market_1_status == "Active"
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
