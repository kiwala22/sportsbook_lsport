import React from "react";
import ReactDOM from "react-dom";

const Sidebar = (props) => {
  return (
    <>
      <aside className="content-sidebar mb-20">
        <a href="#">
          <h3>Sports</h3>
        </a>
        <ul>
          <li>
            <a href="#">
              <i className=" blinking match-time fas fa-bolt fa-lg fa-fw mr-2 "></i>
              Live Games
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <i className="match-time far fa-futbol fa-lg fa-fw mr-2 "></i>
              Soccer
            </a>
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
    </>
  );
};

export default Sidebar;

document.addEventListener("DOMContentLoaded", () => {
  const sider = document.getElementById("sidebar");
  ReactDOM.render(<Sidebar />, sider);
});
