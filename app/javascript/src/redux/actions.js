import Requests from "../utilities/Requests";

export default function addBet(
  dispatcher,
  outcomeId,
  market,
  fixtureId,
  outcomeDesc,
  marketIdentifier,
  specifier = null,
  choice = null
) {
  const dispatch = dispatcher;
  let path = "/add_bet";
  let values = {
    outcome_id: outcomeId,
    fixture_id: fixtureId,
    market: market,
    outcome_desc: outcomeDesc,
    identifier: marketIdentifier,
    specifier: specifier,
  };

  Requests.isPostRequest(path, values)
    .then((response) => {
      dispatch({ type: "addBet", payload: response.data });
      dispatch({
        type: "betSelected",
        payload: [{ Id: fixtureId, choice: choice }],
      });
    })
    .catch((error) => console.log(error));
}
