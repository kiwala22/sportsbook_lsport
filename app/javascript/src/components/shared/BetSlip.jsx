import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BsDash, BsPlus } from "react-icons/bs";
import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortUUID from "short-uuid";
import BetSlipsChannel from "../../../channels/betSlipsChannel";
import currencyFormatter from "../../utilities/CurrencyFormatter";
import Requests from "../../utilities/Requests";
import NoEvents from "./EmptySlip";
import Login from "./Login";

const BetSlip = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [win, setWin] = useState("UGX 0");
  const intialStake = localStorage.getItem("stake") || "";
  const [stake, setStake] = useState(intialStake);
  const userSignedIn = useSelector((state) => state.signedIn);
  const games = useSelector((state) => state.games);
  const show = useSelector((state) => state.showBetSlip);
  const isMobile = useSelector((state) => state.isMobile);
  const multiplier = useSelector((state) => state.multiplier);
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

  useEffect(() => {
    checkBetSlipBonus();
  }, []);

  useEffect(() => {
    checkBetSlipBonus();
  }, [games]);

  const loadCartGames = () => {
    let path = "/cart_fixtures";
    let values = {};
    Requests.isGetRequest(path, values)
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

  const checkBetSlipBonus = () => {
    let path = "/check_bonus";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        let multiplier = response.data;
        dispatcher({ type: "multiplier", payload: parseFloat(multiplier) });
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
      .filter((bet) => bet.status === "Active")
      .map((el) => parseFloat(el.odd));
    return odds.reduce((a, b) => a * b, 1).toFixed(2);
  };

  const calculateWin = () => {
    let newAmount = 0.0;
    let odds = totalOdds();
    if (
      stake !== null &&
      parseFloat(stake) >= 1000 &&
      parseFloat(stake) <= 50000
    ) {
      newAmount = parseFloat(stake) * odds;
      localStorage.setItem("stake", stake);
    }
    return newAmount;
  };

  const taxCalculation = (amount) => {
    let deduction = parseFloat(amount) * 0.15;
    let payout = parseFloat(amount) - deduction;
    return {
      deduction,
      payout,
    };
  };

  const clearBetSlip = () => {
    localStorage.removeItem("stake");
    let path = "/clear_slip";
    let values = {};
    Requests.isDeleteRequest(path, values)
      .then((response) => {
        if (response.data.status == "OK") {
          dispatcher({ type: "addBet", payload: [] });
          dispatcher({ type: "betSelected", payload: [] });
          cogoToast.success("Your Betslip is now empty.", {
            hideAfter: 5,
          });
          if (isMobile) {
            close();
          }
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
      let fixtureIndex = games.findIndex(
        (el) => data.fixture_id == el.fixtureId
      );
      let gameOutcome = games[fixtureIndex].outcome;
      games[fixtureIndex] = {
        ...games[fixtureIndex],
        ...{
          status: data.status,
          odd: data.odds[`outcome_${gameOutcome}`],
        },
      };

      dispatcher({ type: "addBet", payload: games });
    }
  }

  const slipGames = () => {
    return games.map((bet) => (
      <BetSlipsChannel
        key={shortUUID.generate()}
        channel="BetslipChannel"
        fixture={bet.fixtureId}
        market={bet.marketIdentifier}
        received={(data) => {
          updateSlipGames(data, games);
        }}
      >
        <div
          className={
            bet.status === "Active" ? "row lineBet" : "row lineBet hide-row"
          }
        >
          <div className="col-12 px-2">
            <div className="single-bet">
              <div className="col-1 px-1">
                <a onClick={() => deleteLineBet(bet.id, bet.fixtureId)}>
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
              <div data-target="slips.odd" className="col-2 px-1 text-left">
                {parseFloat(bet.odd).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </BetSlipsChannel>
    ));
  };

  const deleteLineBet = (id, fixtureId) => {
    const path = `/clear_bet?id=${id}`;
    const values = {};
    Requests.isDeleteRequest(path, values)
      .then((response) => {
        if (response.data.status == "OK") {
          loadCartGames();
          setTimeout(
            () => dispatcher({ type: "removeSelected", payload: fixtureId }),
            500
          );
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

  const placeBet = () => {
    setIsLoading(true);
    var cartId = games[0].cartId;
    const path = "/bet_slips";
    const values = { bet_slip: { cart_id: cartId, stake: stake } };
    localStorage.removeItem("stake");
    Requests.isPostRequest(path, values)
      .then((response) => {
        dispatcher({ type: "addBet", payload: [] });
        dispatcher({ type: "userUpdate", payload: response.data.user });
        dispatcher({ type: "betSelected", payload: [] });
        cogoToast.success(response.data.message, {
          hideAfter: 5,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 5,
          }
        );
        setIsLoading(false);
      });
  };

  function close() {
    dispatcher({ type: "mobileBetSlip", payload: false });
  }

  const betSlipData = (
    <div className="bets" id="bets-row" data-controller="slips">
      {slipGames()}
      <div className="total-bet">
        <span className="col-8 px-1">
          <input
            type="number"
            name="stake"
            id="stake-input"
            placeholder="Min Stake: UGX 1,000"
            className="input-color"
            value={stake}
            onChange={(event) => {
              setStake(event.target.value);
            }}
          />
        </span>
        <span className="col-4 px-1" id="total-odds" data-target="slips.total">
          {totalOdds()}
        </span>
      </div>
      <div className="">
        <span id="amount-limits" className="limits"></span>
      </div>
      <div className="total-wins">
        <span>Winnings</span>
        <span id="total-wins" data-target="slips.wins">
          {currencyFormatter(calculateWin())}
        </span>
      </div>
      {multiplier > 0 && (
        <div className="total-wins">
          <span>Bonus</span>
          <span id="total-wins" data-target="slips.wins">
            <PlusOutlined />
            {currencyFormatter(calculateWin() * multiplier)}
          </span>
        </div>
      )}
      <div className="total-wins">
        <span>
          <BsDash />
          Tax (15%)
        </span>
        <span id="total-wins" data-target="slips.wins">
          <BsDash />
          {currencyFormatter(
            multiplier > 0
              ? taxCalculation(calculateWin() + calculateWin() * multiplier)
                  .deduction
              : taxCalculation(calculateWin()).deduction
          )}
        </span>
      </div>
      <div className="total-wins">
        <span>
          <BsPlus />
          Tax Bonus (15%)
        </span>
        <span id="total-wins" data-target="slips.wins">
          <BsPlus />
          {currencyFormatter(
            multiplier > 0
              ? taxCalculation(calculateWin() + calculateWin() * multiplier)
                  .deduction
              : taxCalculation(calculateWin()).deduction
          )}
        </span>
      </div>
      <div className="total-wins">
        <span>Payout</span>
        <span id="total-wins" data-target="slips.wins">
          {currencyFormatter(
            multiplier > 0
              ? calculateWin() + calculateWin() * multiplier
              : calculateWin()
          )}
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
  );

  return (
    <>
      {!isMobile && (
        <>
          <>
            <div className="web-sidebar-widget" id="betSlip">
              <div className="widget-head">
                <h3 className="float-left">Betslip</h3>
                {games.length > 0 && (
                  <div id="close-button">
                    <a className="float-right" onClick={() => clearBetSlip()}>
                      <i
                        className="far fa-times-circle fa-2x betslip-close-button"
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
                  {betSlipData}
                </div>
              )}
            </div>
          </>
        </>
      )}
      {isMobile && (
        <Modal
          title={
            <>
              <h5>BETSLIP</h5>
            </>
          }
          visible={show}
          onCancel={close}
          footer={null}
          backdrop="static"
          keyboard={false}
          scrollable={true}
          confirmLoading={true}
          maskClosable={false}
        >
          {games.length > 0 && (
            <>
              <div id="close-button" className="clear-slip">
                <a className="float-right" onClick={() => clearBetSlip()}>
                  <i
                    className="far fa-times-circle fa-2x"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Clear BetSlip"
                  ></i>
                </a>
              </div>
              {betSlipData}
            </>
          )}
          {/* {games.length == 0 && <p className="MobileEmpty">Empty BetSlip...</p>} */}
          {games.length == 0 && NoEvents()}
        </Modal>
      )}
    </>
  );
};

export default BetSlip;
