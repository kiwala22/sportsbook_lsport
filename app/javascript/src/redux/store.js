import { createStore } from "redux";

const initialState = {
  signedIn: false,
  verified: false,
  userInfo: {},
  games: [],
  displaySider: false,
  showBetSlip: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "signedInVerify":
      return {
        ...state,
        verified: action.payload,
        signedIn: action.payload,
        userInfo: action.user,
      };
    case "notSignedInNotVerify":
      return { ...state, verified: action.payload, signedIn: action.payload };
    case "signin":
      return { ...state, signedIn: action.payload };
    case "addBet":
      return { ...state, games: action.payload };
    case "userUpdate":
      return { ...state, userInfo: action.payload };
    case "sider":
      return { ...state, displaySider: action.payload };
    case "mobileBetSlip":
      return { ...state, showBetSlip: action.payload };
    default:
      return state;
  }
}

export default createStore(reducer);
