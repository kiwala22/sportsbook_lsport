import React from "react";
import { useSelector } from "react-redux";

const Terms = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className={isMobile ? "game-box mobile-table-padding" : "game-box"}>
        <div className="card">
          <div className="card-header">
            <h3>Terms and Conditons</h3>
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
                  T & Cs{" "}
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
                <ul>
                  <li>
                    <div className="heads">
                      <h6>ABOUT US</h6>
                      <p className="paragraph">
                        SkylineBet is a company incorporated in the Republic of
                        Uganda and licensed by the National Lotteries Board of
                        Uganda (Sports betting and On-line casino license of the
                        gaming and pool betting-control and taxation
                        regulations. We support responsible gaming. <br />{" "}
                        SkylineBet is one of the leading online betting
                        providers on Uganda market offering sports betting and
                        gaming services. We offer our clients highest odds on
                        the market, easy registration process, 24hrs of customer
                        support and variety of betting types. <br /> The company
                        provides a range of betting opportunities for various
                        competition and leagues, online casino, virtual games
                        and live in-play.
                      </p>

                      <h6>GENERAL BETTING TERMS</h6>
                      <p className="paragraph">
                        1. BET: Is a risk driven agreement for potential
                        winnings entered between the customer and the bookmaker
                        under the established rules where the fulfillment of
                        such agreement is conditioned by an event whose outcome
                        is yet to be determined. Bets are accepted on the
                        conditions offered by the bookmaker. <br />
                        2. OUTCOME: Is the result of an event (events) on which
                        the bets was placed.
                        <br />
                        3. BETTOR: Is an individual placing a bet with the
                        bookmaker on an outcome.
                        <br />
                        4. SPORTS: Is a combination of events, possible outcome
                        of these events, odds of possible outcome of these
                        events, their closing date and time when the company
                        quits to take bets on the outcomes of these events.
                        <br />
                        5. BET CANCELLATION: Is an outcome on which the bet is
                        not settled and the winnings are not paid. As per the
                        rules, in the event of bet cancellation an agreement
                        between the bookmaker and the customer shall be deemed
                        unconcluded and the stake shall be refunded.
                        <br />
                        6. REGULAR TIME: Is the duration of the match subject to
                        the regulation of the relevant sport, including time
                        added by the referee, Regular time does not include
                        extra time, overtime(s) , penalty shootouts etc.
                        <br />
                      </p>

                      <h6>GENERAL TERMS</h6>
                      <span>
                        1. The company accepts bets on sports and other events.
                        <br />
                        <br />
                        2. Bets are accepted from individuals over 25 years old,
                        who agree with the rules proposed by the company. In
                        case of violation of these regulations, the company
                        reserves the right to refuse the payment of any winnings
                        and already invested stakes as well as to cancel any
                        bets,In line with section 1 of the lotteries and gaming
                        act 2016 and regulations 57,58 and 59 of the lotteries
                        and gaming (licencing regulations) 6 and 7 of 2017,
                        minors ( persons below 25 years ) are not allowed to
                        access gaming and betting facilities.
                        <br />
                        <br />
                        3. A client is allowed to have only one account
                        (registration shall only be possible per person, family,
                        household, computer, IP address, credit/debit card,
                        e-wallet or electronic payment method. Persons otherwise
                        associated with a customer will not be allowed to
                        register on the website). Otherwise the Security
                        Department reserves the right to block these accounts
                        for a given period of time. All winning bets will be
                        recalculated.
                        <br />
                        <br />
                        4. Condition of bets accepting (odds, handicaps, totals,
                        limits on maximum stake and etc.) can be changed after
                        any bet, and the condition of the bets, which had been
                        accepted before, remain unchanged. Before betting a
                        client should find out all changes in the current Sports
                        line.
                        <br />
                        <br />
                        5. The company reserves the right to decline a bet
                        without giving a reason.
                        <br />
                        <br />
                        6. In the event of suspicions in the unsportsmanlike
                        format of matches the company reserves the right to
                        block bets on sport event before final conclusion of an
                        international organization and declare bets as invalid
                        if the fact of an unsportsmanlike game is determined.
                        Payment of these bets is made with odds "1". The
                        administration is not obliged to present evidence and
                        conclusions to the customers.
                        <br />
                        <br />
                        7. In the event of obviously erroneous odds, such bet
                        shall be settled based on the final result at the
                        effective odds applicable to the certain market.
                        <br />
                        <br />
                        8. If bets are settled incorrectly (e.g. the results
                        were entered by mistake), such bets shall be
                        recalculated. However, bets placed in the period between
                        the erroneous settlement and recalculation shall be
                        deemed valid. In the event the bettor’s account proves
                        to be negative after such recalculation, no bets may be
                        placed until the bettor has made a sufficient deposit.
                        <br />
                        <br />
                        9. Bets placed on events, the outcome of which was known
                        at the time of placement, shall be settled at odds of 1.
                        <br />
                        <br />
                        10. The “Simultaneous finish” rule is the outcome in
                        which there is more than one winner of the event,
                        tournament, championship etc. Should two winners be
                        announced then stake amount is divided into 2 while
                        calculating bets. Should three or more winners be
                        announced then bets will be settled with odds equal to
                        “1”. This rule does not apply to the markets “To be
                        higher”.
                        <br />
                        <br />
                        11. Bets which are accepted from a specified date are
                        subject to the Rules changed.
                        <br />
                        <br />
                        12. A client is responsible for the privacy of his/her
                        password and the number of his/her gaming account
                        received at the registration. All bets registered at the
                        bookmakers company are valid. Bets cancellation is
                        possible only in accordance with the present Rules.
                        <br />
                        <br />
                        13. If an Internet connection failed while accepting a
                        bet confirmation by a client, it does not constitute
                        grounds for a cancellation of this bet.
                        <br />
                        <br />
                        14. Any bet is a confirmation of the fact that a client
                        agrees to the present Rules and accepts them.
                        <br />
                        <br />
                        15. The event results declared by the bookmakers company
                        are the only grounds for calculations of bets and
                        winnings. All claims to event results, date and actual
                        time of an event beginning are considered together with
                        the package of official protocols of corresponding
                        sports federations.
                        <br />
                        <br />
                        16. After receiving returns, the bettor shall check if
                        the winnings are correct. Should the bettor disagree
                        with the winnings, they shall give notice to the
                        bookmaker thereof with their account number, date, time,
                        event, stake, selection, odds, and reasons of
                        disagreement being stated. Any claims regarding winnings
                        may be filed within 10 (ten) days. All bet calculation
                        claims for Cyber-Live games are accepted within 72 hours
                        from the moment of game ending.
                        <br />
                        <br />
                        17. Should the bettor commit fraud in respect to the
                        bookmaker (such as the registration of multiple
                        accounts, the use of automated betting software,
                        arbitrage betting, if the betting account is not used
                        for betting, the improper use of loyalty schemes, etc.),
                        the bookmaker reserves the right to stop such fraudulent
                        actions by:
                        <br />
                        <ul className="lists">
                          <li>• Bet cancellation.</li>
                          <li>
                            • Closure of the customer’s account. Money that has
                            been deposited into the account will be refunded.
                          </li>
                          <li>• Filing a claim to a law-enforcement agency.</li>
                        </ul>
                        <br />
                        <p className="paragraph">
                          18. The bookmaker reserves the right to close a
                          betting account immediately and void any bets placed
                          thereon should the bookmaker establish that:
                        </p>
                        <br />
                        <ul className="lists">
                          <li>
                            • When the bettor placed the bet, they had
                            information on the result of the corresponding
                            event.
                          </li>
                          <li>
                            • The bettor was able to influence the outcome due
                            to their participation in the match (sportspeople,
                            coaches, referees, etc.) or because they acted on
                            behalf of participants.
                          </li>
                          <li>
                            • Bets were placed by a group of bettors acting in
                            concert (as a syndicate) in order to exceed the
                            limits set by the bookmaker.
                          </li>
                          <li>
                            • One bettor has a few betting accounts (multiple
                            registration).
                          </li>
                          <li>
                            • The bettor is suspected of using special software
                            or hardware facilitating automated betting.
                          </li>
                          <li>
                            • Unfair means were used to obtain information or
                            circumvent restrictions imposed by the bookmaker.
                          </li>
                        </ul>
                      </span>
                      <br />
                      <p className="paragraph">
                        In the aforementioned circumstances balances on
                        customers’ accounts shall be refunded after an
                        investigation has been concluded. The balance shall be
                        calculated excluding any unfair profits generated. The
                        bookmaker reserves the right not to reimburse the bettor
                        for any service charges imposed by payment systems while
                        depositing and/or withdrawing monies from the SkylineBet
                        account.
                        <br />
                        <br />
                        19. Should the bookmaker’s Security Service have any
                        concerns about the bettor’s identity or their personal
                        details (address, credit or debit card, other data),
                        they are entitled to request any documents from the
                        bettor substantiating their identity or other submitted
                        data at the bookmaker’s absolute discretion, as well as
                        to cancel any payments until all such details are
                        verified. Verification may take up to 72 hours from the
                        receipt of documents. If it is proven that the submitted
                        data is false, the bookmaker is entitled to cancel all
                        bets and suspend all transactions for an indefinite
                        period of time and proceed with full verification of the
                        account. The bookmaker reserves the right to request any
                        documents required for such verification. 
                        <br />
                        <br />
                        20. The bookmaker’s company is not responsible and
                        doesn't accept any claims concerning correctness of
                        translation from foreign languages of team names, player
                        surnames, places where competitions take place. The
                        information given in a tournament headline has an
                        auxiliary character. Possible mistakes in such
                        information do not constitute grounds for bets refund.
                        <br />
                        <br />
                        21. The Company reserves the right to add or update
                        these rules at any time. In such circumstances the
                        posting of the new rules on the website will be deemed
                        to be the time they become effective and they will take
                        immediate effect. Any bets placed after that time will
                        be subject to the updated rules.
                        <br />
                        <br />
                        22. A user confirms/agrees that all activities on his
                        account are performed by himself. If it’s made by third
                        parties, the user is responsible for the security of his
                        account.
                        <br />
                        <br />
                        23. SkylineBet does not bear any responsibility for any
                        losses or damages claimed as resulting from the use of
                        this site or from its content. This provision equally
                        applies to the use or misuse of the content of the site
                        by any person, inability to access the site or use it,
                        to delay in functioning or transmission of data,
                        failures in communication lines, any errors in the
                        content of the site.
                        <br />
                        <br />
                      </p>
                      <h6>GENERAL BETTING RULES</h6>
                      <br />
                      <p className="paragraph">
                        1. The betting company accepts bets given in a current
                        Sports line – it is a list of events with corresponding
                        winning odds.
                        <br />
                        <br />
                        2. The minimum stake on any single event is 1000 UGX.
                        <br />
                        <br />
                        3. A maximum stake is determined for each event by the
                        betting company and depends on sports and an event.
                        <br />
                        <br />
                        4. The maximum winning for one bet is 50 000 000 UGX.
                        <br />
                        <br />
                        5. The betting company reserves the right to limit a
                        maximum stake on special events as well as to limit or
                        increase a maximum odds of a certain client without any
                        notification and giving reasons.
                        <br />
                        <br />
                        6. Acceptance of accumulator bets on one outcome or a
                        combination of outcomes from one player can be limited
                        by a decision of the betting company.
                        <br />
                        <br />
                        7. A bet is accepted as soon as it is confirmed by the
                        company. All accepted bets are displayed in the “Bet
                        History”. In some cases there may be a delay until a bet
                        is listed in your history. In case of any dispute the
                        time when the bet was registered in the system of the
                        company is considered to be its true submission time. If
                        the User did not receive any notification about the
                        acceptance of the bet, the rate is still considered to
                        be accepted if it is displayed in the “Bet History
                        <br />
                        <br />
                        8. Bets are accepted before an official event beginning;
                        event date, time and corresponding comments, given in
                        the line, are approximate. Any bet placed after an event
                        has started, will be cancelled, except for Live-bets,
                        i.e. bets placed in the course of a match. Such bets are
                        considered to be valid till the end of a match.
                        <br />
                        <br />
                        9. Bet made by bettor on a particular event outcome is
                        considered to be won if all outcomes of such bet
                        correctly predicted.
                        <br />
                        <br />
                        10. Bets placed after an event had begun are calculated
                        with the odds equal to “1"; the winning odds on them in
                        accumulator bets is equal to “1”.
                        <br />
                        <br />
                        11. If a bet is recognized as invalid, a return is made.
                        If a bet on one or several events included in
                        accumulator bets is cancelled, winning calculations will
                        be made.
                        <br />
                        <br />
                        12. If winnings are calculated incorrectly (e.g. event
                        results were entered by mistake), such winnings will be
                        recalculated.
                        <br />
                        <br />
                        13. All sports events are considered to be postponed and
                        cancelled only under data of organizing official
                        documents, official sites of sports federations, sites
                        of sports clubs and other sources of sports information,
                        and on the grounds of these data the events given in the
                        line are changed.
                        <br />
                        <br />
                        14. A bet is to be cancelled in case a client
                        deliberately misinformed the stuff of the bookmakers
                        company by means of representing false information and
                        claims in respect of bets, winning payout, event results
                        and other information and claims of similar nature. In
                        line with section 1 of the lotteries and gaming act 2016
                        and regulations 57,58 and 59 of the lotteries and gaming
                        (licensing regulations) si 6 and 7 of 2017, minors (
                        persons below 25 years ) are not allowed to access
                        gaming.
                        <br />
                        <br />
                        15. Winning bet slips are valid within 30 (thirty)
                        calendar days from event's official date as indicated in
                        bet slip.
                        <br />
                        <br />
                        16. Sports and Live bets cannot be changed or deleted.
                        <br />
                        <br />
                        17. No responsibility is assumed by the company for any
                        incorrectness of current event results on which
                        Live-bets are accepted. Please use various independent
                        sources of information.
                        <br />
                        <br />
                        18. A bet is to be cancelled in case a bet was made on
                        known outcome (an event has happened but result haven't
                        updated in the system).
                        <br />
                        <br />
                        19. Bets on regional championships are settled within 10
                        days from the publication of the results on official
                        websites thereof. If one of the teams does not show up,
                        all bets shall be settled at odds of 1 (refund). In this
                        event the non-participant forfeits the game.
                        <br />
                        <br />
                        20. A bet is considered to be accepted after its
                        registration on the server and its online confirmation.
                        Registered bets may not be altered or revoked.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
