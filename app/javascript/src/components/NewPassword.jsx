import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Requests from "../utilities/Requests";

const NewPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const password = React.createRef();
  const passwordConfirmation = React.createRef();

  const passwordReset = (e) => {
    setIsLoading(true);
    var tokenArr = window.location.search.split("?")[1].split("=");
    let token = tokenArr[tokenArr.length - 1];
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      e.preventDefault();
      let path = "/users/password";
      let values = {
        user: {
          password: password.current.value,
          password_confirmation: passwordConfirmation.current.value,
          reset_password_token: token,
        },
      };
      Requests.isPutRequest(path, values)
        .then((response) => {
          cogoToast.success(response.data.message, { hideAfter: 5 });
          setIsLoading(false);
          props.history.push("/");
          setTimeout(() => {
            window.location.reload();
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
                  <h3 className="heading-center">Change Your Password</h3>
                </div>
                <div className="widget-body">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={passwordReset}
                  >
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>New Password</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          required
                          type={showPassword ? "text" : "password"}
                          placeholder="Please enter a minimum of 8 characters"
                          ref={password}
                          className="form-control-tbb"
                        />
                        <span
                          className="Bs-icon"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <BsEye /> : <BsEyeSlash />}
                        </span>
                        <Form.Control.Feedback type="invalid">
                          Password is Required!
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicPasswordConfirmation">
                      <Form.Label>Confirm New Password</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          required
                          type={showConfirmation ? "text" : "password"}
                          placeholder="Please enter a minimum of 8 characters"
                          ref={passwordConfirmation}
                          className="form-control-tbb"
                        />
                        <span
                          className="Bs-icon"
                          onClick={() => setShowConfirmation(!showConfirmation)}
                        >
                          {showConfirmation ? <BsEye /> : <BsEyeSlash />}
                        </span>
                        <Form.Control.Feedback type="invalid">
                          Password Confirmation is Required!
                        </Form.Control.Feedback>
                      </InputGroup>
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
                        "Change my Password"
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

export default NewPassword;
