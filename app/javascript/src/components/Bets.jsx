import { DropboxOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import shortUUID from "short-uuid";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";
import BetReceipt from "./BetReceipt";
import Preview from "./Skeleton";

const Bets = () => {
  const [bets, setBets] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const isMobile = useSelector((state) => state.isMobile);

  useEffect(() => loadBets(), []);

  const loadBets = () => {
    let path = "/api/v1/bets";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        if (response.data instanceof Array) {
          setBets(response.data);
        }
        setPageLoading(false);
      })
      .catch((error) => {
        setPageLoading(true);
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 10,
          }
        );
      });
  };

  const columns = [
    {
      title: "#No",
      render: (_, data, index) => index + 1,
      responsive: ["md"],
    },
    {
      title: "Games",
      dataIndex: "bet_count",
    },
    {
      title: "Stake",
      dataIndex: "stake",
      render: (stake) => currencyFormatter(stake),
    },
    {
      title: "Odds",
      dataIndex: "odds",
    },
    {
      title: "Possible Win",
      dataIndex: "potential_win_amount",
      render: (win) => currencyFormatter(win),
    },
    {
      title: "Amount Won",
      dataIndex: "win_amount",
      render: (amount) => currencyFormatter(amount),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Result",
      dataIndex: "result",
      render: (result) => (result === null ? "Pending" : result),
    },
    {
      title: "Paid",
      dataIndex: "paid",
      render: (paid) => (paid === true ? "True" : "False"),
    },
    {
      title: "Bet Time",
      dataIndex: "created_at",
      render: (time) => (
        <Moment local={true} format=" HH:mm a DD/MMM">
          {time}
        </Moment>
      ),
    },
    {
      title: "Receipt",
      render: (_, data) => (
        <BetReceipt data={data}>
          <Button type="dashed" ghost size="sm">
            Receipt
          </Button>
        </BetReceipt>
      ),
    },
  ];

  return (
    <>
      {!pageLoading && (
        <>
          <div
            className={isMobile ? "game-box mobile-table-padding" : "game-box"}
          >
            <div className="card">
              <div className="card-header">
                <h3>Bet Tickets</h3>
              </div>
              <div className="card-body">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      All Bet Tickets
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active table-responsive"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <Table
                      className="table-striped-rows"
                      columns={columns}
                      dataSource={bets}
                      size="middle"
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
                            <span className="font-18">No Tickets Found</span>
                          </>
                        ),
                      }}
                      pagination={{ pageSize: 25 }}
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

export default Bets;
