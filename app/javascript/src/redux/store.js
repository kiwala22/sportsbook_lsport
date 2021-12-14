import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Mobile from "../utilities/Mobile";

const initialState = {
  signedIn: false,
  verified: false,
  userInfo: {},
  games: [],
  displaySider: false,
  showBetSlip: false,
  isMobile: Mobile.isMobile(),
  sportType: "football",
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
    case "OnScreenChange":
      return { ...state, isMobile: Mobile.isMobile() };
    case "onSportChange":
      return { ...state, sportType: action.payload };
    default:
      return state;
  }
}

const persistConfig = {
  key: "sportType",
  storage: storage,
  whitelist: ["sportType"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, reducer);
const store = createStore(pReducer);
const persistor = persistStore(store);

export { persistor, store };
