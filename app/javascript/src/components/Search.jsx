import { DropboxOutlined } from "@ant-design/icons";
import { Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import shortUUID from "short-uuid";
import MarketsChannel from "../../channels/marketsChannel";
import PreOddsChannel from "../../channels/preOddsChannel";
import addBet from "../redux/actions";
import * as DataUpdate from "../utilities/DataUpdate";
import Mobile from "../utilities/Mobile";
import Requests from "../utilities/Requests";
import Preview from "./Skeleton";

const Search = (props) => {
  const [games, setGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();

  useEffect(() => loadPreMatchGames(), [props]);

  useEffect(() => loadPreMatchGames(), []);

  const loadPreMatchGames = () => {
    let path = `/api/v1/fixtures/search${props.location.search}`;
    let values = {};
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

  const updateMatchInfo = (data, currentState, setState) => {
    let updatedData = DataUpdate.marketOneUpdates(data, currentState);
    let newState = Array.from(updatedData);
    setState(newState);
  };

  const columns = [
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
            updateMatchInfo(data, games, setGames);
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
            updateMatchInfo(data, games, setGames);
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
      dataIndex: "outcome_mkt1_1",
      render: (outcome, fixture) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
          onClick={() =>
            addBet(dispatcher, "1", "Market1Pre", fixture.id, "1X2 FT - 1")
          }
        >
          {parseFloat(outcome).toFixed(2)}
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
            addBet(dispatcher, "X", "Market1Pre", fixture.id, "1X2 FT - X")
          }
        >
          {parseFloat(outcome).toFixed(2)}
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
            addBet(dispatcher, "2", "Market1Pre", fixture.id, "1X2 FT - 2")
          }
        >
          {parseFloat(outcome).toFixed(2)}
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
            </div>
          </div>
        </>
      )}
      {/* {pageLoading && <Spinner />} */}
      {pageLoading && <Preview />}
    </>
  );
};

export default withRouter(Search);
