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

  let objIndex = fixture.markets.findIndex(
    (element) => element.market_identifier === data.market_identifier
  );

  let currentObj = fixture.markets[objIndex];

  currentObj = {
    ...currentObj,
    ...data,
  };

  fixture.markets[objIndex] = {
    ...fixture.markets[objIndex],
    ...currentObj,
  };

  return fixture;
}
