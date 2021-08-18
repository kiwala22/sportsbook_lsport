import cogoToast from "cogo-toast";
import React, { useState } from "react";
import {
  Button,
  Form,
  FormCheck,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import PhoneInput from "react-phone-number-input";
import Requests from "../utilities/Requests";
import SignUp from "./SignUp";

const Login = (props) => {
  const [show, setShow] = useState(false);
  // const userPhoneNumber = React.createRef();
  const userPassword = React.createRef();
  const userRemember = React.createRef();
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const signUpRef = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const close = () => {
    setShow(false);
  };

  const onClickCheckBox = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setRemember(value);
  };

  const handleLogin = (e) => {
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
      let path = "/users/sign_in";
      let variables = {
        user: {
          phone_number: phoneNumber.substring(1),
          password: userPassword.current.value,
          remember_me: userRemember.current.checked,
        },
      };
      Requests.isPostRequest(path, variables)
        .then((response) => {
          setIsLoading(false);
          close();
          cogoToast.success(response.data.message, { hideAfter: 5 });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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
  };

  const passwordReset = () => {
    cogoToast.success("Provide Your Phone Number.", { hideAfter: 5 });
    setTimeout(() => {
      window.location.replace("/password_reset");
    }, 2000);
  };

  return (
    <>
      <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
        <Modal.Header closeButton closeLabel="Remove">
          <Modal.Title>{props.notice || "Login"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form noValidate validated={validated} onSubmit={handleLogin}>
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
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  ref={userPassword}
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
            <Form.Group className="" controlId="formBasicCheckBox">
              <FormCheck>
                <FormCheck.Input
                  name="user[remember_me]"
                  id="user_remember_me"
                  ref={userRemember}
                  checked={remember}
                  onChange={onClickCheckBox}
                />
                <FormCheck.Label className="remember-me">
                  Remember Me
                </FormCheck.Label>
              </FormCheck>
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
                "Login"
              )}
            </Button>
          </Form>
          <br />
          <a
            className="devise_forms"
            onClick={() => {
              setShow(false);
              signUpRef.current.click();
            }}
          >
            Sign up
          </a>
          <br />
          <a className="devise_forms" onClick={passwordReset}>
            Forgot your password?
          </a>
        </Modal.Body>
      </Modal>
      <SignUp>
        <a ref={signUpRef} className="component-display">
          Sign up
        </a>
      </SignUp>
      {React.cloneElement(props.children, {
        onClick: () => setShow(!show),
      })}
    </>
  );
};

export default Login;
