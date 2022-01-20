import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import titleize from "titleize";
import Login from "../Login";
import SignUp from "../SignUp";

const Sidebar = (props) => {
  const dispatcher = useDispatch();
  const open = useSelector((state) => state.displaySider);
  const signedIn = useSelector((state) => state.signedIn);
  const isMobile = useSelector((state) => state.isMobile);
  const sportType = useSelector((state) => state.sportType);

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={
          <i className="fas fa-basketball-ball fa-lg fa-fw mr-2 match-time"></i>
        }
      >
        <span
          onClick={() =>
            dispatcher({ type: "onSportChange", payload: "football" })
          }
        >
          Football
        </span>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<i className="fas fa-futbol fa-lg fa-fw mr-2 match-time"></i>}
      >
        <span
          onClick={() =>
            dispatcher({ type: "onSportChange", payload: "basketball" })
          }
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
        <aside className="content-sidebar mb-20" onClick={onClose}>
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
          <ul>
            <li>
              <Link className="match-time" to={"/fixtures/soccer/lives/"}>
                <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Live</span>
              </Link>
            </li>
            <li>
              <Link className="match-time" to={"/fixtures/soccer/pres/"}>
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
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=UEFA+Champions+League`,
                }}
              >
                <span className="show-more">EUROLEAGUE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-eu fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=UEFA+Europa+League`,
                }}
              >
                <span className="show-more">FIBA CHAMPIONS LEAGUE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-us fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Premier+League&location=England`,
                }}
              >
                <span className="show-more">USA NBA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-us fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Serie+A&location=Italy`,
                }}
              >
                <span className="show-more">NCAA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=LaLiga&location=Spain`,
                }}
              >
                <span className="show-more">FRANCE PROB LNB</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-cn fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Bundesliga&location=Germany`,
                }}
              >
                <span className="show-more">CHINA CBA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-es fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Ligue+1&location=France`,
                }}
              >
                <span className="show-more">SPAIN ADECCO ORO</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-pt fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Primeira+Liga`,
                }}
              >
                <span className="show-more">PORTUGAL LPB</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-it fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=A-league`,
                }}
              >
                <span className="show-more">ITALY LEGA 1 BASKET</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-se fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=K-league`,
                }}
              >
                <span className="show-more">SWEDEN LIGAN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-jp fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=J-league`,
                }}
              >
                <span className="show-more">JAPAN B LEAGUE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-kr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Série+A&location=Brazil`,
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
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=England`,
                }}
              >
                <span className="show-more">USA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-es fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Spain`,
                }}
              >
                <span className="show-more">SPAIN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-se fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Germany`,
                }}
              >
                <span className="show-more">SWEDEN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fi fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Germany`,
                }}
              >
                <span className="show-more">FINLAND</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-it fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Italy`,
                }}
              >
                <span className="show-more">ITALY</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=France`,
                }}
              >
                <span className="show-more">FRANCE</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-tw fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Brazil`,
                }}
              >
                <span className="show-more">TAIWAN</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-au fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Australia`,
                }}
              >
                <span className="show-more">AUSTRALIA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-pt fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=China`,
                }}
              >
                <span className="show-more">PORTUGAL</span>
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
