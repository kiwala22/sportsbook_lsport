export function marketOneUpdates(data, currentState) {
  let fixtureIndex = currentState.findIndex((el) => data.id == el.id);
  if (data.market_status) {
    currentState[fixtureIndex] = {
      ...currentState[fixtureIndex],
      ...{
        outcome_1: data.outcome_1,
        outcome_X: data.outcome_X,
        outcome_2: data.outcome_2,
        market_status: data.market_status,
      },
    };
  }
  if (!data.market_status) {
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
