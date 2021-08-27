import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import shortUUID from "short-uuid";
import BetslipChannel from "../../channels/betSlipsChannel";
import MarketsChannel from "../../channels/marketsChannel";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Request from "../utilities/Requests";
import UserLogin from "../utilities/UserLogin";
import Login from "./Login";

const BetSlip = (props) => {
  const [games, setGames] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [win, setWin] = useState("UGX 0");
  const intialStake = localStorage.getItem("stake") || "";
  const [stake, setStake] = useState(intialStake);
  const refreshTime = 30000;
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    loadCartGames();
    calculateWin();
  }, []);

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  useEffect(() => {
    calculateWin();
  }, [games]);

  useEffect(() => {
    calculateWin();
  }, [stake]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     loadCartGames();
  //   }, refreshTime);

  //   return () => clearInterval(interval);
  // }, []);

  const checkUserLoginStatus = () => {
    UserLogin.currentUserLogin()
      .then((data) => {
        if (data.message == "Authorized") {
          setUserSignedIn(true);
          setUserInfo(data.user);
        }
      })
      .catch((error) =>
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 5,
          }
        )
      );
  };

  const loadCartGames = () => {
    let path = "/cart_fixtures";
    let values = {};
    Request.isGetRequest(path, values)
      .then((response) => {
        let data = response.data;
        if (data instanceof Array) {
          setGames(data);
          let visible = data.length > 0 ? true : false;
          setIsVisible(visible);
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

  const totalOdds = () => {
    let odds = games.map((bet) => parseFloat(bet.odd));
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
    setWin(currencyFormatter(newAmount));
  };

  const clearBetSlip = () => {
    window.localStorage.removeItem("stake");
    let url = "clear_slip";
    let values = {};
    Request.isDeleteRequest(url, values)
      .then((response) => {
        if (response.data.status == "OK") {
          loadCartGames();
          cogoToast.success("Your Betslip is now empty.", {
            hideAfter: 7,
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

  const slipGames = () => {
    return games.map((bet) => (
      <BetslipChannel
        key={shortUUID.generate()}
        channel="BetslipChannel"
        fixture={bet.fixtureId}
        market={bet.market.match(/\d/g).join("")}
        received={(data) => {
          loadCartGames();
        }}
      >
        <MarketsChannel
          channel="MarketsChannel"
          fixture={bet.fixtureId}
          received={(data) => {
            loadCartGames();
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
                  {bet.odd}
                </div>
              </div>
            </div>
          </div>
        </MarketsChannel>
      </BetslipChannel>
    ));
  };

  const deleteLineBet = (id) => {
    const url = `clear_bet?id=${id}`;
    const values = {};
    Request.isDeleteRequest(url, values)
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
    window.localStorage.removeItem("stake");
    cogoToast.success("Bet placing will be implemented soon.", {
      hideAfter: 7,
    });
  };
  return (
    <>
      <div className="web-sidebar-widget" id="betSlip">
        <div className="widget-head">
          <h3 className="float-left">Betslip</h3>
          {isVisible && (
            <div
              id="close-button"
              // data-controller="main"
              // data-main-interval="1000"
            >
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
        {isVisible && (
          <div className="widget-body" id="betslip">
            <div className="bets" id="bets-row" data-controller="slips">
              {slipGames()}
              <div className="total-bet">
                <span className="col-8 px-1">
                  <input
                    type="number"
                    name="stake"
                    id="stake-input"
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
                  {win}
                </span>
              </div>
              {userSignedIn && (
                <div className="actions">
                  {/* <a
                  onClick={(event) => {
                    placeBet(event.target);
                  }}
                  className="btn btn-block btn-primary mt-lg login-btn"
                  id="place_bet"
                  data-disable-with="<i class='fas fa-spinner fa-spin'></i> Placing Bet..."
                >
                  PLACE BET
                </a> */}
                  <Button
                    id="place_bet"
                    onClick={(event) => {
                      placeBet(event.target);
                    }}
                    className="btn btn-block btn-primary mt-lg login-btn border-transparent"
                    data-disable-with="<i class='fas fa-spinner fa-spin'></i> Placing Bet..."
                  >
                    PLACE BET
                  </Button>
                </div>
              )}
              {!userSignedIn && (
                <Login notice="Login before placing bet..">
                  <Button
                    id="slip_login"
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
