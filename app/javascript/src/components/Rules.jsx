import React from "react";
import { useSelector } from "react-redux";

const Rules = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className={isMobile ? "game-box mobile-table-padding" : "game-box"}>
        <div className="card">
          <div className="card-header">
            <h3>Betting Rules</h3>
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
                  Rules
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="heads">
                  <ul>
                    <li>
                      <div>
                        <h6>Match Result</h6>
                        <p className="paragraph">
                          This is a type of market forecasting which team will
                          win at the end of a 90minutes game unless otherwise
                          stated. This includes any added injury or stoppage
                          time but does not include extra time, time allocated
                          for penalty shoot-out. <br />
                          The only exception to this rule is in relation to
                          Friendly matches, where all match markets will be
                          settled based on the actual result when the game
                          finishes (excluding any extra time), irrespective of
                          whether the full 90 minutes is played. <br />
                          1: Home win <br />
                          X: Draw <br />
                          2: Away win <br />
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h6>Double Chance</h6>
                        <p className="paragraph">
                          This is a type of market providing the opportunity of
                          making two different predictions for the match result
                          of a given fixture. The following options are
                          available: <br />
                          ➢ 1X - if the result is either a home win or draw then
                          bets on this option are winners. <br />
                          ➢ X2 - if the result is either a draw or a way win
                          then bets on this option are winners. <br />➢ 12 - if
                          the result is either a home wins or a way win then
                          bets on this option are winners. If a match is played
                          at a neutral venue the team listed first is deemed the
                          home team for betting purposes.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h6>Over/Under 2.5</h6>
                        <p className="paragraph">
                          Under 2.5 <br />
                          ➢ Bets win if there are 0, 1 or 2 goals scored in the
                          match. Bets lose if there are three or more goals
                          scored in the match. <br />
                          Over 2.5 <br />➢ Bets win if there are three or more
                          goals scored in the match. Bets lose if there are 0, 1
                          or 2 goals scored in the match.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h6>Half time</h6>
                        <p className="paragraph">
                          This type of market forecasting which team will win at
                          halftime. This includes any added injury or stoppage
                          time. All matches abandoned including those after
                          halftime will be void.
                        </p>
                        <h6>Half time / Full time</h6>
                        <p className="paragraph">
                          This is a type of market where a forecast is made on
                          which team will win the first half and the game.{" "}
                          <br />
                          Below are the possible 9 HTFT outcomes <br />
                          ➢ 1/1 - Home team to lead at both half time and
                          fulltime <br />
                          ➢ X/1 - Game to be Draw at half time and Home team
                          wins at fulltime <br />
                          ➢ 2/1 - Away team to lead at half time then Home team
                          wins at Fulltime <br />
                          ➢ 1/X - Home team to lead at half time then the match
                          ends in a draw at fulltime. <br />
                          ➢ X/X - The match ends in draw at half time and still
                          the game ends in a draw at fulltime <br />
                          ➢ 2/X - Away team to lead at half time then the match
                          ends in a draw at fulltime <br />
                          ➢ 1/2 - Home team to lead at half time and the away
                          team wins the game at fulltime <br />
                          ➢ X/2 - The match ends in a draw at half time then
                          away team wins at fulltime <br />
                          ➢ 2/2 - The away team leads at half time and goes
                          ahead to win the match at fulltime <br />
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h6>Correct Score</h6>
                        <p className="paragraph">
                          Predict the score at the end of normal time. Own goals
                          count. SkylineBet offers most possible score cast
                          however on request more score cast options can be
                          offered.
                        </p>
                        <br />
                        <h6>Odd/Even</h6>
                        <span className="paragraph">
                          <h6>Odd</h6>
                          <p className="paragraph">
                            ➢ Bets win if goals scored in a match add up to a
                            number thatendswith 1, 3, 5 ,7, or 9 such as 1, 3,
                            5, 7, 9, 11, 13, 17, 21, 25 and so forth.
                          </p>

                          <h6>Even</h6>
                          <p className="paragraph">
                            ➢ Bets win if goals scored in a match add up to a
                            number that ends with 0, 2, 4, 6,or 8 such as 2, 4,
                            6, 8, 10, 12, 16, 24 and forth. <br />
                            Any match resulting in 0 - 0 will be settled on an
                            even number of goals. In the event of an abandoned
                            match then bets for that match wills be void. <br />
                            SkylineBet customer and May in our absolute
                            discretion allow the option of cancelling the bet.
                          </p>
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h6>Incorrect Fixture</h6>
                        <p className="paragraph">
                          Where the wrong player or team is quoted within a
                          fixture name, all bets will be void.
                        </p>
                        <h6>Late Bets</h6>
                        <p className="paragraph">
                          (Bets placed erroneously accepted after kick-off) If
                          for any reason a pre-event bet is inadvertently
                          accepted after a match or event has commenced, bets
                          will be made void. <br />
                          ➢ All persons Under 18 years of age are not allowed to
                          place bets with Gaming International. <br />
                          ➢ It is the responsibility of the customer to ensure
                          details of their bets are correct. Once bets have been
                          placed and their acceptance confirmed they may not be
                          cancelled or changed by the customer. <br />➢ Any bet
                          placed where the outcome is already known, will be
                          made void.
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h6>Minimum Stake (BET)</h6>
                        <p className="paragraph">
                          The minimum stake on any single or multiple bet shall
                          be UGX 1,000
                        </p>

                        <h6>Maximum Stake (Bet)</h6>
                        <p className="paragraph">
                          The maximum stake on single ticket shall be UGX
                          1,000,000
                        </p>
                        <h6>Obvious Error - Maximum Winnings</h6>
                        <p className="paragraph">
                          The maximum amount which can be won for a bet placed
                          where there is an Obvious Error and a revised price is
                          equal to the Stake Amount. In such circumstances, the
                          ‘to win’ amount of the bet placed at the revised price
                          will equal that of the original bet with any excess
                          stake becoming void.
                        </p>
                        <h6>Ticket printing error/SMS Error</h6>
                        <p className="paragraph">
                          In case actual amount to be won is mis-printed on the
                          customer ticket, Odds will be re-calculated to
                          establish the actual ‘to win’ amount, it shall not
                          exceed UGX 50,000 (maximum winnings).
                        </p>
                      </div>
                    </li>
                    <li>
                      <div>
                        <h6>Winning Tickets</h6>
                        <p className="paragraph">
                          You can only play one Fixture code per Betting Option
                          on a multiple ticket <br />
                          i.e. <br /> Correct Ticket: BET 253 MR1, 256 DC12,635
                          HTX <br />
                          Wrong Ticket: BET 253 MR1, 253 MR2, 105 DC1X, 105 DC12{" "}
                          <br />
                          In case there system Error we shall settle the first
                          placed game codes subtract the repeated game codes
                          with bet options
                        </p>
                        <h6>Winning Tickets</h6>
                        <p className="paragraph">
                          You can place only one Match Code per a single ticket.
                          e.g. BET 253 MR1
                        </p>
                        <h6>Winning Tickets</h6>
                        <p className="paragraph">
                          A customer has up to 1yr to claim their winnings.
                          His/her ticket will be invalid after this period and
                          thus SkylineBet will not be liable to paying any such
                          customer for his/her winnings.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rules;
