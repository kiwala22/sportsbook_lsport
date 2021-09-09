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
import Mobile from "../utilities/Mobile";
import Requests from "../utilities/Requests";
import Login from "./Login";
import SignUp from "./SignUp";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const { signedIn, verified, userInfo } = useSelector((state) => state);
  const [showSearch, setShowSearch] = useState(false);
  const slipGames = useSelector((state) => state.games.length);

  const performSearch = (values) => {
    setShowSearch(false);
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
    <Menu>
      <Menu.Item key="1">
        <a>
          <UserOutlined className="mr-2 text-gray-400" />
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
          <LogoutOutlined className="mr-2 text-gray-400" />
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  const mobileMenu = (
    <Menu>
      <Menu.Item key="1">
        <a>
          <UserOutlined className="mr-2 text-gray-400" />
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
          <LogoutOutlined className="mr-2 text-gray-400" />
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

  return (
    <>
      {!Mobile.isMobile() && (
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
                        <DownOutlined style={{ color: "#fff" }} />
                      </span>
                    </Dropdown>
                  </div>
                )}

                {!signedIn && (
                  <div className="navbar-nav ml-auto">
                    <SignUp>
                      <Button
                        id="signup"
                        className="bttn-small btn-fill border-transparent"
                        style={{ background: "#f6ae2d", color: "#fff" }}
                      >
                        <i className="fas fa-key fa-fw"></i> Sign Up
                      </Button>
                    </SignUp>
                    <Login>
                      <Button
                        id="login"
                        className="bttn-small btn-fill ml-2 border-transparent"
                        style={{ background: "#f6ae2d", color: "#fff" }}
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
                      className="bttn-small btn-fill border-transparent"
                      style={{ background: "#f6ae2d", color: "#fff" }}
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
      {Mobile.isMobile() && (
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
                      showZero
                      className="mr-3"
                      color="#F6AE2D"
                    >
                      <FileDoneOutlined
                        style={{ fontSize: "18px", color: "#fff" }}
                      />
                    </Badge>,
                    <Dropdown
                      overlay={mobileMenu}
                      className="dropdown-toggle"
                      style={{ padding: ".55rem" }}
                      trigger={["click"]}
                      arrow={true}
                    >
                      <span className="ant-dropdown-link">
                        <UserOutlined />{" "}
                        <DownOutlined style={{ color: "#fff" }} />
                      </span>
                    </Dropdown>,
                  ]
                : signedIn && !verified
                ? [
                    <div className="navbar-nav ml-auto">
                      <Button
                        id="verify-logout"
                        className="bttn-small btn-fill border-transparent"
                        style={{ background: "#f6ae2d", color: "#fff" }}
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
                      showZero
                      className="mr-3"
                      color="#F6AE2D"
                    >
                      <FileDoneOutlined
                        style={{ fontSize: "18px", color: "#fff" }}
                      />
                    </Badge>,
                  ]
            }
          >
            <Link to={"/"} className="ml-auto">
              <h4>
                Skyline<span className="logo-color">Bet</span>
              </h4>
            </Link>
          </NavBar>
          {showSearch && (
            <div style={{ width: "100%", paddingLeft: 15, paddingRight: 15 }}>
              {search}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default withRouter(Navbar);
