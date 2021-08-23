import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
// import Requests from "../utilities/Requests";

const Deposit = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const amount = React.createRef();

  const performDeposit = (e) => {
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // process deposit here
      e.preventDefault();
      cogoToast.success("Deposit Processing coming soon.", 5);
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
                  <h3>Deposit</h3>
                </div>
                <div className="widget-body">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={performDeposit}
                  >
                    <Form.Group controlId="formBasicPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <PhoneInput
                        international={false}
                        defaultCountry="UG"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        className="form-control"
                        required={true}
                      />
                      {/* <Form.Control
                required
                type="text"
                placeholder="Phone Number"
                ref={userPhoneNumber}
              /> */}
                      <Form.Control.Feedback type="invalid">
                        Phone Number is Required!
                      </Form.Control.Feedback>
                    </Form.Group>
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
                        "Make Deposit"
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

export default Deposit;
