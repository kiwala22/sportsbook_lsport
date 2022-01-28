import "antd-mobile/dist/antd-mobile.less";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "react-phone-number-input/style.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BasketBase from "./components/basketball/Base";
import Base from "./components/football/Base";
import "./css/Antd.less";
import { store } from "./redux/store";
import Requests from "./utilities/Requests";

const App = (props) => {
  const dispatch = useDispatch();
  const sportType = useSelector((state) => state.sportType);

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch({ type: "OnScreenChange", payload: {} });
    });
  }, []);

  useEffect(() => {
    checkUserVerification();
  }, []);

  function checkUserVerification() {
    let path = "/api/v1/verification";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        if (response.data.message == "Verified") {
          dispatch({
            type: "signedInVerify",
            payload: true,
            user: response.data.user,
          });
        } else if (response.data.message == "Verify") {
          dispatch({ type: "signin", payload: true });
        } else {
          dispatch({ type: "notSignedInNotVerify", payload: false });
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {sportType == "football" ? (
        <>
          <Router>
            <Switch>
              <Route path="/" component={Base} />
            </Switch>
          </Router>
        </>
      ) : (
        <>
          <Router>
            <Switch>
              <Route path="/" component={BasketBase} />
            </Switch>
          </Router>
        </>
      )}
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("root-app");
  app &&
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      app
    );
});
