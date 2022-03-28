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
                  <h5>General Sports Betting Rules</h5>
                  <div className="paragraph">
                    <p>
                      Company reserves the right to correct obvious errors with
                      the input of betting odds and/or the evaluation of betting
                      results even after the event - or to declare affected bets
                      void. It is the customer&apos;s responsibility to ensure
                      they place their bets correctly.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Normally bets are open until the official starting time of
                      the event. Sometimes an event starts earlier than first
                      posted, with Company being unaware of it, or that Company
                      has the wrong starting time. Any bets received after the
                      event has started, will be cancelled.
                    </p>
                    <p></p>
                    <p>
                      Our Sportsbook maxima and minima can be found from&nbsp;
                    </p>
                    <p>
                      <a href="/terms/">
                        <u>Terms & Conditions page.</u>
                      </a>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      In case a user places several identical bets (also
                      combinations of single and multiple bets) for which the
                      total winnings exceed the winnings limit per betslip then
                      Company has the right to reduce the bet to comply with the
                      winnings limits.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      BetSports reserves the right to withhold payment and to
                      declare bets on an event void if we have evidence that the
                      following has occurred:
                    </p>
                    <p>
                      (i) The integrity of the event has been called into
                      question;
                    </p>
                    <p>(ii) the price(s) or pool has been manipulated; or</p>
                    <p>
                      (iii) match rigging has taken place. Evidence of the above
                      may be based on the size, volume or pattern of bets placed
                      with BetSports across any or all of our betting channels.
                      A decision given by the relevant governing body of the
                      sport in question (if any) will be conclusive. If any
                      customer owes any money to BetSports for any reason, we
                      have the right to take that into account before making any
                      payments to that customer.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      If, for some reason, an event occurs that is unclear or
                      not covered by these rules, Company reserves the right to
                      decide the outcome of each event on a case-by-case basis.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>BetTypes</strong>
                    </p>
                    <p>
                      The Company accepts single bets and multiple bets up to a
                      maximum of 45 (forty-five) selections.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Bets with two selections combined are referred to as 2-leg
                      multibets or doubles. Bets with three selections combined
                      are referred to as 3-leg multibets or trebles, and so on.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Change of Venue</strong>
                    </p>
                    <p>
                      If an event does not take place at the scheduled venue, or
                      if one of the teams does not coincide with those
                      originally scheduled for the match, the Company reserves
                      the right to void all the related bets.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Dependent Bets</strong>
                    </p>
                    <p>
                      Multiple bets are not acceptable if dependency exists
                      unless special prices are offered for the combined
                      eventuality. Where a dependent bet is accidentally
                      accepted, because of human or technical error, the Company
                      reserves the right to void the bet.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Dependency means the outcome of one bet leg affects or is
                      affected by the outcome of another. An example of
                      dependency is: Manchester United to win the first half
                      &amp; Manchester United to win the match.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Display of Matches</strong>
                    </p>
                    <p>
                      The team displayed first is considered the home team and
                      the one displayed second is considered the away team. If a
                      match takes place at a neutral venue, the (n) mark will be
                      displayed after the fixture.
                    </p>
                    <p>
                      BetSports offers betting on youth football. When a
                      football match is a youth matchup, it is identified in the
                      match description as U19, U23, etc. Please be careful when
                      placing bets as England-Germany U19 can easily be mistaken
                      for England-Germany.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Live Betting</strong>
                    </p>
                    <p>
                      General: Be aware that in Live (In-Play) betting prices
                      change often and bet types appear and disappear without
                      warning. It&rsquo;s exciting and fun and can add a lot of
                      enjoyment to watching a match! Live bets can be singles or
                      multi-bets.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Bet Types: Events &amp; prices are offered at the
                      discretion of The Company. We do not guarantee having a
                      particular bet type available at any point in a game. eg a
                      team may be leading 3-0 after 82 minutes, making 1X2
                      betting redundant but betting on over/under 3.5 goals is
                      still very relevant. We reserve the right to suspend any
                      or all betting on a market at any time without notice.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Information Displayed &amp; Scoreboard: Although we make
                      every effort to ensure all Live In-Play information
                      displayed is correct, live information (such as the score
                      and game time elapsed) is intended to be used as a guide
                      and The Company assumes no liability in the event that any
                      information is incorrect.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Bet Processing Delays: For security purposes any bets
                      placed on live betting events are automatically delayed.
                      Clients trying to place bets may experience a delay of up
                      to 10 seconds depending on the: sport, match venue and the
                      speed of your internet connection.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Live Vision: Be aware that transmissions described as
                      &lsquo;live&rsquo; by some broadcasters may actually be
                      delayed. Exercise caution if you are betting while
                      watching what you believe is a live event! It&rsquo;s not
                      always so!
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Past-post: If it has been determined by The Company that a
                      bet was placed after the outcome of an event is known or
                      after the selected participant or team has gained a
                      material advantage (eg a score) open and settled bets in
                      question will be cancelled.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Results: Although every effort is made to result bets as
                      soon as a match is finished, our system needs to obtain
                      the result from two reliable sources in order to settle
                      bets with precision; this process can take a few minutes.
                      If the outcome of a market cannot be immediately verified,
                      we delay resulting until proper confirmation is obtained;
                      occasionally with lower level football or tennis you need
                      to exercise patience.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Official Result stands</strong>
                    </p>
                    <p>
                      The outcome of a bet is based on the result achieved on
                      the field. Later decisions taken by disciplinary, sports
                      or legal bodies and affecting or amending the result
                      achieved on the field will not be taken into
                      consideration.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      If a home team chooses to play at a venue other than their
                      official one, it will be considered the home team and no
                      (n) sign will be used.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Incorrect Cash Out</strong>
                    </p>
                    <p>
                      Any bets that have been Cashed Out by the customer where
                      the Cash Out amount is incorrect due to an error in the
                      underlying price will stand and be resettled at the
                      correct amount. This resettlement can happen prior to the
                      start of an event, In-Play or after the event.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Time Display</strong>
                    </p>
                    <p>
                      All indicated dates and times are Greenwich Mean Time
                      (GMT+3).
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Football (Soccer) Betting Rules</strong>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Match length</strong>
                    </p>
                    <p>
                      In case a match is scheduled to be played in any other
                      format than regular 2x45 minutes plus given injury time,
                      all bets on a match will be voided.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      An exception here will be friendly matches, where bets on
                      all match markets are calculated on the basis of the
                      actual result of the match,
                    </p>
                    <p>
                      regardless of whether the 90-minute normal time is played.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Abandoned Matches</strong>
                    </p>
                    <p>
                      An abandoned match is one that kicks off but does not
                      reach its natural conclusion within 24 hours.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      If a match is abandoned, any bets where the outcome has
                      already been decided (eg half-time result or first team to
                      score) will stand. All other single bets will be void
                      regardless of the score at the time of abandonment while
                      affected multiple bets will remain valid but with that
                      match removed from the betslip.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      For example, there could be a floodlight failure or a
                      pitch invasion and the referee removes the players from
                      the field of play. If he resumes the remaining minutes of
                      play within 24 hours of the original scheduled kickoff
                      time the match will not be deemed as abandoned and all
                      bets will stand. Otherwise, single bets will be void and
                      have their bet stake refunded while affected multiple bets
                      will remain valid but with that match removed from the
                      betslip.
                    </p>
                    <p>
                      Please note that in case the match was abandoned and
                      resumes within 24 hours, but they decide to play again
                      from the start (minute 1), all bets will be re-settled
                      according to the new result.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Goal Scoring</strong>
                    </p>
                    <p>
                      A team is considered to have scored the goal even if it
                      was actually scored by an opposing player (an own goal) or
                      if it was the result of a penalty kick during regular or
                      injury times.
                    </p>
                    <p>
                      &nbsp;In the event of a game being abandoned after it has
                      started but before the final whistle / buzzer, only bets
                      that can be settled at the time of abandonment will stand.
                      All other bets, including betting on the game outcome,
                      will be void and single bets will have their bet stake
                      refunded while affected multiple bets will remain valid
                      but with that match removed from the betslip.
                    </p>
                    <p>
                      <strong>Neutral Venues</strong>
                    </p>
                    <p>
                      If the match takes place in a neutral venue, the first
                      mentioned team on our site will be considered the home
                      team and the second mentioned team will be considered the
                      away team. Such matches will be indicated by (n).
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Postponed Matches</strong>
                    </p>
                    <p>
                      A postponed match is one that does not start at the
                      scheduled time, where the kickoff is postponed to a later
                      time or date.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      If kickoff is rescheduled to within 24 hours of the
                      original kickoff time then all bets stand.
                    </p>
                    <p></p>
                    <p>
                      If it is not rescheduled to be played within 24 hours of
                      the original kickoff time, single bets will be void and
                      have their bet stake refunded while affected multiple bets
                      will remain valid but with that match removed from the
                      betslip.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      In case the match is rescheduled to be played exactly 24
                      hours after the initial KO time, all bets will stand.
                    </p>
                    <p>
                      <strong>Resulting of Matches</strong>
                    </p>
                    <p>
                      The outcome of a bet on a football (soccer) event is based
                      on the scheduled minutes of play plus any added injury
                      time. This is sometimes referred to as &lsquo;Regular
                      Time&rsquo; or &rsquo;90 minutes&rsquo;. Unless otherwise
                      stated for specific bet types, overtime and penalty shoot
                      outs will not affect the outcome of the bet.
                    </p>
                    <p>
                      <strong>Booking markets</strong>
                    </p>
                    <p>
                      Yellow card counts as 1 card and red or yellow-red card as
                      2. The 2nd yellow for one player which leads to a yellow
                      red card is not considered. As a consequence one player
                      cannot cause more than 3 cards.
                    </p>
                    <p></p>
                    <p>
                      Settlement will be made according to all available
                      evidence of cards shown during the regular 90 minutes
                      play.
                    </p>
                    <p></p>
                    <p>
                      Cards shown before or after the match are not considered.
                    </p>
                    <p>
                      Cards shown on HT break will be considered as given on 2nd
                      half for settlement purposes.
                    </p>
                    <p>
                      Cards for non-players (already substituted players,
                      managers, players on bench) are not considered.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Corner Markets</strong>
                    </p>
                    <p>Corners awarded but not taken are not considered</p>
                    <p>
                      Markets for corners count for regular time only. Overtime
                      is not counted for this market.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Serious Irregularity</strong>
                    </p>
                    <p>
                      In case of serious irregularity impacting upon the outcome
                      of a betting event (eg a team playing with youth squad
                      because of strike, protest, illness, etc), the Company has
                      the right to cancel accepted bets or declare such betting
                      event void.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Football Bet Types &amp; Resulting Rules</strong>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>1X2 - Full Time</strong>
                    </p>
                    <p>
                      1X2 also called Match Result or 3-way is the most popular
                      market in football betting. The aim is to predict the
                      outcome of the match result after regular time.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      1 - Home team or the team listed to the left side of the
                      offer
                    </p>
                    <p>X - Draw</p>
                    <p>
                      2 - Away team or the team listed to the right side of the
                      offer
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result is 1-2, the winning outcome would be
                      selection 2, because Barcelona won the match&quot;]
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>1X2 - First Half</strong>
                    </p>
                    <p>Predict which team wins the first half</p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      1 - Home team or the team listed to the left side of the
                      offer
                    </p>
                    <p>X - Draw</p>
                    <p>
                      2 - Away team or the team listed to the right side of the
                      offer
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>1X2 - Second half</strong>
                    </p>
                    <p>Predict which teams wins the second half</p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      1 - Home team or the team listed to the left side of the
                      offer
                    </p>
                    <p>X - Draw</p>
                    <p>
                      2 - Away team or the team listed to the right side of the
                      offer
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer goals than the
                      suggested line during the regular time
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more goals than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer goals than the line
                      suggested
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result was 1-2 the winning selection for 2.5
                      line would be Over because three goals were scored and 3
                      is more than 2.5&quot;]
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - First Half</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer goals than the
                      suggested line during the first half
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more goals than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer goals than the line
                      suggested
                    </p>
                    <p></p>
                    <p>
                      <strong>Over/Under - HOME - Full Time</strong>
                    </p>
                    <p>
                      Predict if Home team scores more or fewer goals than the
                      suggested line during the regular time
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more goals than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer goals than the line
                      suggested
                    </p>
                    <p></p>
                    <p>
                      <strong>Over/Under - AWAY - Full Time</strong>
                    </p>
                    <p>
                      Predict if Away team scores more or fewer goals than the
                      suggested line during the regular time
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more goals than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer goals than the line
                      suggested
                    </p>
                    <p>
                      <strong>3-way Handicap - Full Time</strong>
                    </p>
                    <p>
                      3-way handicap, also known as European handicap is a
                      market where you can predict which team will win the match
                      at the end of regular time after the handicap is applied.
                      Extra time and penalty shootouts do not count.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>1 2.25 Barcelona is -1.0</p>
                    <p>X 3.60 Draw is -1.0</p>
                    <p>2 2.65 Real Madrid is +1.0&quot;</p>
                    <p>
                      <em>Example#1:</em>
                    </p>
                    <p>
                      Let&apos;s assume the game finishes a 2-2 draw. If you bet
                      on Real Madrid @ 2.65 the +1.0 (plus one goal) is added to
                      the Real Madrid&apos;s score and your bet is a winner.
                    </p>
                    <p>
                      <em>Example#2:</em>
                    </p>
                    <p>
                      Let&apos;s assume the game finishes a 2-2 draw. If you bet
                      on the Draw @ 3.60 the -1.0 (minus one goal) is deducted
                      from the Barcelona&apos;s score and your bet is a loser.
                    </p>
                    <p>
                      <strong>Double Chance - Full Time</strong>
                    </p>
                    <p>
                      A market where one selection covers 2 outcomes, which
                      makes it a less risky than regular 1X2 market. Predict one
                      of the double outcomes for regular time.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1X - Home team win or draw</p>
                    <p>X2 - Away team win or draw</p>
                    <p>12 - Home team or away team win</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result was 1-2, winning selections would be
                      X2 and 12, because Barcelona won the match. With score
                      1-1, winning selections are 1X and X2, because for those,
                      the draw is also covered.
                    </p>
                    <p>
                      <strong>Double chance - First Half</strong>
                    </p>
                    <p>
                      A market where one selection covers 2 outcomes, which
                      makes it a less risky than regular 1X2 market. Predict one
                      of the double outcomes for the first half.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1X - Home team win or draw</p>
                    <p>X2 - Away team win or draw</p>
                    <p>12 - Home team or away team win</p>
                    <p>
                      <strong>Double chance - Second Half</strong>
                    </p>
                    <p>
                      A market where one selection covers 2 outcomes, which
                      makes it a less risky than regular 1X2 market. Predict one
                      of the double outcomes for the second half.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1X - Home team win or draw</p>
                    <p>X2 - Away team win or draw</p>
                    <p>12 - Home team or away team win</p>
                    <p>
                      <strong>Both Teams To Score - Full Time</strong>
                    </p>
                    <p>
                      Both teams to score FT (BTTS, Gol/Gol) is a market where
                      you can predict whether both teams will score at least one
                      goal or not during the regular time
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Both teams will score a goal, the minimum scoreline
                      requirement is 1-1
                    </p>
                    <p>No - Only one team scored or the score stayed 0-0</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result is 1-2, winning selection would be
                      Yes, because both teams scored at least one goal during
                      the match
                    </p>
                    <p></p>
                    <p>
                      <strong>Both Teams To Score - First Half</strong>
                    </p>
                    <p>
                      Both teams to score 1st half (BTTS, Gol/Gol) is a market
                      where you can predict whether both teams will score at
                      least one goal or not during the first half.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Both teams will score a goal, the minimum scoreline
                      requirement is 1-1
                    </p>
                    <p>No - Only one team scored or the score stayed 0-0</p>
                    <p>
                      <strong>Both Teams To Score - Second half</strong>
                    </p>
                    <p>
                      Both teams to score 2nd half (BTTS, Gol/Gol) is a market
                      where you can predict whether both teams will score at
                      least one goal or not during the second half.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Both teams will score a goal, the minimum scoreline
                      requirement is 1-1
                    </p>
                    <p>No - Only one team scored or the score stayed 0-0</p>
                    <p>
                      <strong>2-way Handicap - Full Time</strong>
                    </p>
                    <p>
                      2-way handicap is a market where you can predict which
                      team will win the match at the end of regular time after
                      the handicap is applied. Extra time and penalty shootouts
                      do not count.
                    </p>
                    <p>
                      <em>Example</em>
                    </p>
                    <p>1 1.56 Barcelona is -0.5</p>
                    <p>2 2.65 Real Madrid is +0.5</p>
                    <p>
                      Let&apos;s assume the game finishes a 2-2 draw. If you bet
                      on Real Madrid @ 2.65 the +0.5 (plus half a goal) is added
                      to Real Madrid&apos;s score and your bet is a winner.
                    </p>
                    <p>
                      <strong>Clean Sheet - HOME Team</strong>
                    </p>
                    <p>
                      You can predict whether home team will not concede a goal
                      or let away team score against them.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Home team will not concede any goals, meaning away
                      team will not score any goals
                    </p>
                    <p>
                      No - Home team will not keep clean sheet, meaning that
                      they will concede at least one goal
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result is 1-2, winning selection would be No,
                      because Real Madrid couldn&apos;t keep the clean sheet and
                      Barcelona scored 2 goals against them.
                    </p>
                    <p>
                      <strong>Clean Sheet - AWAY Team</strong>
                    </p>
                    <p>
                      You can predict whether away team will not concede a goal
                      or let home team score against them.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Away team will not concede any goals, meaning home
                      team will not score any goals
                    </p>
                    <p>
                      No - Away team will not keep clean sheet, meaning that
                      they will concede at least one goal
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result is 1-2, winning selection would be No,
                      because Barcelona couldn&apos;t keep the clean sheet and
                      Real Madrid scored 1 goal against them.
                    </p>
                    <p>
                      <strong>Correct score - Full Time</strong>
                    </p>
                    <p>
                      A market, where you can predict the correct final score of
                      the regular time. Scores are always on the home-away
                      perspective, meaning that 1-0 is home team to win match
                      1-0.
                    </p>
                    <p>
                      Other - Selection &apos;Other&apos; means every other
                      scoreline that is not pointed out. If selections are 0-0,
                      0-1, 1-0, Other, then &quot;other&quot; means every other
                      possible scoreline that is not available for betting.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If The final result was 1-2, the winning selection would
                      be 1-2.
                    </p>
                    <p></p>
                    <p>
                      <strong>Correct Score - First Half</strong>
                    </p>
                    <p>
                      A market, where you can predict the correct final score of
                      the first half. Scores are always on the home-away
                      perspective, meaning that 1-0 is home team to win first
                      half 1-0.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Half Time/Full Time</strong>
                    </p>
                    <p>
                      Predict the outcome of the first half and the whole match
                      with one selection.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1/1 Home/Home</p>
                    <p>1/X Home/Draw</p>
                    <p>1/2 Home/Away</p>
                    <p>X/1 Draw/Home</p>
                    <p>X/X Draw/Draw</p>
                    <p>X/2 Draw/Away</p>
                    <p>2/1 Away/Home</p>
                    <p>2/X Away/Draw</p>
                    <p>2/2 Away/Away</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>HT 0-0</p>
                    <p>FT 1-2</p>
                    <p>
                      Winning selection would be X/2 here because first half was
                      a draw and Barcelona won the whole match.
                    </p>
                    <p>
                      <strong>Team to score (4-way) - Full Time</strong>
                    </p>
                    <p>
                      Predict if only home team will score? Or only away? Or
                      maybe both teams will score? Or the scoreline will be 0-0
                      and no one will score?
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>No Goal - There will be no goals scored</p>
                    <p>Home - Only home team will score</p>
                    <p>Away - Only away team will score</p>
                    <p>Both - Both teams will score</p>
                    <p>
                      <strong>1X2 and Over/Under - Full Time</strong>
                    </p>
                    <p>
                      Predict the result of the match and how many goals will be
                      scored.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>FT score is 2-2</p>
                    <p>
                      Your bet is a winner if you selected X-Over(2.5) because
                      the match finished as a draw and 4 goals were scored.
                    </p>
                    <p>
                      <strong>Draw No Bet - Full Time</strong>
                    </p>
                    <p>
                      Also called 12 or Moneyline is a market where you can
                      predict the winner of the match without the draw
                      selection. It means that whenever the match finishes with
                      a draw after regular time, you will get your stake back.
                      Affected multiple bets will remain valid but with that
                      match removed from the betslip. This market is available
                      for full time, 1st half and 2nd half.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1 - Home team wins</p>
                    <p>2 - Away team wins</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>
                      If the final result is 1-2, you will win in case your
                      selection was Barcelona. If the final result was 1-1, you
                      would get your stake back.
                    </p>
                    <p>
                      <strong>Odd/Even - Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be odd or even number of goals
                      scored during the match. Please note that 0 (zero) is
                      considered as even, so in case of a 0-0, the winning
                      selection is &quot;even&quot;.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Odd - There will be an odd number of goals scored in the
                      match
                    </p>
                    <p>
                      Even - There will be an even number of goals scored in the
                      match
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result was 1-2, the winning selection would
                      be Odd, because there were 3 goals scored in total and it
                      is an odd number.
                    </p>
                    <p>
                      <strong>Odd/Even - First half</strong>
                    </p>
                    <p>
                      Predict if there will be odd or even number of goals
                      scored during the first half. Please note that 0 (zero) is
                      considered as even, so in case of a 0-0, the winning
                      selection is &quot;even&quot;.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Odd - There will be an odd number of goals scored in the
                      first half
                    </p>
                    <p>
                      Even - There will be an even number of goals scored in the
                      first half
                    </p>
                    <p>
                      <strong>Odd/Even - HOME team Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be odd or even number of goals
                      scored by the home team during the match. Please note that
                      0 (zero) is considered as even, so in case of a 0-0, the
                      winning selection is &quot;even&quot;.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Odd - Home team will score an odd number of goals in the
                      match
                    </p>
                    <p>
                      Even - Home team will score an even number of goals in the
                      match
                    </p>
                    <p>
                      <strong>Odd/Even - AWAY team Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be odd or even number of goals
                      scored by an away team during the match. Please note that
                      0 (zero) is considered as even, so in case of a 0-0, the
                      winning selection is &quot;even&quot;.
                    </p>
                    <p>
                      <strong>Team To Score Last - 3 way</strong>
                    </p>
                    <p>
                      Predict which team will score the last goal or if there
                      will be no goals scored at all. Own goals do count in this
                      market.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1 - Home team will score the last goal</p>
                    <p>2 - Away team score the last goal</p>
                    <p>No goal - There will be no goals scored</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>Final result 1-2</p>
                    <p>
                      Let&apos;s say the goal sequence was 1-0 ; 1-1; 1-2. in
                      this case the winning selection would be 2 or away,
                      because Barcelona scored the last goal&quot;]
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Total Goals Exact - Full Time</strong>
                    </p>
                    <p>
                      Predict the exact number of goals scored during the match.
                      10+ goals mean that there will be either 10 or more goals
                      scored.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>0 - no goals scored</p>
                    <p>1 - only one goal scored</p>
                    <p>2 - two goals scored</p>
                    <p>3 - ...</p>
                    <p>4 - ...</p>
                    <p>5 - ...</p>
                    <p>10+ - ten or more goals scored</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the final result was 1-2, the winning selection would
                      be 3 as there were exactly three goals scored. Let&apos;s
                      say the score was 6-5. In this case the winner would be
                      selection 10+
                    </p>
                    <p>
                      <strong>First Goalscorer</strong>
                    </p>
                    <p>
                      Predict the player to score the first goal of the match.
                      In case of FT score 0-0, all bets will be voided.
                    </p>
                    <p></p>
                    <p>
                      If a player does not play or comes on after a goal has
                      already been scored, bets on that player will be void.
                      Single bets will have their bet stake refunded while
                      affected multiple bets will remain valid but with that leg
                      removed from the betslip.
                    </p>
                    <p></p>
                    <p>
                      Players that are substituted off or sent off before the
                      first goal is scored will be settled as losing bets.
                    </p>
                    <p></p>
                    <p>
                      Every effort will be made to quote first goals&nbsp;corer
                      prices for all participants. However, players not quoted
                      will count as winners should they score the first goal.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Please note that own goals do not count in settlements.
                    </p>
                    <p>
                      <strong>Anytime Goalscorer</strong>
                    </p>
                    <p>
                      Predict the player to score anytime during the match. In
                      case of FT score 0-0, all bets will be voided.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      If a player does not play, bets on that player will be
                      void. Single bets will have their bet stake refunded while
                      affected multiple bets will remain valid but with that leg
                      removed from the betslip.
                    </p>
                    <p></p>
                    <p>
                      Players that are substituted off or sent off before the
                      goal is scored will be settled as losing bets.
                    </p>
                    <p></p>
                    <p>
                      Every effort will be made to quote anytime goalscorer
                      prices for all participants. However, players not quoted
                      will count as winners should they score the first goal.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Please note that own goals do not count in settlements.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Last Goalscorer</strong>
                    </p>
                    <p>
                      Predict the player to score the last goal of the match. In
                      case of FT score 0-0, all bets will be voided.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      If a player does not play, bets on that player will be
                      void. Single bets will have their bet stake refunded while
                      affected multiple bets will remain valid but with that leg
                      removed from the betslip.&nbsp;
                    </p>
                    <p>
                      Players that are substituted off or sent off before the
                      last goal is scored will be settled as losing bets.
                    </p>
                    <p></p>
                    <p>
                      Every effort will be made to quote last goalscorer prices
                      for all participants. However, players not quoted will
                      count as winners should they score the first goal.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Please note that own goals do not count in settlements.
                    </p>
                    <p>
                      <strong>Brace Goalscorer</strong>
                    </p>
                    <p>
                      Select a player to score 2 or more goals in a match. In
                      case of FT score 0-0, all bets will be voided.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Bets are settled on the events that occur in regular time.
                      This includes any injury time added at the end of regular
                      time.
                    </p>
                    <p>Extra time does not count.</p>
                    <p>Own goals do not count towards goals scored.</p>
                    <p>
                      If the selected player leaves the field of play without
                      scoring two or more goals, bets placed on that player in
                      this market will have lost and will be settled as a loss.
                    </p>
                    <p>
                      If the selected player takes no part in the match, bets
                      placed on that player in this market will be void.
                    </p>
                    <p>
                      <strong>Hat-trick Goalscorer</strong>
                    </p>
                    <p>
                      Select a player to score 3 or more goals in a match. In
                      case of FT score 0-0, all bets will be voided.
                    </p>
                    <p>
                      Bets are settled on the events that occur in regular time.
                      This includes any injury time added at the end of regular
                      time.
                    </p>
                    <p>Extra time does not count.</p>
                    <p>Own goals do not count towards goals scored.</p>
                    <p>
                      If the selected player leaves the field of play without
                      scoring three or more goals, bets placed on that player in
                      this market will have lost and will be settled as a loss.
                    </p>
                    <p>
                      If the selected player takes no part in the match, bets
                      placed on that player in this market will be void.
                    </p>
                    <p>
                      <strong>Half with more goals</strong>
                    </p>
                    <p>
                      Predict which half of the game will produce more goals. If
                      you think there will be exactly the same amount of goals
                      on each half, you can place a bet on the selection
                      &quot;Equal&quot;. This market is available for full time
                      and for each team respectively.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      First half - There will be more goals scored during the
                      first half than on the second half
                    </p>
                    <p>
                      Second half - There will be more goals scoring during the
                      second half than on the first half
                    </p>
                    <p>
                      Equal - Both halves will have the same amount of goals
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Real Madrid v Barcelona</p>
                    <p>
                      If the half time score was 0-0 and the full time was 1-2,
                      winning selection would be Second half as there were no
                      goals scored during the first half and 3 goals were scored
                      on the second half.
                    </p>
                    <p>
                      <strong>HOME win both halves</strong>
                    </p>
                    <p>
                      Predict if Home team can win both 45-minute halves of the
                      match.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Yes - Home team will win both halves</p>
                    <p>No - Home team will not win both halves</p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>HT 1-0</p>
                    <p>FT 1-0</p>
                    <p>
                      Winning selection is No because Real Madrid did not win
                      the 2nd half of the match.
                    </p>
                    <p>
                      <strong>AWAY win both halves</strong>
                    </p>
                    <p>
                      Predict if Away team can win both 45-minute halves of the
                      match.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Yes - Away team will win both halves</p>
                    <p>No - Away team will not win both halves</p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>HT 1-2</p>
                    <p>FT 1-3</p>
                    <p>
                      Winning selection is Yes because Barcelona scored more
                      goals than Real Madrid each half, thus they won both
                      halves.
                    </p>
                    <p>
                      <strong>HOME win either half</strong>
                    </p>
                    <p>
                      Predict if Home team can score more goals than the
                      opponent on either half.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Home team wins either 1st half, 2nd half or both
                      halves
                    </p>
                    <p>No - Home team will not win any of the halves</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>HT 1-1</p>
                    <p>FT 2-2</p>
                    <p>
                      Winning selection is No as both teams scored 1 goal on
                      each half.
                    </p>
                    <p>
                      <strong>AWAY win either half</strong>
                    </p>
                    <p>
                      Predict if Away team can score more goals than the
                      opponent on either half.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Away team wins either 1st half, 2nd half or both
                      halves
                    </p>
                    <p>No - Away team will not win any of the halves</p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>HT 1-1</p>
                    <p>FT 2-3</p>
                    <p>
                      Winning selection is Yes as Barcelona managed to win
                      second half by scoring 2 goals against Real Madrid&apos;s
                      1.
                    </p>
                    <p>
                      <strong>HOME score in both halves</strong>
                    </p>
                    <p>
                      Predict if Home team can score in both halves of the match
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Yes - Home team will score in both halves</p>
                    <p>No - Home team will not score in both halves</p>
                    <p>
                      <strong>AWAY score in both halves</strong>
                    </p>
                    <p>
                      Predict if Away team can score in both halves of the match
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Yes - Away team will score in both halves</p>
                    <p>No - Away team will not score in both halves</p>
                    <p></p>
                    <p>
                      <strong>HOME team win to nil - Full Time</strong>
                    </p>
                    <p>
                      Predict if Home team can win the match without conceding a
                      goal. This market is available for full time and 1st half
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Home team wins the match and does not concede a goal
                      (keeps a clean sheet)
                    </p>
                    <p>
                      No - Home team does not win the match or concedes a goal
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>
                      Final result 1-0. Winning selection would be Yes because
                      Real Madrid won the match and they did not concede a goal
                      themselves&quot;]
                    </p>
                    <p>
                      <strong>AWAY team win to nil - Full Time</strong>
                    </p>
                    <p>
                      Predict if Away team can win the match without conceding a
                      goal. This market is available for full time and 1st half
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - Away team wins the match and does not concede a goal
                      (keeps a clean sheet)
                    </p>
                    <p>
                      No - Away team does not win the match or concedes a goal
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>
                      Final result 1-2. Winning selection would be No because
                      although Barcelona won the match, they could not keep a
                      clean sheet&quot;]
                    </p>
                    <p>
                      <strong>Corner Count 1X2 - Full Time</strong>
                    </p>
                    <p>
                      Predict which team will get the most corners during the
                      match.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1 - Home team most corners</p>
                    <p>X - equal amount of corners each team</p>
                    <p>2 - Away team most corners</p>
                    <p>
                      <strong>First Corner</strong>
                    </p>
                    <p>
                      Predict which team will take the first corner. Market is
                      available for FT and 1H. Please note that corners awarded,
                      but not taken are not considered in settlements.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1 - Home team</p>
                    <p>2 - Away team</p>
                    <p>No Corner - There will be no corners taken</p>
                    <p>
                      <strong>Corner Count Odd/Even - Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be odd or even number of corners
                      taken during the match. Please note that 0 (zero) is
                      considered as even, so in case no corners were taken, the
                      winning selection is &quot;even&quot;.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Odd - There will be odd number of corners taken in the
                      match
                    </p>
                    <p>
                      Even - There will be even number of corners taken in the
                      match
                    </p>
                    <p>
                      <strong>Total Corners Over/Under - Full Time</strong>
                    </p>
                    <p>
                      Predict how many corners there will be during the match.
                      Please note that corners awarded, but not taken are not
                      considered in settlements.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more corners than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer corners than the line
                      suggested
                    </p>
                    <p>
                      <strong>Total Corners Over/Under - First Half</strong>
                    </p>
                    <p>
                      Predict how many corners there will be during the first
                      half. Please note that corners awarded, but not taken are
                      not considered in settlements.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more corners than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer corners than the line
                      suggested
                    </p>
                    <p></p>
                    <p>
                      <strong>Team with most bookings - Full Time</strong>
                    </p>
                    <p>
                      Predict which team will have the most bookings during the
                      match.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1 - Home</p>
                    <p>X - Equal amount</p>
                    <p>2 - Away</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>
                      FT bookings 3-3. In this case, the winning selection is X,
                      as each team had 3 bookings.
                    </p>
                    <p>
                      <strong>Total bookings Over/Under - Full Time</strong>
                    </p>
                    <p>
                      Predict the number of total bookings in the match. Yellow
                      card counts as 1 booking and red or yellow-red card as 2.
                      The 2nd yellow for one player which leads to a yellow-red
                      card is not considered. As a consequence, one player
                      cannot cause more than 3 bookings. A direct red card is 2
                      bookings. Please note that bookings for non-fielders
                      (already substituted players, managers, players on the
                      bench) are not considered.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more bookings than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer bookings than the line
                      suggested
                    </p>
                    <p>
                      <strong>First Booking - Full Time</strong>
                    </p>
                    <p>
                      Predict which team will get the first booking (yellow or
                      red card)
                    </p>
                    <p>
                      <strong>1X2 and Both Teams To Score - Full Time</strong>
                    </p>
                    <p>
                      Predict the outcome of the match plus if both teams will
                      score at least 1 goal.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1-Yes - Home win and both teams will score</p>
                    <p>2-Yes - Away win and both teams will score</p>
                    <p>X-Yes - Draw and both teams will score</p>
                    <p>X-No - Draw and both teams will not score</p>
                    <p>1-No - Home win and both teams will not score</p>
                    <p>2-No - Away win and both teams will not score</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Real Madrid - Barcelona</p>
                    <p>FT score 1-2</p>
                    <p>
                      Winning selection is 2-yes, as Barcelona won the match and
                      both teams scored at least 1 goal.
                    </p>
                    <p>
                      <strong>Penalty Awarded</strong>
                    </p>
                    <p>
                      Predict whether or not a penalty will be awarded during a
                      match.
                    </p>
                    <p>
                      Bets are settled on the events that occur in regular time.
                    </p>
                    <p>
                      This includes any injury/stoppage time added on by the
                      match official at the end of regular time.
                    </p>
                    <p>Extra time does not count unless otherwise stated.</p>
                    <p>
                      If no penalty is awarded, the winning selection in this
                      market will be no.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Yes - There will be penalty awarded during the regular
                      match time.
                    </p>
                    <p>
                      No - There will be no penalty awarded during the regular
                      match time.
                    </p>
                    <p>
                      <strong>Player Red Card - Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be a red card shown during the
                      match. A card which was given during HT or after the match
                      will not count. Also, cards for bench players do not count
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>Yes - Player will be sent off during the regular time</p>
                    <p>
                      No - Player will not be sent off during the regular time
                    </p>
                    <p>
                      <strong>To Qualify</strong>
                    </p>
                    <p>
                      Predict which team will qualify to the next stage of the
                      tournament. Please be aware that in case of a final match
                      (for example World Cup Final) this market represents
                      winning the trophy market.
                    </p>
                    <p>
                      <strong>Penalty Shootout Winner</strong>
                    </p>
                    <p>
                      Predict which team will win the Penalty Shootout (Penalty
                      Shootout is a tie-breaker in case the score is still tied
                      after playing 30 minutes of Extra Time)
                    </p>
                    <p>
                      <strong>1X2 Extra Time</strong>
                    </p>
                    <p>
                      Predict which team will win the Extra Time. Penalty
                      Shootout will not count towards the settlement.
                    </p>
                    <p>
                      <strong>1X2 Extra Time 1H</strong>
                    </p>
                    <p>
                      Predict which team will win the first half of Extra Time
                      (first 15 minutes plus any given stoppage time)
                    </p>
                    <p>
                      <strong>Total Score Over/Under - Extra Time</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer goals than the
                      suggested line during the Extra Time. Penalty Shootout
                      will not count towards the settlement.
                    </p>
                    <p>
                      <strong>Total Score Over/Under - Extra Time - 1H</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer goals than the
                      suggested line during the first half of Extra Time (first
                      15 minutes plus any given stoppage time)
                    </p>
                    <p>
                      <strong>Double Chance - Extra Time</strong>
                    </p>
                    <p>
                      A market where one selection covers 2 outcomes, which
                      makes it a less risky than regular 1X2 market. Predict one
                      of the double outcomes for Extra Time.
                    </p>
                    <p></p>
                    <p>
                      <strong>Double Chance - Extra Time - 1H</strong>
                    </p>
                    <p>
                      A market where one selection covers 2 outcomes, which
                      makes it a less risky than regular 1X2 market. Predict one
                      of the double outcomes for first half of the Extra Time
                      (first 15 minutes plus any given stoppage time)
                    </p>
                    <p>
                      <strong>
                        Basketball Bet Types &amp; Resulting Rules
                      </strong>
                    </p>
                    <p>
                      <strong>Match Length</strong>
                    </p>
                    <p>
                      A regular basketball match consists of 4 quarters of 10
                      minutes each. So the total time is 40 minutes. However,
                      there are some exceptions -
                    </p>
                    <p>NBA - 4 x 12 minutes</p>
                    <p>NCAA - 2 x 20 minutes</p>
                    <p>CBA (Chinese Basketball League) - 4 x 12 minutes</p>
                    <p>PBA (Philippine Basketball League) - 4 x 12 minutes</p>
                    <p>
                      <strong>Abandoned / Postponed matches</strong>
                    </p>
                    <p>
                      Abandoned or postponed matches are void unless rearranged
                      and played within 24 hours from the initial start time.
                    </p>
                    <p>
                      In case the match is rescheduled to be played exactly 24
                      hours after the initial KO time, all bets will stand.
                    </p>
                    <p>
                      <strong>Moneyline - Full Time incl. Over Time</strong>
                    </p>
                    <p>
                      Predict which team win the match. Please note that market
                      includes overtime.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      Let&rsquo;s say we had a bet on Utah Jazz to win the
                      match. They scored 120 points against Lakers 100. Our bet
                      has won.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Moneyline - First Half</strong>
                    </p>
                    <p>
                      Predict which team win the first half. First half in
                      basketball is quarter 1 and 2. In case the score is drawn
                      after the 1st half all bets will be voided
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      We had a bet on Utah Jazz to win 1st half. Let&rsquo;s
                      have a look at the half time score &ndash; it was 47-69
                      (sum the points for quarter 1 and 2). Utah Jazz had more
                      points after 1st half so our bet won.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Moneyline - First Quarter</strong>
                    </p>
                    <p>
                      Predict which team win the first quarter. In case the
                      score is drawn after the 1st quarter all bets will be
                      voided
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      LA Lakers had 2 points more than Utah Jazz in the first
                      quarter so if you had a bet on them to win the 1st
                      quarter, you&rsquo;re a winner.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>1X2 - First Half</strong>
                    </p>
                    <p>
                      Predict which team leads after the first half. This market
                      has also an option to place a bet on draw.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      If you placed a bet on Utah Jazz to win first half, you
                      are a winner, because they had 69 points against Lakers 47
                      so they won the first half of the match.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - Full Time incl. Over Time</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer points scored
                      during the match than the line given. The market includes
                      overtime.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      Let&rsquo;s say we have a bet on &ldquo;under 225.5
                      points&rdquo;. If we sum up the total amount of points we
                      get 220 (100+120) which means, our bet won, because we
                      predicted that there will be less than 225.5 points and it
                      was a correct pick.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - First Half</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer points scored
                      during the first half than the line given
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      We have a bet on &ldquo;over 110.5 HT&rdquo;. Let&rsquo;s
                      sum up the HT score &ndash; 47+69=116, and it means the
                      bet has won, because we predicted that there will be more
                      than 110.5 points on 1st half.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - First Quarter</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer points scored
                      during the first quarter than the line given
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      Bet was placed on &ldquo;under 60.5 1Q&rdquo;. Let&rsquo;s
                      see the score of first quarter &ndash; 28+26=54 points. It
                      means our bet won, because our prediction was that there
                      will be less than 60.5 points scored during the first
                      quarter.
                    </p>
                    <p>
                      <strong>Over/Under - 1Q - Home Team</strong>
                    </p>
                    <p>
                      Predict if Home team will score more or fewer points than
                      the line suggests
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      We have a bet on &ldquo;Home Team over 25.5 points 1
                      Q&rdquo;. They scored 28 points which mean this bet is a
                      winner, because we needed at least 26 points from them.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - 1Q - Away Team</strong>
                    </p>
                    <p>
                      Predict if Away team will score more or fewer points than
                      the line suggests
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      Away team scored 26 points in first quarter. I you had a
                      bet &ldquo;Away team under 26.5 points 1Q&rdquo;, you are
                      a winner.
                    </p>
                    <p>
                      <strong>Match Winner and Totals - FT incl. OT</strong>
                    </p>
                    <p>
                      Predict the outcome of the match and total points scored
                      with one selection
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      Bet was placed on a selection &ldquo;2 &ndash; Under
                      225.5&rdquo;, which means we predict that Utah Jazz wins
                      the match and there will be less than 225.5 points scored.
                      After checking the final result, we see that this bet won,
                      as Utah Jazz won the match and only 220 points were
                      scored.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>
                        2-way Handicap - Full Time incl. Over Time
                      </strong>
                    </p>
                    <p>
                      2-way handicap (also known as point spread) is a market
                      where it&apos;s possible to bet on the outcome of an event
                      where one team has been given a point start. Bets are
                      settled on the outcome after adjusting for the handicaps.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      Let&rsquo;s place a bet on &ldquo;1(+24.5)&rdquo; which
                      means, we give LA Lakers 24.5 points advantage. After
                      checking the final result, we see that the bet has won,
                      because after the point spread has been added LA Lakers
                      has 124.5 points against Utah&rsquo;s 120.
                    </p>
                    <p>
                      <strong>2-way Handicap - First Half</strong>
                    </p>
                    <p>
                      Predict which team scores more points during the first
                      half after the point handicap applies
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      Bet was placed on &ldquo;2(-10.5) HT&rdquo; which means we
                      deduct 10.5 points from Away team&rsquo;s HT score. So
                      let&rsquo;s check the HT score - 47-69. If we take off
                      10.5 points from 69 we have 58.5 points which is still
                      higher then Home team&rsquo;s 47. Our bets has won.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>2-way Handicap - First Quarter</strong>
                    </p>
                    <p>
                      Predict which team scores more points during the first
                      quarter after the point handicap applies
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      We have a bet on &ldquo;1(-1.5) 1Q&rdquo; which means, we
                      take away 1.5 points from home team&rsquo;s first quarter
                      score. After the deduct it from them, we have 1st quarter
                      score 26.5-26. LA Lakers still have more points than Utah
                      Jazz so the bet has won.
                    </p>
                    <p>
                      <strong>Odd/Even - FT incl. OT</strong>
                    </p>
                    <p>
                      Predict if the sum of total points scored during the match
                      will be odd or even. The market includes overtime.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      We have a bet on &ldquo;Even &ndash; FT incl. OT&rdquo;.
                      Let&rsquo;s check the final score &ndash; 100-120. In
                      total we have 220 points, which is an even number, so the
                      bet has won.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Odd/Even - First Half</strong>
                    </p>
                    <p>
                      Predict if the sum of total points scored during the first
                      half will be odd or even.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      We have a bet on &ldquo;Even &ndash; 1 Half&rdquo;.
                      Let&rsquo;s check the HT score &ndash; 47-69. In total we
                      have 116 points, which is an even number, so the bet has
                      won.
                    </p>
                    <p></p>
                    <p>
                      <strong>Odd/Even - First Quarter</strong>
                    </p>
                    <p>
                      Predict if the sum of total points scored during the first
                      quarter will be odd or even.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>
                      LA Lakers v Utah Jazz 100-120 (28-26; 19-43; 31-29; 22-22)
                    </p>
                    <p>
                      We have a bet on &ldquo;Even &ndash; 1 Quarter&rdquo;.
                      Let&rsquo;s check the first quarter score &ndash; 28-26.
                      In total we have 54 points, which is an even number, so
                      the bet has won.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Tennis Bet Types &amp; Resulting Rules</strong>
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      Whenever a tennis match is officially postponed or
                      suspended, all the related bets will remain valid until
                      the match is resumed and concluded.
                    </p>
                    <p>
                      If a player retires, withdraws or is disqualified, all
                      markets related to the match will be void
                    </p>
                    <p></p>
                    <p>Tennis Tie break</p>
                    <p></p>
                    <p>
                      There are two types of Tiebreaks played in Tennis &ndash;
                      a Regular Tiebreak to determine the set winner and a Super
                      Tiebreak (also known as Match Tiebreak) to determine the
                      winner of the match.
                    </p>
                    <p>&nbsp;</p>
                    <p>Regular Tiebreak</p>
                    <p></p>
                    <p>
                      Set Tiebreak will be played in case the set score is 6-6.
                      Each player has won six games. They will play the tiebreak
                      until one of the players reach 7 points, but if the score
                      reaches six-points-all, the winner of the set is the first
                      player who wins two points in a row. Please note that It
                      also applies if the score is 7-6 &ndash; two point
                      difference is needed to win! (Super tiebreak also must
                      have a 2 point difference)
                    </p>
                    <p></p>
                    <p>Tennis Exhibition matches</p>
                    <p>
                      Please be aware that some tennis exhibition matches might
                      have a different format. Those matches will be settled
                      according to the official result.
                    </p>
                    <p>&nbsp;</p>
                    <p>Super Tiebreak</p>
                    <p></p>
                    <p>
                      In doubles matches, usually there will be a Super Tiebreak
                      instead of a 3rd set to speed up the event. So if the set
                      scores are 6-4; 3-6 they will play a Super Tiebreak to
                      determine a winner. In this tiebreak, team who first
                      reaches to 10 points is declared as a winner of the match.
                      But if the score reaches 10-points-all, the winner will be
                      a team who wins two points in a row. There has to be a 2
                      point margin to win the tiebreak. For settling purposes
                      BetSports counts Super tiebreak as 1 game only, so for
                      example if the final result was 6-4; 4-6; 10-8 total
                      amount of games is 21 (6+4+4+6+1).
                    </p>
                    <p>
                      <strong>Moneyline - FT</strong>
                    </p>
                    <p>
                      Predict which player wins. The match must be fully
                      completed for bets to stand.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      If the set scores are 4-6 6-4 3-6 the winner of the match
                      is Djokovic as he won 2 sets against Nadal&rsquo;s 1.
                      Please note that the match winner will be player who wins
                      more sets not more games.
                    </p>
                    <p>
                      <strong>Moneyline - First Set</strong>
                    </p>
                    <p>
                      Predict which player wins first set. The set must be fully
                      completed for bets to stand.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      If the first set score is 6-2, the winner of the set is
                      Nadal as he won 6 games against Djokovic&rsquo;s 2. Set
                      winner is a player who has won more games than the
                      opponent.
                    </p>
                    <p>
                      <strong>Moneyline - Second Set</strong>
                    </p>
                    <p>
                      Predict which player wins second set. The set must be
                      fully completed for bets to stand.
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      If the 2nd set score is 6-7, the winner of the set is
                      Djokovic as he won 7 games against Nadal&rsquo;s 6. Set
                      winner is a player who has won more games than the
                      opponent&quot;]
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer games played during
                      the match than the line suggests. Super tiebreak counts as
                      1 game
                    </p>
                    <p>
                      <em>Example 1:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      Final score is 6-4 6-2. Total amount of games is 18
                      (6+4+6+2).
                    </p>
                    <p>
                      <em>Example 2:</em>
                    </p>
                    <p>
                      In doubles match the super tiebreak counts as 1 game, so
                      if the final result is 6-4 4-6 10-5, amount of total games
                      is 21 (6+4+4+6+1).
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Games Over/Under - Home - FT</strong>
                    </p>
                    <p>
                      Predict if the home team player will have more or fewer
                      individual games during the match than the line suggests
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      Lets say the final result was 6-3 7-5. If you had a bet on
                      &bdquo;over 12.5 games Home team FT&ldquo; you have won,
                      because Nadal had in total 13 games which makes it more
                      than suggested 12.5 games. Home team player is always the
                      player or a team which is listed first in the fixture
                      name.
                    </p>
                    <p></p>
                    <p>
                      <strong>Games Over/Under - Away - FT</strong>
                    </p>
                    <p>
                      Predict if the away team player will have more or fewer
                      individual games during the match than the line suggests
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      You have placed a bet on &ldquo;away &ndash; 8.5 games
                      FT&rdquo;. Final score was 6-4 7-6. Even though away
                      player lost the match, you have won your bet, because
                      Djokovic won 10 games in total.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>2-way handicap Games - FT</strong>
                    </p>
                    <p>
                      Predict which player has more games won after the game
                      handicap applies
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      Final result was 4-6 6-4 3-6. Nadal won 13 games and
                      Djokovic won 16 games. So Djokovic won 3 games more than
                      his opponent. If your bet was &ldquo;1 (+3.5)&rdquo; you
                      have won, because you gave Nadal 3.5 games in advance and
                      now he has 16.5 games won, which is 0.5 more than
                      Djokovic.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Correct score - Full Time</strong>
                    </p>
                    <p></p>
                    <p>Predict the correct score for the match.</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      Final score was 4-6 7-6 6-4. Nadal won 2 sets and Djokovic
                      only 1. So it makes the final result 2-1.
                    </p>
                    <p>
                      <strong>Total Sets Exact - FT</strong>
                    </p>
                    <p>Predict how many sets will be played exactly</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      Nadal won the match 6-4 6-4. They played exactly 2 sets,
                      which would be the winning selection.
                    </p>
                    <p>
                      <strong>Odd/Even Games - FT</strong>
                    </p>
                    <p>
                      Predict if the total sum of played games will be odd or
                      even
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      Final result of the match was 4-6 6-4 4-6. Total amount of
                      games is 30, which is an even number, so the winning
                      selection for this bet is even.
                    </p>
                    <p>
                      <strong>Total Sets - Over/Under - FT</strong>
                    </p>
                    <p>
                      Predict if the amount of played sets will be more or fewer
                      than the line suggests. Please note the match has to reach
                      it natural conclusion for this market to be settled.
                    </p>
                    <p>
                      <em>Example 1:</em>
                    </p>
                    <p>Rafael Nadal v Novak Djokovic</p>
                    <p>
                      If the final result of the match was 6-4 6-4, we had only
                      2 sets played and selection &ldquo;Under 2.5&rdquo; is the
                      winner.
                    </p>
                    <p>
                      <em>Example 2:</em>
                    </p>
                    <p>
                      Nadal won the first set 6-4. Djokovic won the 2nd set 6-4.
                      Score is 3-3 in 3rd set and Nadal retires. In this case we
                      will cancel this market as the match did not finish even
                      though it&rsquo;s already in 3rd set.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>
                        Virtual Football (Soccer) Betting Rules, Bet Types &amp;
                        Resulting Rules
                      </strong>
                    </p>
                    <p>
                      Virtual Football match results are created using a
                      probabilistic valuation of an outcome occurring based on
                      the estimated strength of the participating Virtual Teams.
                      A Random Number Generator (RNG) is used to determine what
                      the results actually occurred for each event. This
                      guarantees that the outcome from one match does not
                      influence the next match, and that results will vary, even
                      if the same Virtual Teams play each other multiple times.
                    </p>
                    <p></p>
                    <p>
                      <strong>Cancelled Matches</strong>
                    </p>
                    <p>
                      In case of unforeseen circumstances, it might occur that a
                      regularly scheduled Virtual Match does not get to launch.
                      In case of this happening all bets on the match will be
                      cancelled.
                    </p>
                    <p>
                      <strong>1X2 - Full Time</strong>
                    </p>
                    <p>
                      1X2, also called Match Result or 3-way, is the most
                      popular market in football betting. The aim is to predict
                      the outcome of the match result after regular time.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      1 - Home team or the team listed to the left side of the
                      offer
                    </p>
                    <p>X - Draw</p>
                    <p>
                      2 - Away team or the team listed to the right side of the
                      offer
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>RMA v BAR</p>
                    <p>&nbsp;</p>
                    <p>
                      If the final result is 1-2, the winning outcome would be
                      selection 2, because BAR won the match&quot;]
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Over/Under - Full Time</strong>
                    </p>
                    <p>
                      Predict if there will be more or fewer goals than the
                      suggested line during the regular time
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>
                      Over x.5 - There will be more goals than the line
                      suggested
                    </p>
                    <p>
                      Under x.5 - There will be fewer goals than the line
                      suggested
                    </p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>RMA v BAR</p>
                    <p>&nbsp;</p>
                    <p>
                      If the final result was 1-2 the winning selection for 2.5
                      line would be Over because three goals were scored and 3
                      is more than 2.5&quot;]
                    </p>
                    <p>&nbsp;</p>
                    <p>
                      <strong>Double Chance - Full Time</strong>
                    </p>
                    <p>
                      A market where one selection covers 2 outcomes, which
                      makes it a less risky than regular 1X2 market. Predict one
                      of the double outcomes for regular time.
                    </p>
                    <p>
                      <em>Selections:</em>
                    </p>
                    <p>1X - Home team win or draw</p>
                    <p>X2 - Away team win or draw</p>
                    <p>12 - Home team or away team win</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>RMA v BAR</p>
                    <p>
                      &nbsp;If the final result was 1-2, winning selections
                      would be X2 and 12, because BAR won the match. With score
                      1-1, winning selections are 1X and X2, because for those,
                      the draw is also covered.
                    </p>
                    <p>
                      <strong>Half Time/Full Time</strong>
                    </p>
                    <p>
                      Predict the 1x2 outcome of the first half. Predict the 1x2
                      outcome of the whole match. Use one single selection to
                      place a bet that combines both predictions.
                    </p>
                    <p></p>
                    <p>
                      For the selection to be settled as a winner both
                      predictions must be correct. If either the first half or
                      the whole match prediction are wrong then the selection
                      will be settled as a loss.
                    </p>
                    <p></p>
                    <p>
                      The used format for expressing the selected combination is
                      HT/FT. A selection of 1/X means that Home (1) has been
                      selected as the result of the first half and Draw (X) has
                      been selected as the result of the full time.
                    </p>
                    <p>
                      <em>Selection Combinations:</em>
                    </p>
                    <p>1/1 Home/Home</p>
                    <p>1/X Home/Draw</p>
                    <p>1/2 Home/Away</p>
                    <p>X/1 Draw/Home</p>
                    <p>X/X Draw/Draw</p>
                    <p>X/2 Draw/Away</p>
                    <p>2/1 Away/Home</p>
                    <p>2/X Away/Draw</p>
                    <p>2/2 Away/Away</p>
                    <p>
                      <em>Example:</em>
                    </p>
                    <p>RMA v BAR</p>
                    <p>HT 0-0</p>
                    <p>FT 1-2</p>
                    <p>
                      Winning selection would be X/2 here because first half was
                      a draw and BAR won the whole match.
                    </p>
                  </div>
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
