import { Button, Drawer } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Mobile from "../utilities/Mobile";
import Login from "./Login";
import SignUp from "./SignUp";

const Sidebar = (props) => {
  const dispatcher = useDispatch();
  const open = useSelector((state) => state.displaySider);
  const signedIn = useSelector((state) => state.signedIn);

  const sidebar = (
    <>
      <div className="col-xl-2 col-lg-2 mt-20 px-lg-1 px-xl-1 px-md-1">
        <aside className="content-sidebar mb-20" onClick={onClose}>
          <Link to={"/"}>
            <h3>Sports</h3>
          </Link>
          <ul>
            <li>
              <Link className="match-time" to={"/fixtures/soccer/lives/"}>
                <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Live Games</span>
              </Link>
            </li>
            <li>
              <Link className="match-time" to={"/fixtures/soccer/pres/"}>
                <i className="match-time far fa-futbol fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Soccer</span>
              </Link>
            </li>
            <li>
              <Link
                className="match-time"
                to={"/fixtures/virtual_soccer/pres/"}
              >
                <i className="match-time fas fa-trophy fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Virtual Soccer</span>
              </Link>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Leagues</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=UEFA+Champions+League`,
                }}
              >
                <span className="show-more">UEFA Champions League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=UEFA+Europa+League`,
                }}
              >
                <span className="show-more">UEFA Europa League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Premier+League&location=England`,
                }}
              >
                <span className="show-more">English Premier League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Serie+A&location=Italy`,
                }}
              >
                <span className="show-more">Serie A</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=LaLiga&location=Spain`,
                }}
              >
                <span className="show-more">La Liga</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Bundesliga&location=Germany`,
                }}
              >
                <span className="show-more">Bundesliga</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Ligue+1&location=France`,
                }}
              >
                <span className="show-more">French Ligue 1</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Primeira+Liga`,
                }}
              >
                <span className="show-more">Portuguese Liga</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=A-league`,
                }}
              >
                <span className="show-more">A-League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=K-league`,
                }}
              >
                <span className="show-more">K-League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=J-league`,
                }}
              >
                <span className="show-more">J-League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Série+A&location=Brazil`,
                }}
              >
                <span className="show-more">Brazil Serie A</span>
              </Link>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Countries</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-gb fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=England`,
                }}
              >
                <span className="show-more">England</span>
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
                <span className="show-more">Spain</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-de fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Germany`,
                }}
              >
                <span className="show-more">Germany</span>
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
                <span className="show-more">Italy</span>
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
                <span className="show-more">France</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-br fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=Brazil`,
                }}
              >
                <span className="show-more">Brazil</span>
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
                <span className="show-more">Australia</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-cn fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=China`,
                }}
              >
                <span className="show-more">China</span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );

  function onClose() {
    if (Mobile.isMobile()) {
      dispatcher({ type: "sider", payload: false });
    }
  }

  return (
    <>
      {Mobile.isMobile() && (
        <>
          <Drawer
            title={
              <Link to={"/"} onClick={onClose}>
                <h4>
                  Skyline<span className="logo-color">Bet</span>
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
      {!Mobile.isMobile() && sidebar}
    </>
  );
};

export default Sidebar;
