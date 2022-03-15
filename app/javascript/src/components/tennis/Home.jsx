import { PlusOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import shortUUID from "short-uuid";
import MarketsChannel from "../../../channels/marketsChannel";
import PreOddsChannel from "../../../channels/preOddsChannel";
import MobileBanner1 from "../../Images/mobile_banner_1.webp";
import Banner from "../../Images/web_banner_main.webp";
import addBet from "../../redux/actions";
import oddsFormatter from "../../utilities/oddsFormatter";
import Requests from "../../utilities/Requests";
import NoData from "../shared/NoData";
import Preview from "../shared/Skeleton";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const isMobile = useSelector((state) => state.isMobile);
  const [fixtures, setFixtures] = useState([]);
  const dispatcher = useDispatch();
  const history = useHistory();

  let interval;

  useEffect(() => getFixtures(), []);

  useEffect(() => {
    if (fixtures.length === 0) {
      interval = setInterval(() => {
        getFixtures();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [fixtures]);

  const getFixtures = () => {
    let path = `/api/v1/home_tennis`;
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        var events = response.data;
        if (events instanceof Array) {
          setFixtures(events);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
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
      title: "Competitors",
      render: (_, fixture) => (
        <MarketsChannel
          channel="MarketsChannel"
          fixture={fixture.id}
          market="52"
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
    {
      title: "Competition",
      render: (_, fixture) => (
        <PreOddsChannel
          channel="PreOddsChannel"
          fixture={fixture.id}
          market="52"
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
            addBet(dispatcher, "1", "PreMarket", fixture.id, "12 FT - 1", "52")
          }
        >
          {fixture.markets.length == 0 || fixture.markets[0].odds === null
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.markets[0].odds["outcome_1"])}
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
            addBet(dispatcher, "2", "PreMarket", fixture.id, "12 FT - 2", "52")
          }
        >
          {fixture.markets.length == 0 || fixture.markets[0].odds === null
            ? parseFloat(1.0).toFixed(2)
            : oddsFormatter(fixture.markets[0].odds["outcome_2"])}
        </a>
      ),
    },
    {
      title: " ",
      render: (_, fixture) => (
        <Button
          onClick={() => history.push(`/fixtures/tennis/pre?id=${fixture.id}`)}
          icon={<PlusOutlined />}
          className="icon-more"
        />
      ),
    },
  ];

  return (
    <>
      {!loading && (
        <>
          {isMobile ? (
            <div className="card ">
              <div className="card-header side-banner ">
                <img src={MobileBanner1} className="banner-image" />
              </div>
            </div>
          ) : (
            <div className="card mt-1">
              <div className="card-header side-banner ">
                <img src={Banner} className="banner-image" />
              </div>
            </div>
          )}
          <br />
          <div
            className={
              isMobile ? "game-box mobile-table-padding-games" : "game-box"
            }
          >
            <div className="card">
              <div className="card-header">
                <h3>
                  Tennis - Upcoming Events{" "}
                  <i className="fas fa-baseball-ball fa-lg fa-fw mr-2 match-time"></i>
                </h3>
              </div>
              <div className="card-body">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <Table
                      className="table-striped-rows"
                      columns={columns}
                      dataSource={fixtures}
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
                        emptyText: <>{NoData("Upcoming Events")}</>,
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
      {loading && <Preview />}
    </>
  );
};

export default withRouter(Home);
