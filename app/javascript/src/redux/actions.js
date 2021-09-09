import Requests from "../utilities/Requests";

export default function addBet(
  dispatcher,
  outcomeId,
  market,
  fixtureId,
  outcomeDesc
) {
  const dispatch = dispatcher;
  let path = "/add_bet";
  let values = {
    outcome_id: outcomeId,
    fixture_id: fixtureId,
    market: market,
    outcome_desc: outcomeDesc,
  };
  Requests.isPostRequest(path, values)
    .then((response) => {
      dispatch({ type: "addBet", payload: response.data });
    })
    .catch((error) => console.log(error));
}
