import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";
import UserLogin from "../utilities/UserLogin";
import Login from "./Login";
import SignUp from "./SignUp";

const Navbar = (props) => {
  const [userInfo, setUserInfo] = useState([]);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const searchRef = React.createRef();

  useEffect(() => {
    checkUserLoginStatus();
  }, []);

  const checkUserLoginStatus = () => {
    UserLogin.currentUserLogin()
      .then((data) => {
        console.log(data.message);
        if (data.message == "Authorized") {
          if (data.user.verified) {
            setUserSignedIn(true);
          }
          setUserInfo(data.user);
        }
      })
      .catch((error) => console.log(error));
  };

  const performSearch = (e) => {
    e.preventDefault();
    props.history.push({
      pathname: "/fixtures/search",
      search: `?search=${searchRef.current.value}`,
    });
  };

  const logOut = () => {
    let path = "/users/sign_out";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        cogoToast.success(response.data.message, { hideAfter: 5 });
        props.history.push("/");
        setTimeout(() => {
          window.location.reload();
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

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <a className="dropdown-item words">
          <i className="far fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          {userInfo.first_name}
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/transactions/"} className="dropdown-item trans">
          <i className="fas fa-landmark fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
          Transactions
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={"/bet_slips/"} className="dropdown-item trans">
          <i className="fas fa-receipt fa-sm fa-fw mr-2 text-gray-400"></i> Bet
          Tickets
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={"/withdraw/"} className="dropdown-item trans">
          <i className="fas fa-money-bill-wave fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
          Withdraw
        </Link>
      </Menu.Item>
      <div className="dropdown-divider"></div>
      <Menu.Item key="5" onClick={logOut}>
        <a className="dropdown-item trans">
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

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
                    <Link to={"/"}>
                      <h4>
                        Skyline<span className="logo-color">Bet</span>
                      </h4>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="search">
                <form className="form-inline mr-auto" onSubmit={performSearch}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for any event..."
                    id="search"
                    ref={searchRef}
                    // onChange={() => console.log(event.target.value)}
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
                  <Link to={"/deposit/"} className="bttn-small btn-fill">
                    Deposit
                  </Link>
                  <Dropdown
                    overlay={menu}
                    className="nav-link dropdown-toggle"
                    // onVisibleChange={this.handleVisibleChange}
                    // visible={this.state.visible}
                  >
                    <a
                      className="ant-dropdown-link"
                      // onClick={(e) => e.preventDefault()}
                    >
                      <i className="far fa-user fa-lg text-gray-400"></i>{" "}
                      <DownOutlined style={{ color: "#fff" }} />
                    </a>
                  </Dropdown>
                </div>
              )}

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
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default withRouter(Navbar);
