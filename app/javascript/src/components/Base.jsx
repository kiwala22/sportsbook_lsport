import cogoToast from "cogo-toast";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Mobile from "../utilities/Mobile";
import Requests from "../utilities/Requests";
import Bets from "./Bets";
import BetSlip from "./BetSlip";
import Deposit from "./Deposit";
import Faqs from "./Faqs";
import Footer from "./Footer";
import Home from "./Home";
import LiveMatches from "./LiveMatches";
import LiveVirtualMatches from "./LiveVirtualMatches";
import Navbar from "./Navbar";
import NewPassword from "./NewPassword";
import PasswordCode from "./PasswordCode";
import PasswordReset from "./PasswordReset";
import PreMatches from "./PreMatches";
import PreviewLive from "./PreviewLive";
import PreviewLiveVirtual from "./PreviewLiveVirtual";
import PreviewPre from "./PreviewPre";
import PreviewPreVirtual from "./PreviewPreVirtual";
import PreVirtualMatches from "./PreVirtualMatches";
import Privacy from "./Privacy";
import Rules from "./Rules";
import Search from "./Search";
import SideBanner from "./SideBanner";
import Sidebar from "./Sidebar";
import Support from "./Support";
import Terms from "./Terms";
import Transactions from "./Transactions";
import Verify from "./Verify";
import Withdraw from "./Withdraw";

const Base = (props) => {
  const dispatch = useDispatch();
  const { signedIn, verified } = useSelector((state) => state);

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
                    Mobile.isMobile()
                      ? "col-sm-12 mt-20 px-lg-1 px-xl-1 px-md-1"
                      : "col-xl-7 col-lg-7 col-md-7 col-sm-12 mt-20 px-lg-1 px-xl-1 px-md-1"
                  }
                >
                  <div>
                    <Switch>
                      <Route path="/bet_slips/" component={Bets} />
                      <Route path="/transactions/" component={Transactions} />
                      <Route path="/deposit/" component={Deposit} />
                      <Route path="/withdraw/" component={Withdraw} />
                      <Route path="/faqs/" component={Faqs} />
                      <Route path="/rules/" component={Rules} />
                      <Route path="/privacy/" component={Privacy} />
                      <Route path="/terms/" component={Terms} />
                      <Route path="/contacts/" component={Support} />
                      <Route
                        path="/fixtures/search/"
                        render={() => {
                          return redirectOnUnverified(Search);
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/pre/"
                        render={() => {
                          return redirectOnUnverified(PreviewPre);
                        }}
                      />
                      <Route
                        path="/fixtures/virtual_soccer/pre/"
                        render={() => {
                          return redirectOnUnverified(PreviewPreVirtual);
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/live/"
                        render={() => {
                          return redirectOnUnverified(PreviewLive);
                        }}
                      />
                      <Route
                        path="/fixtures/virtual_soccer/live/"
                        render={() => {
                          return redirectOnUnverified(PreviewLiveVirtual);
                        }}
                      />
                      <Route
                        path="/fixtures/virtual_soccer/pres/"
                        render={() => {
                          return redirectOnUnverified(PreVirtualMatches);
                        }}
                      />
                      <Route
                        path="/fixtures/virtual_soccer/lives/"
                        render={() => {
                          return redirectOnUnverified(LiveVirtualMatches);
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/pres/"
                        render={() => {
                          return redirectOnUnverified(PreMatches);
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/lives"
                        render={() => {
                          return redirectOnUnverified(LiveMatches);
                        }}
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
                        path="/users/password/edit"
                        component={NewPassword}
                      />
                      <Route path="/verify_reset/" component={PasswordCode} />
                      <Route
                        path="/password_reset/"
                        component={PasswordReset}
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
                {!Mobile.isMobile() ? (
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
            Mobile.isMobile()
              ? "footer-container mobile-footer"
              : "footer-container"
          }
        >
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Base;
