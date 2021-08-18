import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";
import Requests from "../utilities/Requests";
import NewPassword from "./NewPassword";

const PasswordCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const resetCode = React.createRef();

  const handleVerification = (e) => {
    setIsLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      e.preventDefault();
      let path = "/password_update";
      let values = { reset_code: resetCode.current.value };
      Requests.isPostRequest(path, values)
        .then((response) => {
          cogoToast.success(response.data.message, { hideAfter: 5 });
          setIsLoading(false);
          <NewPassword token={response.data.token} />;
          setTimeout(() => {
            window.location.replace(
              `/users/password/edit?reset_password_token=${response.data.token}`
            );
          }, 1000);
        })
        .catch((error) => {
          cogoToast.error(
            error.response ? error.response.data.message : error.message,
            {
              hideAfter: 10,
            }
          );
          setIsLoading(false);
        });
    }
    setValidated(true);
  };
  return (
    <>
      <div className="login">
        <div className="content-center cl-grey">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="web-sidebar-widget login-widget">
                <div className="widget-head">
                  <h3 className="heading-center">Enter Reset Code</h3>
                </div>
                <div className="widget-body">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleVerification}
                  >
                    <Form.Group controlId="formBasicPhoneNumber">
                      <Form.Label>Reset Code</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        placeholder="123000"
                        required
                        ref={resetCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Reset Code!
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
                        "Confirm"
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

export default PasswordCode;

document.addEventListener("DOMContentLoaded", () => {
  const password = document.getElementById("password-edit");
  password && ReactDOM.render(<PasswordCode />, password);
});
