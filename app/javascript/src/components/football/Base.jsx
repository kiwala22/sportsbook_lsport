import cogoToast from "cogo-toast";
import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import lazyComponent from "../../utilities/lazy";
const Bets = lazy(() => import("../shared/Bets"));
import BetSlip from "../shared/BetSlip";
const Deposit = lazy(() => import("../shared/Deposit"));
const Faqs = lazy(() => import("../shared/Faqs"));
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
const NewPassword = lazy(() => import("../shared/NewPassword"));
const PasswordCode = lazy(() => import("../shared/PasswordCode"));
const PasswordReset = lazy(() => import("../shared/PasswordReset"));
const Privacy = lazy(() => import("../shared/Privacy"));
const Rules = lazy(() => import("../shared/Rules"));
import SideBanner from "../shared/SideBanner";
const Support = lazy(() => import("../shared/Support"));
const Terms = lazy(() => import("../shared/Terms"));
const Transactions = lazy(() => import("../shared/Transactions"));
// const Verify = lazy(() => import("../shared/Verify"));
import Verify from "../shared/Verify";
const Withdraw = lazy(() => import("../shared/Withdraw"));
const Home = lazy(() => import("./Home"));
const LiveMatches = lazy(() => import("./LiveMatches"));
const LiveVirtualMatches = lazy(() => import("./LiveVirtualMatches"));
const PreMatches = lazy(() => import("./PreMatches"));
const PreviewLive = lazy(() => import("./PreviewLive"));
const PreviewLiveVirtual = lazy(() => import("./PreviewLiveVirtual"));
const PreviewPre = lazy(() => import("./PreviewPre"));
const PreviewPreVirtual = lazy(() => import("./PreviewPreVirtual"));
const PreVirtualMatches = lazy(() => import("./PreVirtualMatches"));
const Search = lazy(() => import("./Search"));
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
      if (/tennis/g.test(history.location.pathname)) {
        dispatcher({ type: "onSportChange", payload: "tennis" });
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
        <section
          className={
            isMobile && signedIn
              ? "section-container topping-mobile-float"
              : isMobile && !signedIn
              ? "section-container topping-mobile-float"
              : "section-container topping"
          }
        >
          <div className="content-wrapper mobile-signup py-0">
            <div className="container-fluid">
              <div className="row">
                <Sidebar />
                <div
                  className={
                    isMobile
                      ? "col-sm-12 px-lg-1 px-xl-1 px-md-1"
                      : "col-xl-7 col-lg-7 col-md-7 col-sm-12 px-lg-1 px-xl-1 px-md-1"
                  }
                >
                  <div>
                    <Switch>
                      <Route
                        path="/bet_slips/"
                        component={lazyComponent(Bets)}
                      />
                      <Route
                        path="/transactions/"
                        component={lazyComponent(Transactions)}
                      />
                      <Route
                        path="/deposit/"
                        component={lazyComponent(Deposit)}
                      />
                      <Route
                        path="/withdraw/"
                        component={lazyComponent(Withdraw)}
                      />
                      <Route path="/about/" component={lazyComponent(Faqs)} />
                      <Route path="/rules/" component={lazyComponent(Rules)} />
                      <Route
                        path="/responsible_gambling/"
                        component={lazyComponent(Privacy)}
                      />
                      <Route path="/terms/" component={lazyComponent(Terms)} />
                      <Route
                        path="/contacts/"
                        component={lazyComponent(Support)}
                      />
                      <Route
                        path={`/${soccerPath.split("/")[1]}/search/`}
                        render={() => {
                          return redirectOnUnverified(lazyComponent(Search));
                        }}
                      />
                      <Route
                        path={`${soccerPath}/pre/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(PreviewPre)
                          );
                        }}
                      />
                      <Route
                        path={`${virtualPath}/pre/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(PreviewPreVirtual)
                          );
                        }}
                      />
                      <Route
                        path={`${soccerPath}/live/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(PreviewLive)
                          );
                        }}
                      />
                      <Route
                        path={`${virtualPath}/live/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(PreviewLiveVirtual)
                          );
                        }}
                      />
                      <Route
                        path={`${virtualPath}/pres/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(PreVirtualMatches)
                          );
                        }}
                      />
                      <Route
                        path={`${virtualPath}/lives/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(LiveVirtualMatches)
                          );
                        }}
                      />
                      <Route
                        path={`${soccerPath}/pres/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(PreMatches)
                          );
                        }}
                      />
                      <Route
                        path={`${soccerPath}/lives/`}
                        render={() => {
                          return redirectOnUnverified(
                            lazyComponent(LiveMatches)
                          );
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
                        component={lazyComponent(NewPassword)}
                      />
                      <Route
                        path="/verify_reset/"
                        component={lazyComponent(PasswordCode)}
                      />
                      <Route
                        path="/password_reset/"
                        component={lazyComponent(PasswordReset)}
                      />
                      <Route
                        // exact
                        path="/"
                        render={() => {
                          return redirectOnUnverified(lazyComponent(Home));
                        }}
                      />
                    </Switch>
                  </div>
                </div>
                {!isMobile ? (
                  <div className="col-xl-3 col-lg-3 col-md-3 hidden-sm-down pl-1 pr-4 secondary-bb-color">
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
