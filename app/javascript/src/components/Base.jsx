import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Requests from "../utilities/Requests";
import Bets from "./Bets";
//{Link}
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
import PreviewPre from "./PreviewPre";
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
  const [currentUser, setCurrentUser] = useState("");
  const [verified, setVerified] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    checkUserVerification();
  }, []);

  function checkUserVerification() {
    let path = "/api/v1/verification";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        if (response.data.message == "Verified") {
          setVerified(true);
          setSignedIn(true);
        } else if (
          response.data.message == "Please verify your phone number first."
        ) {
          setSignedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }

  function redirectOnUnverified(variable, component) {
    var Component = component;
    if (variable) {
      cogoToast.error("Verify Phone Number First.", 5);
    }
    return variable ? <Redirect to="/new_verify/" /> : <Component />;
  }

  return (
    <>
      <div className="wrapper root-app">
        {/* top navbar */}
        <header className="header-area gradient-bg heading">
          {/* <%= render partial: "layouts/partials/topnavbar" %> */}
          <Navbar />
        </header>
        {/* Main section */}
        <section className="section-container topping">
          {/* Page content */}
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                {/* <%= render partial: "layouts/partials/sidebar" %> */}
                <Sidebar />
                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 mt-20 px-lg-1 px-xl-1 px-md-1">
                  <div>
                    {/* <%= render partial: "layouts/partials/flash" %> */}
                    {/* <%= yield %> */}
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
                        // component={Search}
                        render={() => {
                          let check = signedIn && !verified;
                          if (check) {
                            cogoToast.error("Verify Phone Number First.", 5);
                          }
                          return check ? (
                            <Redirect to="/new_verify/" />
                          ) : (
                            <Search />
                          );
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/pre"
                        // component={PreviewPre}
                        render={() => {
                          let check = signedIn && !verified;
                          if (check) {
                            cogoToast.error("Verify Phone Number First.", 5);
                          }
                          return check ? (
                            <Redirect to="/new_verify/" />
                          ) : (
                            <PreviewPre />
                          );
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/live"
                        // component={PreviewLive}
                        render={() => {
                          let check = signedIn && !verified;
                          if (check) {
                            cogoToast.error("Verify Phone Number First.", 5);
                          }
                          return check ? (
                            <Redirect to="/new_verify/" />
                          ) : (
                            <PreviewLive />
                          );
                        }}
                      />
                      <Route
                        path="/fixtures/virtual_soccer/pres/"
                        // component={PreVirtualMatches}
                        render={() => {
                          let check = signedIn && !verified;
                          redirectOnUnverified(check, "PreVirtualMatches");
                        }}
                      />
                      <Route
                        path="/fixtures/virtual_soccer/lives/"
                        // component={LiveVirtualMatches}
                        render={() => {
                          let check = signedIn && !verified;
                          if (check) {
                            cogoToast.error("Verify Phone Number First.", 5);
                          }
                          return check ? (
                            <Redirect to="/new_verify/" />
                          ) : (
                            <LiveVirtualMatches />
                          );
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/pres/"
                        // component={PreMatches}
                        render={() => {
                          let check = signedIn && !verified;
                          if (check) {
                            cogoToast.error("Verify Phone Number First.", 5);
                          }
                          return check ? (
                            <Redirect to="/new_verify/" />
                          ) : (
                            <PreMatches />
                          );
                        }}
                      />
                      <Route
                        path="/fixtures/soccer/lives"
                        // component={LiveMatches}
                        render={() => {
                          let check = signedIn && !verified;
                          if (check) {
                            cogoToast.error("Verify Phone Number First.", 5);
                          }
                          return check ? (
                            <Redirect to="/new_verify/" />
                          ) : (
                            <LiveMatches />
                          );
                        }}
                      />
                      <Route
                        path="/new_verify/"
                        component={Verify}
                        // render={() => {
                        //   let check = !signedIn;
                        //   return check ? <Redirect to="/" /> : <Verify />;
                        // }}
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
                          let check = signedIn && !verified;
                          if (check) {
                            cogoToast.error("Verify Phone Number First.", 5);
                          }
                          return check ? (
                            <Redirect to="/new_verify/" />
                          ) : (
                            <Home />
                          );
                        }}
                      />
                    </Switch>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 hidden-sm-down mt-20 px-lg-1 px-xl-1 px-md-1">
                  {/* {props.location.pathname !== "/new_verify" && <BetSlip />} */}
                  <BetSlip />
                  <br />
                  <SideBanner />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Page footer */}
        <footer className="footer-container">
          {/* <%= render partial: "layouts/partials/footer" %> */}
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Base;
