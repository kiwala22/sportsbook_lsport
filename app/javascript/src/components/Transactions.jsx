import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash, BsPlus } from "react-icons/bs";
import Moment from "react-moment";
import shortUUID from "short-uuid";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => loadTransactions(), []);

  const loadTransactions = () => {
    let path = "/api/v1/transactions";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 10,
          }
        );
      });
  };

  return (
    <>
      <div className="game-box">
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
                <table className="table table-borderless table-striped">
                  <thead>
                    <tr>
                      <th>#No</th>
                      <th>Phone Number</th>
                      <th>Amount</th>
                      <th>Balance Before</th>
                      <th>Balance After</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {transactions &&
                      transactions.map((transaction, index) => (
                        <tr key={shortUUID.generate()}>
                          <td>{index + 1}</td>
                          <td>{transaction.phone_number}</td>
                          {transaction.category === "Deposit" ? (
                            <td className="deposit">
                              <BsPlus className="Bs-transaction-icon" />
                              {currencyFormatter(transaction.amount)}
                            </td>
                          ) : transaction.category === "Withdraw" ? (
                            <td className="withdraw">
                              <BsDash className="Bs-transaction-icon" />
                              {currencyFormatter(transaction.amount)}
                            </td>
                          ) : transaction.category === "Bet Stake" ? (
                            <td className="withdraw">
                              <BsDash className="Bs-transaction-icon" />
                              {currencyFormatter(transaction.amount)}
                            </td>
                          ) : (
                            <td className="deposit">
                              <BsPlus className="Bs-transaction-icon" />
                              {currencyFormatter(transaction.amount)}
                            </td>
                          )}
                          <td>
                            {currencyFormatter(transaction.balance_before)}
                          </td>
                          <td>
                            {currencyFormatter(transaction.balance_after)}
                          </td>
                          <td>{transaction.category}</td>
                          <td>{transaction.status}</td>
                          <td>
                            <Moment local={true} format="DD/MM/YY HH:mm A">
                              {transaction.created_at}
                            </Moment>
                          </td>
                        </tr>
                      ))}
                    {transactions.length == 0 && (
                      <h6 className="event">No Transactions Found</h6>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
