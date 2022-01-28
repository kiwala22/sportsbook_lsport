import React from "react";
import { BsEnvelope, BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

const Support = () => {
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <>
      <div className={isMobile ? "game-box mobile-table-padding" : "game-box"}>
        <div className="card">
          <div className="card-header">
            <h3>Contact Us</h3>
          </div>
          <div className="card-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Contacts
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="heads">
                  <BsSearch /> <a>www.example.com</a> <br /> <br />
                  <BsEnvelope /> info@example.ug <br />
                  <br />
                  <i className="fas fa-phone" aria-hidden="true"></i>{" "}
                  +256700123123 / +256700123123
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
