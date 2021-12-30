import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import shortUUID from "short-uuid";
import MobileBanner1 from "../../Images/mobile_banner_1.webp";
import Banner from "../../Images/web_banner_main.webp";
import NoData from "../NoData";
import Preview from "../Skeleton";

const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const isMobile = useSelector((state) => state.isMobile);
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => getFixtures(), []);

  function getFixtures() {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const columns = [
    {
      title: "Date",
    },
    {
      title: "Teams",
    },
    {
      title: "Competition",
    },
    {
      title: "1",
    },
    {
      title: "2",
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
            <div className="card ">
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
                  BasketBall - Upcoming Events{" "}
                  <i className="fas fa-basketball-ball fa-lg fa-fw mr-2 match-time"></i>
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
                      //   rowClassName={(record) =>
                      //     record.markets[0].status == "Active"
                      //       ? "show-row"
                      //       : "hide-row"
                      //   }
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

export default Home;
