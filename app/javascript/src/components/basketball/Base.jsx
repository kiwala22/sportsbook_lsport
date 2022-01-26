import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import BetSlip from "../BetSlip";
import Footer from "../Footer";
import Navbar from "../Navbar";
import SideBanner from "../SideBanner";
import Verify from "../Verify";
import Home from "./Home";
import PreviewUpcoming from "./PreviewUpcoming";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Upcoming from "./Upcoming";

const Base = (props) => {
  const { signedIn, verified, isMobile } = useSelector((state) => state);

  function redirectOnUnverified(component) {
    let variable = signedIn && !verified;
    var Component = component;
    if (variable) {
      cogoToast.info("Please Verify Your Phone Number First.", 5);
    }
    return variable ? <Redirect to="/new_verify/" /> : <Component />;
  }

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
                        path="/fixtures/search/"
                        render={() => {
                          return redirectOnUnverified(Search);
                        }}
                      />
                      <Route
                        path="/fixtures/basketball/pre/"
                        render={() => {
                          return redirectOnUnverified(PreviewUpcoming);
                        }}
                      />
                      <Route
                        path="/fixtures/basketball/pres/"
                        render={() => {
                          return redirectOnUnverified(Upcoming);
                        }}
                        component={Upcoming}
                      />
                      <Route
                        path="/new_verify/"
                        render={() => {
                          return !signedIn ? (
                            <Redirect to="/" />
                          ) : signedIn && verified ? (
                            <Redirect to="/" />
                          ) : (
                            <Verify />
                          );
                        }}
                      />
                      <Route
                        exact
                        path="/"
                        render={() => {
                          return redirectOnUnverified(Home);
                        }}
                      />
                    </Switch>
                  </div>
                </div>
                {!isMobile ? (
                  <div className="col-xl-3 col-lg-3 col-md-3 hidden-sm-down mt-20 px-lg-1 px-xl-1 px-md-1">
                    {props.location.pathname !== "/new_verify/" && <BetSlip />}
                    <br />
                    <SideBanner />
                  </div>
                ) : (
                  <>
                    {props.location.pathname !== "/new_verify/" && <BetSlip />}
                  </>
                )}
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
