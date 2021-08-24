// import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import "react-phone-number-input/style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../css/Antd.less";
import "../css/App";
import Base from "./Base";

const App = (props) => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Base} />
        </Switch>
      </Router>
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("root-app");
  app && ReactDOM.render(<App />, app);
});
