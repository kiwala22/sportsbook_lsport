import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <>
      <div className="col-xl-2 col-lg-2 mt-20 px-lg-1 px-xl-1 px-md-1">
        <aside className="content-sidebar mb-20">
          <Link to={"/"}>
            <h3>Sports</h3>
          </Link>
          <ul>
            <li>
              <Link
                className="match-time show-more"
                to={"/fixtures/soccer/lives/"}
              >
                <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2 "></i>
                Live Games
              </Link>
            </li>
            <li>
              <Link
                className="match-time show-more"
                to={"/fixtures/soccer/pre/"}
              >
                <i className="match-time far fa-futbol fa-lg fa-fw mr-2 "></i>
                Soccer
              </Link>
            </li>
            <li>
              <a href="#">
                {" "}
                <i className="match-time fas fa-trophy fa-lg fa-fw mr-2 "></i>
                Virtual Soccer
              </a>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Leagues</h3>
          <ul>
            <li className="text-gray-400">
              <a href="#">UEFA Champions League</a>
            </li>
            <li className="text-gray-400">
              <a href="#">UEFA Europa League</a>
            </li>
            <li className="text-gray-400">
              <a href="#">English Premier League</a>
            </li>
            <li className="text-gray-400">
              <a href="#">Serie A</a>
            </li>
            <li className="text-gray-400">
              <a href="#">La Liga</a>
            </li>
            <li className="text-gray-400">
              <a href="#">Bundesliga</a>
            </li>
            <li className="text-gray-400">
              <a href="#">French Ligue 1</a>
            </li>
            <li className="text-gray-400">
              <a href="#">Portuguese Liga</a>
            </li>
            <li className="text-gray-400">
              <a href="#">A-League</a>
            </li>
            <li className="text-gray-400">
              <a href="#">K-League</a>
            </li>
            <li className="text-gray-400">
              <a href="#">J-League</a>
            </li>
            <li className="text-gray-400">
              <a href="#">Brazil Serie A</a>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Countries</h3>
          <ul>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-gb fa-fw mr-2"></i>
              <a href="#">England</a>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-es fa-fw mr-2"></i>
              <a href="#">Spain</a>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-de fa-fw mr-2"></i>
              <a href="#">Germany</a>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-it fa-fw mr-2"></i>
              <a href="#">Italy</a>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-fr fa-fw mr-2"></i>
              <a href="#">France</a>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-br fa-fw mr-2"></i>
              <a href="#">Brazil</a>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-au fa-fw mr-2"></i>
              <a href="#">Australia</a>
            </li>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-cn fa-fw mr-2"></i>
              <a href="#">China</a>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
