import cogoToast from "cogo-toast";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import Bets from "../shared/Bets";
import BetSlip from "../shared/BetSlip";
import Deposit from "../shared/Deposit";
import Faqs from "../shared/Faqs";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import NewPassword from "../shared/NewPassword";
import PasswordCode from "../shared/PasswordCode";
import PasswordReset from "../shared/PasswordReset";
import Privacy from "../shared/Privacy";
import Rules from "../shared/Rules";
import SideBanner from "../shared/SideBanner";
import Support from "../shared/Support";
import Terms from "../shared/Terms";
import Transactions from "../shared/Transactions";
import Verify from "../shared/Verify";
import Withdraw from "../shared/Withdraw";
import Home from "./Home";
import LiveMatches from "./LiveMatches";
import LiveVirtualMatches from "./LiveVirtualMatches";
import PreMatches from "./PreMatches";
import PreviewLive from "./PreviewLive";
import PreviewLiveVirtual from "./PreviewLiveVirtual";
import PreviewPre from "./PreviewPre";
import PreviewPreVirtual from "./PreviewPreVirtual";
import PreVirtualMatches from "./PreVirtualMatches";
import Search from "./Search";
import Sidebar from "./Sidebar";

const Base = (props) => {
  const { signedIn, verified, isMobile } = useSelector((state) => state);
  const dispatcher = useDispatch();
  const history = useHistory();
  const soccerPath = "/fixtures/soccer";
  const virtualPath = "/fixtures/virtual_soccer";

  useEffect(() => {
    return () => {
      if (/basketball/g.test(history.location.pathname)) {
        dispatcher({ type: "onSportChange", payload: "basketball" });
      }
      if (history.action === "POP") {
        history.replace(history.location.pathname, "/");
      }
    };
  }, [history.location, history.action]);

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
                        path={`/${soccerPath.split("/")[1]}/search/`}
                        render={() => {
                          return redirectOnUnverified(Search);
                        }}
                      />
                      <Route
                        path={`${soccerPath}/pre/`}
                        render={() => {
                          return redirectOnUnverified(PreviewPre);
                        }}
                      />
                      <Route
                        path={`${virtualPath}/pre/`}
                        render={() => {
                          return redirectOnUnverified(PreviewPreVirtual);
                        }}
                      />
                      <Route
                        path={`${soccerPath}/live/`}
                        render={() => {
                          return redirectOnUnverified(PreviewLive);
                        }}
                      />
                      <Route
                        path={`${virtualPath}/live/`}
                        render={() => {
                          return redirectOnUnverified(PreviewLiveVirtual);
                        }}
                      />
                      <Route
                        path={`${virtualPath}/pres/`}
                        render={() => {
                          return redirectOnUnverified(PreVirtualMatches);
                        }}
                      />
                      <Route
                        path={`${virtualPath}/lives/`}
                        render={() => {
                          return redirectOnUnverified(LiveVirtualMatches);
                        }}
                      />
                      <Route
                        path={`${soccerPath}/pres/`}
                        render={() => {
                          return redirectOnUnverified(PreMatches);
                        }}
                      />
                      <Route
                        path={`${soccerPath}/lives/`}
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
                        // exact
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

export default withRouter(Base);
