import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import currencyFormatter from "../utilities/CurrencyFormatter";

const BetReceipt = (props) => {
  const [show, setShow] = useState(false);

  useEffect(() => console.log(props.data), [props]);

  const close = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Bet Slip Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="registration">
            <div className="content-center cl-grey">
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 mobile-signup">
                  <div className="game-box">
                    <div className="card ticket-slip">
                      <div className="card-header">
                        <h3>
                          BetSlip #{props.data.id}{" "}
                          <span>
                            <u>{props.data.result}</u>
                          </span>
                        </h3>
                      </div>
                      <div className="card-body ticket-body">
                        <div className="widget-body" id="">
                          {/* <% @bets = @bet_slip.bets %>
                      <% @bets.each do |bet| %>
                        <% fixture = Fixture.find(bet.fixture_id)%>
                        <% line_bet = LineBet.where(fixture_id: bet.fixture_id) %>
                        <fieldset>
                          <div>
                            <div>
                              <span><strong>Fixture:</strong></span>
                              <span className="float-right"> <%= fixture.part_one_name %> - <%= fixture.part_two_name %></span>
                            </div>
                            <div>
                              <span><strong>Odds:</strong></span>
                              <span className="float-right"><%= bet.odds %></span>
                            </div>
                            <div>
                              <span><strong>Tournament:</strong></span>
                              <span className="float-right"><%= fixture.league_name %></span>
                            </div>
                            <div>
                              <span><strong>Outcome:</strong></span>
                              <span className="float-right"><%= bet.outcome_desc %></span>
                            </div>
                            <div>
                              <span><strong>Start Time:</strong></span>
                              <span className="float-right"><%= local_time(fixture.start_date, format: "%d/%m/%Y %l:%M%P") %></span>
                            </div>
                            <div>
                              <span><strong>Status:</strong></span>
                              <span className="float-right"><%= bet.status %></span>
                            </div>
                            <div>
                              <span><strong>Result:</strong></span>
                              <span className="float-right"><%= bet.result %></span>
                            </div>
                          </div>
                          <hr>
                        </fieldset>
                      <% end %> */}
                          <div className="single-bet">
                            <span id="odd4">
                              <span>Total Odds</span>
                              <span> </span>
                            </span>
                            <span id="odd4">{props.data.odds}</span>
                          </div>
                          <div className="total-bet">
                            <span>Ticket Stake</span>
                            <span id="total-odds">
                              {currencyFormatter(props.data.stake)}
                            </span>
                          </div>
                          <div className="total-wins">
                            <span>Possible Win Amount</span>
                            <span id="total-wins">
                              {currencyFormatter(
                                props.data.potential_win_amount
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {React.cloneElement(props.children, {
        onClick: () => setShow(!show),
      })}
    </>
  );
};

export default BetReceipt;
