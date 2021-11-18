import { DropboxOutlined } from "@ant-design/icons";
import { Table } from "antd";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import shortUUID from "short-uuid";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";
import Preview from "./Skeleton";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const isMobile = useSelector((state) => state.isMobile);

  useEffect(() => loadTransactions(), []);

  const loadTransactions = () => {
    let path = "/api/v1/transactions";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        if (response.data instanceof Array) {
          setTransactions(response.data);
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
      title: "Phone Number",
      dataIndex: "phone_number",
      render: (phone) => {
        return "0" + phone.slice(3);
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount, transaction) =>
        transaction.category === "Deposit" ? (
          <span className="deposit">{currencyFormatter(amount)}</span>
        ) : transaction.category === "Withdraw" ? (
          <span className="withdraw">{currencyFormatter(amount)}</span>
        ) : transaction.category === "Bet Stake" ? (
          <span className="withdraw">{currencyFormatter(amount)}</span>
        ) : (
          <span className="deposit">{currencyFormatter(amount)}</span>
        ),
    },
    {
      title: "Balance Before",
      dataIndex: "balance_before",
      render: (balance_before) => currencyFormatter(balance_before),
    },
    {
      title: "Balance After",
      dataIndex: "balance_after",
      render: (balance_after) => currencyFormatter(balance_after),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Time",
      dataIndex: "created_at",
      render: (created_at) => (
        <Moment local={true} format="DD/MM/YY HH:mm A">
          {created_at}
        </Moment>
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
                <h3>Transactions</h3>
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
                      All Transactions
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
                      dataSource={transactions}
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
                            <span className="font-18">
                              No Transactions Found
                            </span>
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

export default Transactions;
