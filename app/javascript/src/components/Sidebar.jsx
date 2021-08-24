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
                to={"/fixtures/soccer/pres/"}
              >
                <i className="match-time far fa-futbol fa-lg fa-fw mr-2 "></i>
                Soccer
              </Link>
            </li>
            <li>
              <Link
                className="match-time show-more"
                to={"/fixtures/virtual_soccer/pres/"}
              >
                <i className="match-time fas fa-trophy fa-lg fa-fw mr-2 "></i>
                Virtual Soccer
              </Link>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Leagues</h3>
          <ul>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=UEFA+Champions+League`,
                }}
              >
                UEFA Champions League
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=UEFA+Europa+League`,
                }}
              >
                UEFA Europa League
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=English+Premier+League`,
                }}
              >
                English Premier League
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Serie+A`,
                }}
              >
                Serie A
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=La+Liga`,
                }}
              >
                La Liga
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Bundesliga`,
                }}
              >
                Bundesliga
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=French+Ligue+1`,
                }}
              >
                French Ligue 1
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Portuguese+Liga`,
                }}
              >
                Portuguese Liga
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=A-league`,
                }}
              >
                A-League
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=K-league`,
                }}
              >
                K-League
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=J-league`,
                }}
              >
                J-League
              </Link>
            </li>
            <li className="text-gray-400">
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Bleague_name%5D=Brazil+Serie+A`,
                }}
              >
                Brazil Serie A
              </Link>
            </li>
          </ul>
        </aside>
        <aside className="content-sidebar mb-20">
          <h3>Countries</h3>
          <ul>
            <li className="text-gray-400">
              <i className="flag-icon flag-icon-gb fa-fw mr-2"></i>
              <Link
                to={{
                  pathname: "/fixtures/soccer/pres",
                  search: `q%5Blocation%5D=England`,
                }}
              >
                England
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
                Spain
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
                Germany
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
                Italy
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
                France
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
                Brazil
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
                Australia
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
                China
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
