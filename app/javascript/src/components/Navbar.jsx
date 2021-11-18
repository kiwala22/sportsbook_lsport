import {
  CreditCardOutlined,
  DollarOutlined,
  DownOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Button, Dropdown, Form, Input, Menu } from "antd";
import { Icon, NavBar } from "antd-mobile";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import currencyFormatter from "../utilities/CurrencyFormatter";
import Requests from "../utilities/Requests";
import Login from "./Login";
import SignUp from "./SignUp";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const { signedIn, verified, userInfo, isMobile } = useSelector(
    (state) => state
  );
  const [showSearch, setShowSearch] = useState(false);
  const slipGames = useSelector((state) => {
    return state.games.filter((el) => {
      return el.status === "Active";
    }).length;
  });

  const performSearch = (values) => {
    setShowSearch(false);
    formRef.current.resetFields();
    props.history.push({
      pathname: "/fixtures/search",
      search: `?search=${values.search}`,
    });
  };

  const logOut = () => {
    let path = "/users/sign_out";
    let values = {};
    Requests.isGetRequest(path, values)
      .then((response) => {
        cogoToast.success(response.data.message, { hideAfter: 5 });
        dispatch({ type: "notSignedInNotVerify", payload: false });
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
    <Menu className="custom-dropdown-list">
      <Menu.Item key="1">
        <a>
          <UserOutlined className="custom-li-margin text-gray-400" />
          {userInfo.first_name}
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={"/transactions/"}>
          <i className="fas fa-landmark fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
          Transactions
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={"/bet_slips/"}>
          <i className="fas fa-receipt fa-sm fa-fw mr-2 text-gray-400"></i> Bet
          Tickets
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={"/withdraw/"}>
          <i className="fas fa-money-bill-wave fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
          Withdraw
        </Link>
      </Menu.Item>
      <div className="dropdown-divider"></div>
      <Menu.Item key="5" onClick={logOut}>
        <a>
          <LogoutOutlined className="custom-li-margin text-gray-400" />
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const mobileMenu = (
    <Menu className="custom-dropdown-list">
      <Menu.Item key="1">
        <a>
          <UserOutlined className="custom-li-margin text-gray-400" />
          {userInfo.first_name}
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a>
          <DollarOutlined className="mr-2 text-gray-400" />{" "}
          {currencyFormatter(userInfo.balance)}
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={"/deposit/"}>
          <CreditCardOutlined className="mr-2 text-gray-400" /> Deposit
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to={"/transactions/"}>
          <i className="fas fa-landmark fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
          Transactions
        </Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to={"/bet_slips/"}>
          <i className="fas fa-receipt fa-sm fa-fw mr-2 text-gray-400"></i> Bet
          Tickets
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to={"/withdraw/"}>
          <i className="fas fa-money-bill-wave fa-sm fa-fw mr-2 text-gray-400"></i>{" "}
          Withdraw
        </Link>
      </Menu.Item>
      <div className="dropdown-divider"></div>
      <Menu.Item key="7" onClick={logOut}>
        <a>
          <LogoutOutlined className="custom-li-margin text-gray-400" />
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const search = (
    <Form ref={formRef} layout="vertical" onFinish={performSearch}>
      <Form.Item
        name="search"
        rules={[
          {
            required: true,
            message: "Please provide a search value.",
          },
        ]}
      >
        <Input
          className="form-control"
          placeholder="Search for any event..."
          suffix={<i className="fa fa-search fa-lg" id="glass"></i>}
        />
      </Form.Item>
    </Form>
  );

  function showMobileBetSlip() {
    dispatch({ type: "mobileBetSlip", payload: true });
  }

  return (
    <>
      {!isMobile && (
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
                <div className="search">{search}</div>
                {signedIn && verified && (
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
                      trigger={["click"]}
                      arrow={true}
                    >
                      <span className="ant-dropdown-link">
                        <i className="far fa-user fa-lg text-gray-400"></i>{" "}
                        <DownOutlined className="c-white" />
                      </span>
                    </Dropdown>
                  </div>
                )}

                {!signedIn && (
                  <div className="navbar-nav ml-auto">
                    <SignUp>
                      <Button
                        id="signup"
                        className="bttn-small btn-fill border-transparent register-btn"
                      >
                        <i className="fas fa-key fa-fw"></i> Sign Up
                      </Button>
                    </SignUp>
                    <Login>
                      <Button
                        id="login"
                        className="bttn-small btn-fill ml-2 border-transparent register-btn"
                      >
                        <i className="fas fa-lock fa-fw"></i> Login
                      </Button>
                    </Login>
                  </div>
                )}
                {signedIn && !verified && (
                  <div className="navbar-nav ml-auto">
                    <Button
                      id="verify-logout"
                      className="bttn-small btn-fill border-transparent register-btn"
                      onClick={logOut}
                    >
                      <i className="fas fa-key fa-fw"></i> Log Out
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
      {isMobile && (
        <>
          <NavBar
            mode="dark"
            onLeftClick={() => {
              dispatch({ type: "sider", payload: true });
            }}
            leftContent={<MenuOutlined />}
            rightContent={
              signedIn && verified
                ? [
                    <Icon
                      key="0"
                      type="search"
                      size="md"
                      className="mr-3"
                      onClick={() => setShowSearch(!showSearch)}
                    />,
                    <Badge
                      count={slipGames}
                      key="1"
                      showZero
                      className="mr-3"
                      color="#F6AE2D"
                      onClick={showMobileBetSlip}
                    >
                      <FileDoneOutlined className="font-18 c-white" />
                    </Badge>,
                    <Dropdown
                      overlay={mobileMenu}
                      key="3"
                      className="dropdown-toggle"
                      trigger={["click"]}
                      arrow={true}
                    >
                      <span className="ant-dropdown-link">
                        <UserOutlined /> <DownOutlined className="c-white" />
                      </span>
                    </Dropdown>,
                  ]
                : signedIn && !verified
                ? [
                    <div className="navbar-nav ml-auto">
                      <Button
                        id="verify-logout"
                        className="bttn-small btn-fill border-transparent register-btn"
                        onClick={logOut}
                      >
                        <i className="fas fa-key fa-fw"></i> Log Out
                      </Button>
                    </div>,
                  ]
                : [
                    <Icon
                      key="0"
                      type="search"
                      size="md"
                      className="mr-4"
                      onClick={() => setShowSearch(!showSearch)}
                    />,
                    <Badge
                      count={slipGames}
                      key="1"
                      showZero
                      className="mr-3"
                      color="#F6AE2D"
                      onClick={showMobileBetSlip}
                    >
                      <FileDoneOutlined className="font-18 c-white" />
                    </Badge>,
                  ]
            }
          >
            <Link to={"/"}>
              <h4>
                Skyline<span className="logo-color">Bet</span>
              </h4>
            </Link>
          </NavBar>
          {showSearch && <div className="mobile-search">{search}</div>}
        </>
      )}
    </>
  );
};

export default withRouter(Navbar);
