import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Moment from "react-moment";
import shortUUID from "short-uuid";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";
import BetReceipt from "./BetReceipt";

const Bets = () => {
  const [bets, setBets] = useState([]);

  useEffect(() => loadBets(), []);

  const loadBets = () => {
    let path = "/api/v1/bets";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        setBets(response.data);
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
      <div class="game-box">
        <div class="card">
          <div class="card-header">
            <h3>Bet Tickets</h3>
          </div>
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
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
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active table-responsive"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <table class="table table-borderless table-striped">
                  <thead>
                    <tr>
                      <th>#No</th>
                      <th>Games</th>
                      <th>Stake</th>
                      <th>Odds</th>
                      <th>Possible Win</th>
                      <th>Amount Won</th>
                      <th>Status</th>
                      <th>Result</th>
                      <th>Paid</th>
                      <th>Bet Time</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  {bets && (
                    <tbody>
                      {bets.map((bet, index) => (
                        <tr key={shortUUID.generate()}>
                          <td>{bet.id}</td>
                          <td>{bet.bet_count}</td>
                          <td>{currencyFormatter(bet.stake)}</td>
                          <td>{bet.odds}</td>
                          <td>{currencyFormatter(bet.potential_win_amount)}</td>
                          <td>{currencyFormatter(bet.win_amount)}</td>
                          <td>{bet.status}</td>
                          <td>{bet.result}</td>
                          <td>{bet.paid}</td>
                          <td>
                            <Moment local={true} format="DD/MM/YY HH:MM A">
                              {bet.created_at}
                            </Moment>
                          </td>
                          <td>
                            <BetReceipt data={bet}>
                              <Button variant="outline-warning" size="sm">
                                Receipt
                              </Button>
                            </BetReceipt>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {bets.length == 0 && (
                    <h6 class="event">No Bet Tickets Found</h6>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bets;
