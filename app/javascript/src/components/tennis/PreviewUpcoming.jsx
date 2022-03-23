import "channels";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import MarketsChannel from "../../../channels/marketsChannel";
import PreOddsChannel from "../../../channels/preOddsChannel";
import addBet from "../../redux/actions";
import * as DataUpdate from "../../utilities/DataUpdate";
import format from "../../utilities/format";
import oddsFormatter from "../../utilities/oddsFormatter";
import Requests from "../../utilities/Requests";
import Preview from "../shared/Skeleton";

const PreviewUpcoming = (props) => {
  const [fixture, setFixture] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const dispatcher = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const [_, setGreeting] = useState("");

  useEffect(() => {
    getfixture();
  }, [props]);

  function getfixture() {
    var path = `/api/v1/fixtures/tennis/pre_fixture${props.location.search}`;
    var values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        setFixture(response.data);
        setPageLoading(false);
      })
      .catch((error) => {
        setPageLoading(true);
        cogoToast.error(error.message, {
          hideAfter: 5,
        });
      });
  }

  const updateMatchInfo = (data, currentState, setState, market, channel) => {
    let updatedData = DataUpdate.fixtureUpdate(
      data,
      currentState,
      market,
      channel
    );
    setState(updatedData);

    // Forcing Re-render //to be reviewed
    setGreeting(Math.random());
  };

  return (
    <>
      {!pageLoading && (
        <>
          <div className={isMobile ? "fixture-box" : "game-box"}>
            <div className="card" id="show-markets">
              <div className="card-header">
                <h6>
                  {fixture.part_one_name} <BsDash /> {fixture.part_two_name}{" "}
                  {fixture.league_name} {fixture.location}
                </h6>
              </div>
              <div className={isMobile ? "fix-body" : "card-body"}>
                {/* first loop */}
                <div className="row">
                  <div className={isMobile ? "col-sm-12" : "col-lg-12"}>
                    {
                      /* Iteration to start here */

                      fixture.markets
                        .filter((el) => el.name !== null)
                        .map((market, index) => (
                          <React.Fragment key={index}>
                            <MarketsChannel
                              channel="MarketsChannel"
                              fixture={fixture.id}
                              market={market.market_identifier}
                              received={(data) => {
                                updateMatchInfo(
                                  data,
                                  fixture,
                                  setFixture,
                                  _,
                                  "Market"
                                );
                              }}
                            >
                              <div
                                className={
                                  isMobile
                                    ? "market-label market-label-fixture"
                                    : "market-label"
                                }
                              >
                                <div className="row">
                                  <div className="col-lg-12 ">
                                    <strong>{market.name} {market.specifier !== null? <><BsDash /> {market.specifier}</> :""}</strong>
                                  </div>
                                </div>
                              </div>
                            </MarketsChannel>
                            <div className="market-odds">
                              <PreOddsChannel
                                channel="PreOddsChannel"
                                fixture={fixture.id}
                                market={market.market_identifier}
                                received={(data) => {
                                  updateMatchInfo(
                                    data,
                                    fixture,
                                    setFixture,
                                    market.market_identifier,
                                    "Pre"
                                  );
                                }}
                              >
                                <div className="d-flex justify-content-around">
                                  {Object.keys(format(market.odds)).map(
                                    (element, index) => (
                                      <React.Fragment key={index}>
                                        <div
                                          className={`pl-2 pr-2 col-lg-${
                                            Object.keys(market.odds).length %
                                              2 ==
                                            0
                                              ? 6
                                              : 4
                                          } col-sm-${
                                            Object.keys(market.odds).length %
                                              2 ==
                                            0
                                              ? 6
                                              : 4
                                          }`}
                                        >
                                          <a
                                            className={
                                              market.odds === undefined ||
                                              oddsFormatter(
                                                market.odds[element]
                                              ) == parseFloat(1.0).toFixed(2) ||
                                              market.status != "Active"
                                                ? "btn btn-light wagger-btn intialise_input disabled"
                                                : "btn btn-light wagger-btn intialise_input"
                                            }
                                            onClick={() =>
                                              addBet(
                                                dispatcher,
                                                element.replace("outcome_", ""),
                                                "PreMarket",
                                                fixture.id,
                                                element.replace(
                                                  "outcome_",
                                                  market.name + " - "
                                                ) + `${market.specifier !== null? ` ${market.specifier}` : ""}`,
                                                market.market_identifier,
                                                market.specifier
                                              )
                                            }
                                          >
                                            <span>
                                              {element.replace("outcome_", "")}
                                            </span>
                                            <span className="wagger-amt">
                                              {oddsFormatter(
                                                market.odds[element]
                                              )}
                                            </span>
                                          </a>
                                        </div>
                                      </React.Fragment>
                                    )
                                  )}
                                </div>
                              </PreOddsChannel>
                            </div>
                          </React.Fragment>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {pageLoading && <Preview />}
    </>
  );
};

export default withRouter(PreviewUpcoming);
