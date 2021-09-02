import { Button } from "antd";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortUUID from "short-uuid";
import BetslipChannel from "../../channels/betSlipsChannel";
import MarketsChannel from "../../channels/marketsChannel";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Request from "../utilities/Requests";
import Login from "./Login";

const BetSlip = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [win, setWin] = useState("UGX 0");
  const intialStake = localStorage.getItem("stake") || "";
  const [stake, setStake] = useState(intialStake);
  const userSignedIn = useSelector((state) => state.signedIn);
  const games = useSelector((state) => state.games);
  const dispatcher = useDispatch();

  useEffect(() => {
    loadCartGames();
    calculateWin();
  }, []);

  useEffect(() => {
    calculateWin();
  }, [games]);

  useEffect(() => {
    calculateWin();
  }, [stake]);

  const loadCartGames = () => {
    let path = "/cart_fixtures";
    let values = {};
    Request.isGetRequest(path, values)
      .then((response) => {
        let data = response.data;
        dispatcher({ type: "addBet", payload: data });
      })
      .catch((error) => {
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 5,
          }
        );
      });
  };

  const totalOdds = () => {
    let odds = games
      .filter((bet) => bet.market_status === "Active")
      .map((el) => parseFloat(el.odd));
    return odds.reduce((a, b) => a * b, 1).toFixed(2);
  };

  const calculateWin = () => {
    let newAmount = 0.0;
    let odds = totalOdds();
    if (
      stake !== null &&
      parseFloat(stake) >= 1000 &&
      parseFloat(stake) <= 1000000
    ) {
      newAmount = parseFloat(stake) * odds;
      localStorage.setItem("stake", stake);
    }
    return currencyFormatter(newAmount);
  };

  const clearBetSlip = () => {
    window.localStorage.removeItem("stake");
    let path = "/clear_slip";
    let values = {};
    Request.isDeleteRequest(path, values)
      .then((response) => {
        if (response.data.status == "OK") {
          dispatcher({ type: "addBet", payload: [] });
          cogoToast.success("Your Betslip is now empty.", {
            hideAfter: 5,
          });
        }
      })
      .catch((error) => {
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 5,
          }
        );
      });
  };

  function updateSlipGames(data, games) {
    if (games !== undefined) {
      let fixtureIndex = games.findIndex((el) => data.id == el.fixtureId);
      games[fixtureIndex] = {
        ...games[fixtureIndex],
        ...{
          market_status: data.market_status,
          odd: data[`outcome_${games[fixtureIndex].outcome}`],
        },
      };
      dispatcher({ type: "addBet", payload: games });
    }
  }

  const slipGames = () => {
    return games
      .filter((el) => el.market_status === "Active")
      .map((bet) => (
        <BetslipChannel
          key={shortUUID.generate()}
          channel="BetslipChannel"
          fixture={bet.fixtureId}
          market={bet.market.match(/\d/g).join("")}
          received={(data) => {
            updateSlipGames(data, games);
          }}
        >
          <MarketsChannel
            channel="MarketsChannel"
            fixture={bet.fixtureId}
            received={(data) => {
              updateSlipGames(data, games);
            }}
          >
            <div className="row lineBet">
              <div className="col-12 px-2">
                <div className="single-bet">
                  <div className="col-1 px-1">
                    <a onClick={() => deleteLineBet(bet.id)}>
                      <i className="far fa-times-circle"></i>
                    </a>
                  </div>
                  <div id="comp-names" className="col-9 px-1">
                    <span>
                      {" "}
                      {bet.partOne} - {bet.partTwo}{" "}
                    </span>
                    <span>{bet.description}</span>
                  </div>
                  <div
                    data-target="slips.odd"
                    className="col-2 px-1 text-left"
                    id={`slip_${bet.market.match(/\d/g).join("")}_${
                      bet.outcome
                    }_${bet.fixtureId}`}
                  >
                    {parseFloat(bet.odd).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </MarketsChannel>
        </BetslipChannel>
      ));
  };

  const deleteLineBet = (id) => {
    const path = `/clear_bet?id=${id}`;
    const values = {};
    Request.isDeleteRequest(path, values)
      .then((response) => {
        if (response.data.status == "OK") {
          loadCartGames();
        }
      })
      .catch((error) => {
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 5,
          }
        );
      });
  };

  const placeBet = (e) => {
    setIsLoading(true);
    window.localStorage.removeItem("stake");
    cogoToast.success("Bet placing will be implemented soon.", {
      hideAfter: 7,
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <>
      <div className="web-sidebar-widget" id="betSlip">
        <div className="widget-head">
          <h3 className="float-left">Betslip</h3>
          {games.length > 0 && (
            <div id="close-button">
              <a className="float-right" onClick={() => clearBetSlip()}>
                <i
                  className="far fa-times-circle fa-2x"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Clear BetSlip"
                ></i>
              </a>
            </div>
          )}
          <br />
        </div>
        {games.length > 0 && (
          <div className="widget-body" id="betslip">
            <div className="bets" id="bets-row" data-controller="slips">
              {slipGames()}
              <div className="total-bet">
                <span className="col-8 px-1">
                  <input
                    type="number"
                    name="stake"
                    id="stake-input"
                    style={{ color: "black" }}
                    placeholder="Min Stake: UGX 1,000"
                    className=""
                    value={stake}
                    id="stakeInput"
                    onChange={(event) => {
                      setStake(event.target.value);
                    }}
                  />
                </span>
                <span
                  className="col-4 px-1"
                  id="total-odds"
                  data-target="slips.total"
                >
                  {totalOdds()}
                </span>
              </div>
              <div className="">
                <span id="amount-limits" className="limits"></span>
              </div>
              <div className="total-wins">
                <span>Payout</span>
                <span id="total-wins" data-target="slips.wins">
                  {calculateWin()}
                </span>
              </div>
              {userSignedIn && (
                <div className="actions">
                  <Button
                    id="place_bet"
                    loading={isLoading}
                    onClick={(event) => {
                      placeBet(event.target);
                    }}
                    className="btn btn-block btn-primary mt-lg login-btn border-transparent"
                  >
                    PLACE BET
                  </Button>
                </div>
              )}
              {!userSignedIn && (
                <Login notice="Login before placing bet..">
                  <Button
                    id="slip_login"
                    loading={isLoading}
                    className="btn btn-block btn-primary mt-lg login-btn border-transparent"
                  >
                    PLACE BET
                  </Button>
                </Login>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BetSlip;
