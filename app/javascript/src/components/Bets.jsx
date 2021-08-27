import { Button, Table } from "antd";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import Moment from "react-moment";
import shortUUID from "short-uuid";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";
import BetReceipt from "./BetReceipt";
import Spinner from "./Spinner";

const Bets = () => {
  const [bets, setBets] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

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
        <Moment local={true} format="DD/MM/YY HH:MM A">
          {time}
        </Moment>
      ),
    },
    {
      title: "Receipt",
      render: (_, data) => (
        <BetReceipt data={data}>
          <Button
            type="dashed"
            ghost
            size="sm"
            style={{ color: "#f6ae2d", borderColor: "#f6ae2d" }}
          >
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
          <div className="game-box">
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
                      pagination={{ pageSize: 25 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {pageLoading && <Spinner />}
    </>
  );
};

export default Bets;