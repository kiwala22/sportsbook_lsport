import React from "react";

const Faqs = () => {
  return (
    <>
      <div className="game-box">
        <div className="card">
          <div className="card-header">
            <h3>Frequently Asked Questions</h3>
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
                  FAQs
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
                <div className="heads">{/* Faqs body here */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
