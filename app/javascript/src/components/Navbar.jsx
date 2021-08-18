import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";
import UserLogin from "../utilities/UserLogin";
import Login from "./Login";
import SignUp from "./SignUp";

const Navbar = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  const checkUserLoginStatus = () => {
    UserLogin.currentUserLogin()
      .then((data) => {
        if (data.message == "Authorized") {
          if (data.user.verified) {
            setUserSignedIn(true);
          }
          setUserInfo(data.user);
        }
      })
      .catch((error) => console.log(error));
  };

  const logOut = () => {
    let path = "/users/sign_out";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        cogoToast.success(response.data.message, { hideAfter: 5 });
        setTimeout(() => {
          window.location.replace("/");
        }, 1000);
      })
      .catch((error) => {
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 10,
          }
        );
      });
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-md main-menu">
          <div className="container-fluid">
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a href="/">
                      <h4>
                        Skyline<span className="logo-color">Bet</span>
                      </h4>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="search">
                <form className="form-inline mr-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for any event..."
                    id="search"
                    onChange={() => console.log(event.target.value)}
                  />
                  <i className="fa fa-search fa-lg" id="glass"></i>
                </form>
              </div>

              {userSignedIn && (
                <div className="navbar-nav ml-auto">
                  <ul className="navbar-nav mr-auto">
                    <li></li>
                    <li className="nav-item active">
                      <a href="/" className="nav-link active">
                        {currencyFormatter(userInfo.balance)}
                      </a>
                    </li>
                  </ul>
                  <a className="bttn-small btn-fill" id="deposit" href="#">
                    <i className="fas fa-wallet fa-lg"></i> Deposit
                  </a>
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="far fa-user fa-lg text-gray-400"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <a className="dropdown-item words" href="#">
                        <i className="far fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        {userInfo.first_name}
                      </a>
                      <a
                        className="dropdown-item trans"
                        href="<%= transactions_path %>"
                      >
                        <i className="fas fa-landmark fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                        Transactions
                      </a>
                      <a
                        className="dropdown-item trans"
                        href="<%= bet_slips_path %>"
                      >
                        <i className="fas fa-receipt fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                        Tickets
                      </a>
                      <a
                        className="dropdown-item trans"
                        href="<%= transfer_path %>"
                      >
                        <i className="fas fa-money-bill-wave fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                        Withdraw
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item trans" onClick={logOut}>
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
                        Logout
                      </a>
                    </div>
                  </li>
                </div>
              )}

              {/* <% if current_user && current_user.verified? %>
                
                <% else %> */}
              {!userSignedIn && (
                <div className="navbar-nav ml-auto">
                  <SignUp>
                    <Button
                      id="signup"
                      className="bttn-small btn-fill border-transparent"
                    >
                      <i className="fas fa-key fa-fw"></i> Sign Up
                    </Button>
                  </SignUp>
                  <Login>
                    <Button
                      id="login"
                      className="bttn-small btn-fill ml-2 border-transparent"
                    >
                      <i className="fas fa-lock fa-fw"></i> Login
                    </Button>
                  </Login>
                </div>
              )}
              {/* <% end %> */}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("navbar");
  ReactDOM.render(<Navbar />, nav);
});
