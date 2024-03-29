import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import Drawer from "antd/lib/drawer";
import Dropdown from "antd/lib/dropdown";
import Menu from "antd/lib/menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import titleize from "titleize";
import MainLogo from "../../Images/logo.webp";
import urlFormatter from "../../utilities/urlFormatter";

const Sidebar = (props) => {
  const dispatcher = useDispatch();
  const open = useSelector((state) => state.displaySider);
  const isMobile = useSelector((state) => state.isMobile);
  const sportType = useSelector((state) => state.sportType);
  const history = useHistory();

  const menu = (
    <Menu onClick={onClose}>
      <Menu.Item
        key="1"
        icon={<i className="fas fa-futbol fa-lg fa-fw mr-2 match-time"></i>}
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
        icon={
          <i className="fas fa-basketball-ball fa-lg fa-fw mr-2 match-time"></i>
        }
      >
        <span
          onClick={() => {
            history.push("/");
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
          onClick={() => {
            history.push("/");
            dispatcher({ type: "onSportChange", payload: "tennis" });
          }}
        >
          Tennis
        </span>
      </Menu.Item>
    </Menu>
  );

  const sidebar = (
    <>
      <div className="col-xl-2 col-lg-2 px-lg-1 px-xl-1 px-md-1 secondary-bb-color">
        <aside className="content-sidebar secondary-bb-color">
          <Dropdown.Button
            overlay={menu}
            placement="bottom"
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
              <Link className="match-time" to={"/fixtures/soccer/lives/"}>
                <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Live</span>
              </Link>
            </li>
            <li>
              <Link className="match-time" to={"/fixtures/soccer/pres/"}>
                <i className="match-time far fa-futbol fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Upcoming</span>
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
          {/* </aside>
        <aside className="content-sidebar mb-20"> */}
          <h3>Leagues</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-eu fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "UEFA Champions League",
                    },
                  }),
                }}
              >
                <span className="show-more">UEFA Champions League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-eu fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "UEFA Europa League",
                    },
                  }),
                }}
              >
                <span className="show-more">UEFA Europa League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-gb-eng fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Premier League",
                      location: "England",
                    },
                  }),
                }}
              >
                <span className="show-more">English Premier League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-it fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Serie A",
                      location: "Italy",
                    },
                  }),
                }}
              >
                <span className="show-more">Serie A</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-es fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "LaLiga",
                      location: "Spain",
                    },
                  }),
                }}
              >
                <span className="show-more">La Liga</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-de fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Bundesliga",
                      location: "Germany",
                    },
                  }),
                }}
              >
                <span className="show-more">Bundesliga</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Ligue 1",
                      location: "France",
                    },
                  }),
                }}
              >
                <span className="show-more">France Ligue 1</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-pt fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Primeira Liga",
                    },
                  }),
                }}
              >
                <span className="show-more">Portuguese Liga</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-au fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "A-league",
                    },
                  }),
                }}
              >
                <span className="show-more">A-League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-sk fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "K-league",
                    },
                  }),
                }}
              >
                <span className="show-more">K-League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-jp fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "J-league",
                    },
                  }),
                }}
              >
                <span className="show-more">J-League</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-br fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      league_name: "Série A",
                      location: "Brazil",
                    },
                  }),
                }}
              >
                <span className="show-more">Brazil Serie A</span>
              </Link>
            </li>
          </ul>
          {/* </aside>
        <aside className="content-sidebar mb-20"> */}
          <h3>Countries</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-gb-eng fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: urlFormatter({
                    q: {
                      location: "England",
                    },
                  }),
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
                  search: urlFormatter({
                    q: {
                      location: "Spain",
                    },
                  }),
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
                  search: urlFormatter({
                    q: {
                      location: "Germany",
                    },
                  }),
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
                  search: urlFormatter({
                    q: {
                      location: "Italy",
                    },
                  }),
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
                  search: urlFormatter({
                    q: {
                      location: "France",
                    },
                  }),
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
                  search: urlFormatter({
                    q: {
                      location: "Brazil",
                    },
                  }),
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
                  search: urlFormatter({
                    q: {
                      location: "Australia",
                    },
                  }),
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
                  search: urlFormatter({
                    q: {
                      location: "China",
                    },
                  }),
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
    if (isMobile) {
      dispatcher({ type: "sider", payload: false });
    }
  }

  return (
    <>
      {isMobile && (
        <>
          <Drawer
            title={<img src={MainLogo} className="heading-mobile-logo" />}
            placement="left"
            closable={true}
            onClose={() => onClose()}
            visible={open}
            key="left"
            className="drawer-bg"
          >
            {sidebar}
          </Drawer>
        </>
      )}
      {!isMobile && sidebar}
    </>
  );
};

export default Sidebar;
