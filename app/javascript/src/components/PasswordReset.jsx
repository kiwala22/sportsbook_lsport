import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import Requests from "../utilities/Requests";

const PasswordReset = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  // const phoneNumber = React.createRef();
  const [phoneNumber, setPhoneNumber] = useState("");

  const submit = (e) => {
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      let path = "/reset";
      let values = { phone_number: phoneNumber.substring(1) };
      Requests.isPostRequest(path, values)
        .then((response) => {
          setIsLoading(false);
          cogoToast.success(response.data.message, { hideAfter: 5 });
          props.history.push("/verify_reset/");
        })
        .catch((error) => {
          cogoToast.error(
            error.response ? error.response.data.message : error.message,
            {
              hideAfter: 5,
            }
          );
          setIsLoading(false);
        });
    }
    setValidated(true);
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  return (
    <>
      <div className="login">
        <div className="content-center cl-grey">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="web-sidebar-widget login-widget">
                <div className="widget-head">
                  <h3 className="heading-center">Recover With Phone Number</h3>
                </div>
                <div className="widget-body">
                  <Form noValidate validated={validated} onSubmit={submit}>
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
                        type="text"
                        className="form-control"
                        placeholder="2567123123123"
                        required
                        ref={phoneNumber}
                      /> */}
                      <Form.Control.Feedback type="invalid">
                        Please Enter your Phone Number!
                      </Form.Control.Feedback>
                    </Form.Group>
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
                        "Send Reset Code"
                      )}
                    </Button>
                  </Form>
                  {/* <br />
                  <p style={{ textAlign: "center" }} className="devise_forms">
                    <a onClick={resendVerification}>Resend Code</a>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
