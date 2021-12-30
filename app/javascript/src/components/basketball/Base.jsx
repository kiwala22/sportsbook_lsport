import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import BetSlip from "../BetSlip";
import Footer from "../Footer";
import Navbar from "../Navbar";
import SideBanner from "../SideBanner";
import Sidebar from "../Sidebar";
import Home from "./Home";
const Base = (props) => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className="wrapper root-app">
        <header className="header-area gradient-bg heading">
          <Navbar />
        </header>
        <section className="section-container topping">
          <div className="content-wrapper mobile-signup py-0">
            <div className="container-fluid">
              <div className="row">
                <Sidebar />
                <div
                  className={
                    isMobile
                      ? "col-sm-12 mt-20 px-lg-1 px-xl-1 px-md-1"
                      : "col-xl-7 col-lg-7 col-md-7 col-sm-12 mt-20 px-lg-1 px-xl-1 px-md-1"
                  }
                >
                  <div>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        // render={() => {
                        //   return redirectOnUnverified(Home);
                        // }}
                        component={Home}
                      />
                    </Switch>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 hidden-sm-down mt-20 px-lg-1 px-xl-1 px-md-1">
                  <BetSlip />
                  <br />
                  <SideBanner />
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer
          className={
            isMobile ? "footer-container mobile-footer" : "footer-container"
          }
        >
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Base;
