import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
// import Requests from "../utilities/Requests";

const Withdraw = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const amount = React.createRef();

  const performWithdraw = (e) => {
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // process withdraw here
      e.preventDefault();
      cogoToast.success("Withdraw Processing coming soon.", 5);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    setValidated(true);
  };
  return (
    <>
      <div className="login">
        <div className="content-center cl-grey">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 mobile-signup">
              <div className="web-sidebar-widget login-widget">
                <div className="widget-head">
                  <h3>Withdraw</h3>
                </div>
                <div className="widget-body">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={performWithdraw}
                  >
                    <Form.Group controlId="formBasicAmount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Amount"
                        ref={amount}
                      />
                      <Form.Control.Feedback type="invalid">
                        Amount is Required!
                      </Form.Control.Feedback>
                    </Form.Group>
                    <hr></hr>
                    <Button
                      type="submit"
                      className="btn btn-block btn-primary mt-lg login-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Loading...
                        </>
                      ) : (
                        "Make Withdraw"
                      )}
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;
