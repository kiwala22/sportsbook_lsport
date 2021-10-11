// export function marketOneUpdates(data, currentState) {
//   let fixtureIndex = currentState.findIndex((el) => data.id == el.id);
//   if (data.market_1_status) {
//     currentState[fixtureIndex] = {
//       ...currentState[fixtureIndex],
//       ...{
//         market_1_odds: data['market_1_odds'],
//         market_1_status: data.market_1_status,
//       },
//     };
//   }

//   if (!data.market_1_status) {
//     currentState[fixtureIndex] = {
//       ...currentState[fixtureIndex],
//       ...{
//         match_time: data.match_time,
//         home_score: data.home_score,
//         away_score: data.away_score,
//       },
//     };
//   }

//   return currentState;
// }

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
  fixture = {
    ...fixture,
    ...{
      [`market_${market}_odds`]: JSON.parse(data[`market_${market}_odds`]),
      [`market_${market}_status`]: data[`market_${market}_status`],
    },
  };
  return fixture;
}
