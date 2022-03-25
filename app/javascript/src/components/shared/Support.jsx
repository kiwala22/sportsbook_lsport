import React from "react";
import { BsEnvelope } from "react-icons/bs";
import { BiSupport } from "react-icons/bi"
import { GrMapLocation } from "react-icons/gr";
import { GoLocation } from "react-icons/go"
import { FiPhoneIncoming } from "react-icons/fi"
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
                  Support Info
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
                <div className="heads paragraph">
                  <h5>Call Us:</h5>
                  <p>Email: {" "}<BsEnvelope className="contact-icons" />{" "}<a>info@betsports.ug</a></p>
                  <p>Customer Service: {" "}<BiSupport className="contact-icons" />{" "}<a>info@betsports.ug</a></p>
                  <p>Telephone: {" "}<FiPhoneIncoming className="contact-icons" />{" "}+256776225922 / +256753941009</p>
                </div>

                <div className="heads paragraph">
                  <h5>Post:</h5>
                  <p>Box:{" "}PO.Box 520023</p>
                  <p>Kampala, Uganda</p>
                </div>

                <div className="heads paragraph">
                  <h5>Visit Us:</h5>
                  <p>Location: {" "}<GoLocation className="contact-icons" />{" "}Plot 83, Turfnell road</p>
                  <p>Kamwokya, Kampala Uganda</p>
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
