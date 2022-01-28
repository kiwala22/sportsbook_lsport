import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import titleize from "titleize";
import urlFormatter from "../../utilities/urlFormatter";
import Login from "../shared/Login";
import SignUp from "../shared/SignUp";

const Sidebar = (props) => {
  const dispatcher = useDispatch();
  const open = useSelector((state) => state.displaySider);
  const signedIn = useSelector((state) => state.signedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const sportType = useSelector((state) => state.sportType);
  const history = useHistory();

  const menu = (
    <Menu onClick={onClose}>
      <Menu.Item
        key="1"
        icon={
          <i className="fas fa-basketball-ball fa-lg fa-fw mr-2 match-time"></i>
        }
      >
        <span
          onClick={() => {
            history.push("/");
            dispatcher({ type: "onSportChange", payload: "football" });
          }}
        >
          Football
        </span>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<i className="fas fa-futbol fa-lg fa-fw mr-2 match-time"></i>}
      >
        <span
          onClick={() => {
            dispatcher({ type: "onSportChange", payload: "basketball" });
          }}
        >
          Basketball
        </span>
      </Menu.Item>
      <Menu.Item
        key="3"
        icon={
          <i className="fas fa-baseball-ball fa-lg fa-fw mr-2 match-time"></i>
        }
      >
        <span
          onClick={() =>
            dispatcher({ type: "onSportChange", payload: "tennis" })
          }
        >
          Tennis
        </span>
      </Menu.Item>
    </Menu>
  );

  const sidebar = (
    <>
      <div className="col-xl-2 col-lg-2 mt-20 px-lg-1 px-xl-1 px-md-1">
        <aside className="content-sidebar mb-20">
          <Dropdown.Button
            overlay={menu}
            placement="bottomCenter"
            icon={<DownOutlined />}
            className="sport-dropdown"
            trigger={["click"]}
          >
            {/* <h6> */}
            <span style={{ fontSize: 16 }}>{titleize(sportType)}</span>
            {/* </h6> */}
          </Dropdown.Button>
          <hr className="splitter" />
          <ul onClick={onClose}>
            <li>
              <Link className="match-time" to={"/fixtures/basketball/lives/"}>
                <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Live</span>
              </Link>
            </li>
            <li>
              <Link className="match-time" to={"/fixtures/basketball/pres/"}>
                <i className="match-time fas fa-basketball-ball fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Upcoming</span>
              </Link>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Tournaments</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-eu fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Euroleague",
                      location: "International",
                    },
                  }),
                }}
              >
                <span className="show-more">EUROLEAGUE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-eu fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Fiba champions league",
                      location: "International",
                    },
                  }),
                }}
              >
                <span className="show-more">FIBA CHAMPIONS LEAGUE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-us fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "NBA",
                      location: "United States",
                    },
                  }),
                }}
              >
                <span className="show-more">USA NBA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-us fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "NCAA Basketball",
                      location: "United States",
                    },
                  }),
                }}
              >
                <span className="show-more">NCAA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "LNB PRO A",
                      location: "France",
                    },
                  }),
                }}
              >
                <span className="show-more">FRANCE LNB PRO A</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-cn fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "CBA",
                      location: "China",
                    },
                  }),
                }}
              >
                <span className="show-more">CHINA CBA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-es fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Liga ACB Endesa",
                      location: "Spain",
                    },
                  }),
                }}
              >
                <span className="show-more">LIGA ACB</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-pt fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "LPB",
                      location: "Portugal",
                    },
                  }),
                }}
              >
                <span className="show-more">PORTUGAL LPB</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-it fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Serie A",
                      location: "Italy",
                    },
                  }),
                }}
              >
                <span className="show-more">ITALY SERIE A</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-se fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Basketligan",
                      location: "Sweden",
                    },
                  }),
                }}
              >
                <span className="show-more">BASKET LIGAN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-jp fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "B.League - B1",
                      location: "Japan",
                    },
                  }),
                }}
              >
                <span className="show-more">JAPAN B LEAGUE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-kr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "KBL",
                      location: "South Korea",
                    },
                  }),
                }}
              >
                <span className="show-more">SOUTH KOREA KBL</span>
              </Link>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Countries</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-us fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "United States",
                    },
                  }),
                }}
              >
                <span className="show-more">USA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-es fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Spain",
                    },
                  }),
                }}
              >
                <span className="show-more">SPAIN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-pt fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Portugal",
                    },
                  }),
                }}
              >
                <span className="show-more">PORTUGAL</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-se fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Sweden",
                    },
                  }),
                }}
              >
                <span className="show-more">SWEDEN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fi fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Finland",
                    },
                  }),
                }}
              >
                <span className="show-more">FINLAND</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-it fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Italy",
                    },
                  }),
                }}
              >
                <span className="show-more">ITALY</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "France",
                    },
                  }),
                }}
              >
                <span className="show-more">FRANCE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-br fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Brazil",
                    },
                  }),
                }}
              >
                <span className="show-more">BRAZIL</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-au fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Australia",
                    },
                  }),
                }}
              >
                <span className="show-more">AUSTRALIA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-cn fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "China",
                    },
                  }),
                }}
              >
                <span className="show-more">CHINA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-jp fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "Japan",
                    },
                  }),
                }}
              >
                <span className="show-more">JAPAN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-kr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/basketball/pres",
                  search: urlFormatter({
                    q: {
                      location: "South Korea",
                    },
                  }),
                }}
              >
                <span className="show-more">SOUTH KOREA</span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );

  function onClose() {
    if (isMobile) {
      dispatcher({ type: "sider", payload: false });
    }
  }

  return (
    <>
      {isMobile && (
        <>
          <Drawer
            title={
              <Link to={"/"} onClick={onClose}>
                <h4>
                  Sports<span className="logo-color">Book</span>
                </h4>
              </Link>
            }
            placement="left"
            closable={true}
            onClose={() => onClose()}
            visible={open}
            key="left"
            className="drawer-bg"
          >
            {!signedIn && (
              <span>
                <SignUp>
                  <Button
                    id="signup"
                    className="bttn-small btn-fill border-transparent register-btn"
                  >
                    <i className="fas fa-key fa-fw"></i> Register
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
              </span>
            )}
            {sidebar}
          </Drawer>
        </>
      )}
      {!isMobile && sidebar}
    </>
  );
};

export default Sidebar;
