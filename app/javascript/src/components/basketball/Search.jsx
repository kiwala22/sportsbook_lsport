import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import shortUUID from "short-uuid";
import MarketsChannel from "../../../channels/marketsChannel";
import PreOddsChannel from "../../../channels/preOddsChannel";
import addBet from "../../redux/actions";
import * as DataUpdate from "../../utilities/DataUpdate";
import oddsFormatter from "../../utilities/oddsFormatter";
import Requests from "../../utilities/Requests";
import NoData from "../shared/NoData";
import Preview from "../shared/Skeleton";

const Search = (props) => {
  const [games, setGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const history = useHistory();

  useEffect(() => loadPreMatchGames(), [props]);

  useEffect(() => loadPreMatchGames(), []);

  const loadPreMatchGames = () => {
    let path = `/api/v1/fixtures/search${props.location.search}`;
    const values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        var preMatch = response.data;
        setGames(preMatch);
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
          <Moment local={true} format="HH:mm">
            {date}
          </Moment>
          <br />
          <Moment format="DD-MMM">{date}</Moment>
        </>
      ),
    },
    {
      title: "Teams",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          market="52"
          received={(data) => {
            updateMatchInfo(data, games, setGames, "226", "Market");
          }}
        >
          {fixture.part_one_name}
          <br />
          {fixture.part_two_name}
        </MarketsChannel>
      ),
    },
    {
      title: "Tournament",
      render: (_, fixture) => (
        <PreOddsChannel
          channel="PreOddsChannel"
          fixture={fixture.id}
          market="52"
          received={(data) => {
            updateMatchInfo(data, games, setGames, "226", "Pre");
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
            fixture.market_226_odds === undefined ||
            fixture.market_226_odds === null ||
            oddsFormatter(fixture.market_226_odds["outcome_1"]) ==
              parseFloat(1.0).toFixed(2)
              ? "btnn intialise_input disabled"
              : "btnn intialise_input btn btn-light wagger-btn"
          }
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "1", "PreMarket", fixture.id, "12 OT - 1", "226")
          }
        >
          {fixture.market_226_odds === undefined ||
          fixture.market_226_odds === null
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.market_226_odds["outcome_1"])}
        </a>
      ),
    },
    {
      title: "2",
      render: (_, fixture) => (
        <a
          className={
            fixture.market_226_odds === undefined ||
            fixture.market_226_odds === null ||
            oddsFormatter(fixture.market_226_odds["outcome_2"]) ==
              parseFloat(1.0).toFixed(2)
              ? "btnn intialise_input disabled"
              : "btnn intialise_input btn btn-light wagger-btn"
          }
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "2", "PreMarket", fixture.id, "12 OT - 2", "226")
          }
        >
          {fixture.market_226_odds === undefined ||
          fixture.market_226_odds === null
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.market_226_odds["outcome_2"])}
        </a>
      ),
    },
    {
      title: " ",
      render: (_, fixture) => (
        <Button
          onClick={() =>
            history.push(`/fixtures/basketball/pre?id=${fixture.id}`)
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
            id="search"
          >
            <div className="card">
              <div className="card-header">
                <h3>Search Results </h3>{" "}
                <i className="fas fa-search fa-lg fa-fw mr-2 match-time"></i>
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
                      columns={columns}
                      dataSource={games}
                      size="middle"
                      rowClassName={(record) =>
                        record.market_226_status == "Active"
                          ? "show-row"
                          : "hide-row"
                      }
                      rowKey={() => {
                        return shortUUID.generate();
                      }}
                      locale={{
                        emptyText: <>{NoData("Results")}</>,
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
      {pageLoading && <Preview />}
    </>
  );
};

export default withRouter(Search);
