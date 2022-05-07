import { element } from "prop-types";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import Mobile from "../utilities/Mobile";

const initialState = {
  signedIn: false,
  verified: false,
  userInfo: {},
  games: [],
  multiplier: 0,
  selectedChoices: [],
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
      return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
    case "sider":
      return { ...state, displaySider: action.payload };
    case "mobileBetSlip":
      return { ...state, showBetSlip: action.payload };
    case "OnScreenChange":
      return { ...state, isMobile: Mobile.isMobile() };
    case "onSportChange":
      return { ...state, sportType: action.payload };
    case "multiplier":
      return { ...state, multiplier: action.payload };
    case "betSelected":
      return {
        ...state,
        selectedChoices: dataMerger(state.selectedChoices, action.payload),
      };
    case "removeSelected":
      return {
        ...state,
        selectedChoices: betRemoval(state.selectedChoices, action.payload),
      };
    default:
      return state;
  }
}

function dataMerger(oldData, newData) {
  if (newData.length === 0) {
    return [];
  }

  let objIndex = oldData.findIndex((element) => element.Id === newData[0].Id);

  if (objIndex !== -1) {
    let data = betRemoval(oldData, newData[0].Id);

    return (updatedData = [...data, ...newData]);
  }

  let updatedData = [...oldData, ...newData];

  return updatedData;
}

function betRemoval(oldData, Id) {
  let newVal = oldData.filter((element) => element.Id !== Id);
  return newVal;
}

const persistConfig = {
  key: "sportType",
  storage: storage,
  whitelist: ["sportType", "selectedChoices"], // which reducer you want to persist in store
};

const pReducer = persistReducer(persistConfig, reducer);
const store = createStore(pReducer);
const persistor = persistStore(store);

export { persistor, store };
