import { DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Dropdown, Menu } from "antd";
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
              <Link className="match-time" to={"/"}>
                <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Live</span>
              </Link>
            </li>
            <li>
              <Link className="match-time" to={"/fixtures/tennis/pres/"}>
                <i className="match-time fas fa-baseball-ball fa-lg fa-fw mr-2 "></i>
                <span className="show-more">Upcoming</span>
              </Link>
            </li>
          </ul>
          <h3>Tournaments</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-eu fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "International",
                    },
                  }),
                }}
              >
                <span className="show-more">INTERNATIONAL</span>
              </Link>
            </li>
          </ul>
          <h3>Countries</h3>
          <ul onClick={onClose}>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-us fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
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
                  pathname: "/fixtures/tennis/pres",
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
              <i className="flag-icon flag-icon-gb-eng fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "England",
                    },
                  }),
                }}
              >
                <span className="show-more">ENGLAND</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-nl fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "Netherlands",
                    },
                  }),
                }}
              >
                <span className="show-more">NETHERLANDS</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-ar fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "Argentina",
                    },
                  }),
                }}
              >
                <span className="show-more">ARGENTINA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-ru fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "Russia",
                    },
                  }),
                }}
              >
                <span className="show-more">RUSSIA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
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
              <i className="flag-icon flag-icon-mx fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "Mexico",
                    },
                  }),
                }}
              >
                <span className="show-more">MEXICO</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-au fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
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
              <i className="flag-icon flag-icon-eg fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "Egypt",
                    },
                  }),
                }}
              >
                <span className="show-more">EGYPT</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-tn fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "Tunisia",
                    },
                  }),
                }}
              >
                <span className="show-more">TUNISIA</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-tr fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "Turkey",
                    },
                  }),
                }}
              >
                <span className="show-more">TURKEY</span>
              </Link>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-in fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/tennis/pres",
                  search: urlFormatter({
                    q: {
                      location: "India",
                    },
                  }),
                }}
              >
                <span className="show-more">INDIA</span>
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
