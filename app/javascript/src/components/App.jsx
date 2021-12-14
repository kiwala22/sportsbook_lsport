import "antd-mobile/dist/antd-mobile.less";
import React from "react";
import ReactDOM from "react-dom";
import "react-phone-number-input/style.css";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../css/Antd.less";
// import "../css/App.css";
import { store } from "../redux/store";
import Base from "./Base";
import BasketBase from "./basketball/Base";

const App = (props) => {
  const sportType = useSelector((state) => state.sportType);

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
