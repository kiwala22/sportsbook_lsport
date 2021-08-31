import { DropboxOutlined } from "@ant-design/icons";
import { Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shortUUID from "short-uuid";
import FixtureChannel from "../../channels/fixturesChannel";
import LiveOddsChannel from "../../channels/liveOddsChannel";
import MarketsChannel from "../../channels/marketsChannel";
import Requests from "../utilities/Requests";
import Spinner from "./Spinner";

const LiveVirtualMatches = (props) => {
  const [games, setGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

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

  const columns = [
    {
      title: "Teams",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          received={(data) => {
            console.log(data);
          }}
        >
          <a>
            <strong>{fixture.part_one_name}</strong>
            <strong>{fixture.part_two_name}</strong>
          </a>
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
            received={(data) => console.log(data)}
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
            console.log(data);
            //updateMatchInfo(data, games, setState);
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
      render: (outcome) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
        >
          {parseFloat(outcome).toFixed(2)}
        </a>
      ),
    },
    {
      title: "X",
      dataIndex: "outcome_X",
      render: (outcome) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
        >
          {parseFloat(outcome).toFixed(2)}
        </a>
      ),
    },
    {
      title: "2",
      dataIndex: "outcome_2",
      render: (outcome) => (
        <a
          className="btnn intialise_input"
          data-disable-with="<i class='fas fa-spinner fa-spin'></i>"
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
          <div className="game-box" id="live">
            <div className="card">
              <div className="card-header">
                <h3>
                  Live-Match Fixtures - Virtual Soccer{" "}
                  <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2"></i>
                </h3>
                <span className="float-right">
                  <Link
                    className="btnn btn-blink"
                    to={"/fixtures/virtual_soccer/pres/"}
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
                        rowKey={() => {
                          return shortUUID.generate();
                        }}
                        locale={{
                          emptyText: (
                            <>
                              <span>
                                <DropboxOutlined style={{ fontSize: 40 }} />
                              </span>
                              <br />
                              <span style={{ fontSize: 18 }}>
                                No Fixtures Found
                              </span>
                            </>
                          ),
                        }}
                        pagination={{ pageSize: 100 }}
                      />
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      )}
      {pageLoading && <Spinner />}
    </>
  );
};

export default LiveVirtualMatches;
