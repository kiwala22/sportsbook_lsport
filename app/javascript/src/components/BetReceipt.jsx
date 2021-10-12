import { Modal } from "antd";
import React, { useState } from "react";
import { BsDash } from "react-icons/bs";
import Moment from "react-moment";
import shortUUID from "short-uuid";
import currencyFormatter from "../utilities/CurrencyFormatter";

const BetReceipt = (props) => {
  const [show, setShow] = useState(false);

  const close = () => {
    setShow(false);
  };

  return (
    <>
      <Modal
        title={
          <>
            BetSlip #{props.data.id} <BsDash />{" "}
            {props.data.result || "Result Pending"}
          </>
        }
        visible={show}
        onCancel={close}
        footer={null}
        backdrop="static"
        keyboard={false}
        scrollable={true}
        // closeIcon={<CloseOutlined />}
        confirmLoading={true}
        maskClosable={false}
        width={350}
      >
        {props.data.bets.map((bet) => (
          <fieldset key={shortUUID.generate()}>
            <div>
              <div>
                <span>
                  <strong>Fixture:</strong>
                </span>
                <span className="float-right">
                  {bet.fixture.part_one_name} - {" "}
                  {bet.fixture.part_two_name}
                </span>
              </div>
              <div>
                <span>
                  <strong>Odds:</strong>
                </span>
                <span className="float-right">{bet.odds}</span>
              </div>
              <div>
                <span>
                  <strong>Tournament:</strong>
                </span>
                <span className="float-right">{bet.fixture.league_name}</span>
              </div>
              <div>
                <span>
                  <strong>Outcome:</strong>
                </span>
                <span className="float-right">{bet.outcome_desc}</span>
              </div>
              <div>
                <span>
                  <strong>Start Time:</strong>
                </span>
                <span className="float-right">
                  <Moment local={true} format="DD/MMM HH:mm a">
                    {bet.fixture.start_date}
                  </Moment>
                </span>
              </div>
              <div>
                <span>
                  <strong>Status:</strong>
                </span>
                <span className="float-right">{bet.status}</span>
              </div>
              <div>
                <span>
                  <strong>Result:</strong>
                </span>
                <span className="float-right">
                  {bet.result || "Not Available"}
                </span>
              </div>
            </div>
            <hr />
          </fieldset>
        ))}
        <div className="single-bet">
          <span id="odd4">
            <span>Total Odds</span>
            <span> </span>
          </span>
          <span id="odd4">{props.data.odds}</span>
        </div>
        <div className="total-bet">
          <span>Ticket Stake</span>
          <span id="total-odds">{currencyFormatter(props.data.stake)}</span>
        </div>
        <div className="total-wins">
          <span>Possible Win Amount</span>
          <span id="total-wins">
            {currencyFormatter(props.data.potential_win_amount)}
          </span>
        </div>
      </Modal>
      {React.cloneElement(props.children, {
        onClick: () => setShow(!show),
      })}
    </>
  );
};

export default BetReceipt;
