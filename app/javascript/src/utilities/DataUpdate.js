export function marketOneUpdates(data, currentState) {
  let fixtureIndex = currentState.findIndex((el) => data.id == el.id);
  if (data.market_mkt1_status) {
    currentState[fixtureIndex] = {
      ...currentState[fixtureIndex],
      ...{
        outcome_mkt1_1: data.outcome_mkt1_1,
        outcome_mkt1_X: data.outcome_mkt1_X,
        outcome_mkt1_2: data.outcome_mkt1_2,
        market_mkt1_status: data.market_mkt1_status,
      },
    };
  }
  if (!data.market_mkt1_status) {
    currentState[fixtureIndex] = {
      ...currentState[fixtureIndex],
      ...{
        match_time: data.match_time,
        home_score: data.home_score,
        away_score: data.away_score,
      },
    };
  }

  return currentState;
}

export function fixtureUpdate(data, fixture, market, channel) {
  if (channel === "Fixture") {
    fixture = {
      ...fixture,
      ...{
        match_time: data.match_time,
        home_score: data.home_score,
        away_score: data.away_score,
      },
    };
    return fixture;
  }
  switch (market) {
    case "1":
      fixture = {
        ...fixture,
        ...{
          outcome_mkt1_1: data.outcome_mkt1_1,
          outcome_mkt1_2: data.outcome_mkt1_2,
          outcome_mkt1_X: data.outcome_mkt1_X,
          market_mkt1_status: data.market_mkt1_status,
        },
      };
      return fixture;
    case "2":
      fixture = {
        ...fixture,
        ...{
          outcome_mkt2_Under: data.outcome_mkt2_Under,
          outcome_mkt2_Over: data.outcome_mkt2_Over,
          market_mkt2_status: data.market_mkt2_status,
        },
      };
      return fixture;
    case "3":
      fixture = {
        ...fixture,
        ...{
          outcome_mkt3_1: data.outcome_mkt3_1,
          outcome_mkt3_2: data.outcome_mkt3_2,
          market_mkt3_status: data.market_mkt3_status,
        },
      };
      return fixture;
    case "7":
      fixture = {
        ...fixture,
        ...{
          outcome_mkt7_12: data.outcome_mkt7_12,
          outcome_mkt7_1X: data.outcome_mkt7_1X,
          outcome_mkt7_X2: data.outcome_mkt7_X2,
          market_mkt7_status: data.market_mkt7_status,
        },
      };
      return fixture;
    case "17":
      fixture = {
        ...fixture,
        ...{
          outcome_mkt17_Yes: data.outcome_mkt17_Yes,
          outcome_mkt17_No: data.outcome_mkt17_No,
          market_mkt17_status: data.market_mkt17_status,
        },
      };
      return fixture;
    default:
      return fixture;
  }
}
