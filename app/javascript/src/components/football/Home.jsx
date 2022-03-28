import { DropboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, withRouter } from "react-router-dom";
import shortUUID from "short-uuid";
import FixtureChannel from "../../../channels/fixturesChannel";
import LiveOddsChannel from "../../../channels/liveOddsChannel";
import MarketsChannel from "../../../channels/marketsChannel";
import PreOddsChannel from "../../../channels/preOddsChannel";
import WebBanner from "../../Images/betsports-head.webp";
import addBet from "../../redux/actions";
import * as DataUpdate from "../../utilities/DataUpdate";
import oddsFormatter from "../../utilities/oddsFormatter";
import Requests from "../../utilities/Requests";
import NoData from "../shared/NoData";
import Preview from "../shared/Skeleton";
import useDynamicRefs from 'use-dynamic-refs';
// import Spinner from "./Spinner";

const Home = (props) => {
  const [liveGames, setLiveGames] = useState([]);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [prematchGames, setPrematchGames] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const isMobile = useSelector((state) => state.isMobile);
  const selectedChoices = useSelector((state) => state.selectedChoices)
  const dispatcher = useDispatch();
  const history = useHistory();
  const [getRef, setRef] =  useDynamicRefs();

  let interval;

  useEffect(() => loadGames(), []);

  useEffect(() => {
    if (prematchGames.length === 0) {
      interval = setInterval(() => {
        loadGames();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [prematchGames]);

  useEffect(() => {
    // let interval
    if (selectedChoices.length !== 0) {
      interval = setInterval(() => {
        highLightSelected(selectedChoices);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [selectedChoices]);

  useEffect(() => {
    // let interval
    setTimeout(()=> {
      if (selectedChoices.length !== 0) {
        interval = setInterval(() => {
          highLightSelected(selectedChoices);
        }, 500);
      }
    },1000)
    return () => clearInterval(interval);
  }, []);

  const highLightSelected = (choices) => {
    choices.map((element, index) => {
      let ref = getRef(element.choice)
      if (ref !== undefined && ref !== null) {
        ref.current.style.backgroundColor = '#f6ae2d'
      }
    })
  }

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

  const columns_live = [
    {
      title: "Teams",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          market="1"
          received={(data) => {
            updateMatchInfo(
              data,
              liveGames,
              setLiveGames,
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
    {
      title: "Score",
      render: (_, fixture) => (
        <>
          <FixtureChannel
            channel="FixtureChannel"
            fixture={fixture.id}
            received={(data) => {
              updateMatchInfo(data, liveGames, setLiveGames, "1", "Fixture");
            }}
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
    {
      title: "Tournament",
      render: (_, fixture) => (
        <LiveOddsChannel
          channel="LiveOddsChannel"
          fixture={fixture.id}
          market="1"
          received={(data) => {
            updateMatchInfo(
              data,
              liveGames,
              setLiveGames,
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
          ref={setRef(`${fixture.id}_market_1_1`)}
          
        onClick={() => {
            addBet(dispatcher, "1", "LiveMarket", fixture.id, "1X2 FT - 1", "1", null, `${fixture.id}_market_1_1`);
        }
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
          ref={setRef(`${fixture.id}_market_1_X`)}
          onClick={() =>
            addBet(dispatcher, "X", "LiveMarket", fixture.id, "1X2 FT - X", "1", null, `${fixture.id}_market_1_X`)
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
          ref={setRef(`${fixture.id}_market_1_2`)}
          onClick={() =>
            addBet(dispatcher, "2", "LiveMarket", fixture.id, "1X2 FT - 2", "1", null, `${fixture.id}_market_1_2`)
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
          onClick={() => history.push(`/fixtures/soccer/live?id=${fixture.id}`)}
          icon={<PlusOutlined />}
          className="icon-more"
        />
      ),
    },
  ];

  const columns_pre = [
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
          market="1"
          received={(data) => {
            updateMatchInfo(
              data,
              prematchGames,
              setPrematchGames,
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
              prematchGames,
              setPrematchGames,
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
          ref={setRef(`${fixture.id}_market_1_1`)}
          onClick={() =>
            addBet(dispatcher, "1", "PreMarket", fixture.id, "1X2 FT - 1", "1", null, `${fixture.id}_market_1_1`)
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
          ref={setRef(`${fixture.id}_market_1_X`)}
          onClick={() =>
            addBet(dispatcher, "X", "PreMarket", fixture.id, "1X2 FT - X", "1", null, `${fixture.id}_market_1_X`)
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
          ref={setRef(`${fixture.id}_market_1_2`)}
          onClick={() =>
            addBet(dispatcher, "2", "PreMarket", fixture.id, "1X2 FT - 2", "1", null, `${fixture.id}_market_1_2`)
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
          onClick={() => history.push(`/fixtures/soccer/pre?id=${fixture.id}`)}
          icon={<PlusOutlined />}
          className="icon-more"
        />
      ),
    },
  ];

  const columns_feat = [
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
          market="1"
          received={(data) => {
            updateMatchInfo(
              data,
              featuredGames,
              setFeaturedGames,
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
              featuredGames,
              setFeaturedGames,
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
          ref={setRef(`${fixture.id}_market_1_1`)}
          onClick={() =>
            addBet(dispatcher, "1", "PreMarket", fixture.id, "1X2 FT - 1", "1", null, `${fixture.id}_market_1_1`)
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
          ref={setRef(`${fixture.id}_market_1_X`)}
          onClick={() =>
            addBet(dispatcher, "X", "PreMarket", fixture.id, "1X2 FT - X", "1", null, `${fixture.id}_market_1_X`)
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
          ref={setRef(`${fixture.id}_market_1_2`)}
          onClick={() =>
            addBet(dispatcher, "2", "PreMarket", fixture.id, "1X2 FT - 2", "1", null, `${fixture.id}_market_1_2`)
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
          onClick={() => history.push(`/fixtures/soccer/pre?id=${fixture.id}`)}
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
          {isMobile ? (
            <div className="card ">
              <div className="card-header side-banner ">
                <img src={WebBanner} className="banner-image" />
              </div>
            </div>
          ) : (
            <div className="card mt-1">
              <div className="card-header side-banner">
                <img src={WebBanner} className="banner-image" />
              </div>
            </div>
          )}
          {liveGames.length != 0 && (
            <>
              <div
                className={
                  isMobile ? "game-box mobile-table-padding" : "game-box"
                }
                id="live"
              >
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
                                <span>
                                  <DropboxOutlined className="font-40" />
                                </span>
                                <br />
                                <span className="font-18">
                                  No Fixtures Found
                                </span>
                              </>
                            ),
                          }}
                          pagination={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mb-2 mt-2 custom-anchor">
                    <Link
                      className="match-time show-more"
                      to={"/fixtures/soccer/lives/"}
                    >
                      Show More
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <!-- Start Featured Fixtures Table --> */}
          {/* {isMobile && liveGames.length != 0 && featuredGames.length != 0 && (
            <div className="card ">
              <div className="card-header side-banner ">
                <img src={MobileBanner2} className="banner-image" />
              </div>
            </div>
          )} */}
          {featuredGames.length != 0 && (
            <>
              <div
                className={
                  isMobile ? "game-box mobile-table-padding" : "game-box"
                }
                id="featured"
              >
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
                            record.markets[0].status == "Active"
                              ? "show-row"
                              : "hide-row"
                          }
                          rowKey={() => {
                            return shortUUID.generate();
                          }}
                          locale={{
                            emptyText: <>{NoData("Featured Events")}</>,
                          }}
                          pagination={{ pageSize: 10 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* <!-- End Featured Fixtures Table --> */}

          {/* <!-- Start All Fixtures Table --> */}
          {/* {isMobile && featuredGames.length != 0 && prematchGames.length != 0 && (
            <div className="card ">
              <div className="card-header side-banner ">
                <img src={MobileBanner3} className="banner-image" />
              </div>
            </div>
          )} */}
          {/* {prematchGames.length != 0 && (
            <> */}
          <div
            className={isMobile ? "game-box mobile-table-padding" : "game-box"}
          >
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
                            {/* <span>
                                  <DropboxOutlined className="font-40" />
                                </span>
                                <br />
                                <span className="font-18">
                                  No Fixtures Found
                                </span> */}
                            {/* {NoData()} */}
                            <Preview />
                          </>
                        ),
                      }}
                      pagination={{ defaultPageSize: 50 }}
                    />
                    <div className="text-center mb-2 mt-2 custom-anchor">
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
      {/* </>
      )} */}
      {pageLoading && <Preview />}
    </>
  );
};
export default withRouter(Home);
