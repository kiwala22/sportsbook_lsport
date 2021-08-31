import { createStore } from "redux";

const initialState = {
  signedIn: false,
  verified: false,
  userInfo: {},
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
    default:
      return state;
  }
}

export default createStore(reducer);
