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

const SignUp = (props) => {
  const [show, setShow] = useState(false);
  const userEmail = React.createRef();
  // const userPhoneNumber = React.createRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const userPassword = React.createRef();
  const userAgreement = React.createRef();
  const userFirstName = React.createRef();
  const userLastName = React.createRef();
  const userPasswordConfirmation = React.createRef();
  const [agreement, setAgreement] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const close = () => {
    setShow(false);
  };

  const onClickCheckBox = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setAgreement(value);
  };

  const handleSignUp = (e) => {
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
      let path = "/users";
      let variables = {
        user: {
          email: userEmail.current.value,
          phone_number: phoneNumber.substring(1),
          first_name: userFirstName.current.value,
          last_name: userLastName.current.value,
          password: userPassword.current.value,
          password_confirmation: userPasswordConfirmation.current.value,
          agreement: userAgreement.current.checked,
        },
      };
      Requests.isPostRequest(path, variables)
        .then((response) => {
          close();
          cogoToast.success(response.data.message, { hideAfter: 5 });
          setIsLoading(false);
          // props.history.push("/new_verify");
          var url = "/new_verify";
          window.location.replace(url);
          // window.location.reload();
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
      <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
        <Modal.Header closeButton closeLabel="Remove" className="modal-header">
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form noValidate validated={validated} onSubmit={handleSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="johndoe@example.com"
                ref={userEmail}
              />
              <Form.Control.Feedback type="invalid">
                Email is Required!
              </Form.Control.Feedback>
            </Form.Group>
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
                placeholder="256772000001"
                ref={userPhoneNumber}
              /> */}
              <Form.Control.Feedback type="invalid">
                Phone Number is Required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="John"
                ref={userFirstName}
              />
              <Form.Control.Feedback type="invalid">
                First Name is Required!
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Doe"
                ref={userLastName}
              />
              <Form.Control.Feedback type="invalid">
                Last Name is Required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Please enter a minimum of 8 characters"
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
            <Form.Group controlId="formBasicPasswordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  type={showConfirmation ? "text" : "password"}
                  placeholder="Please enter a minimum of 8 characters"
                  ref={userPasswordConfirmation}
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

            <Form.Group className="" controlId="formBasicCheckBox">
              <FormCheck>
                <FormCheck.Input
                  id="agreement"
                  ref={userAgreement}
                  checked={agreement}
                  onChange={onClickCheckBox}
                  name="user[agreement]"
                  required
                />
                <FormCheck.Label className="remember-me">
                  I am over 18 years of age and I accept SkylineBet’s
                  <a href="/terms" className="terms">
                    Terms And Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="terms">
                    Privacy Policy
                  </a>
                </FormCheck.Label>
                <Form.Control.Feedback type="invalid">
                  You must agree before submitting.
                </Form.Control.Feedback>
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
                "Sign Up"
              )}
            </Button>
          </Form>
          {/* <a
            className="devise_forms"
            onClick={() => {
              setShow(false);
              loginRef.current.click();
            }}
          >
            Login
          </a> */}
        </Modal.Body>
      </Modal>
      {/* <Login>
          <a ref={loginRef} style={{ display: "none" }}>
            Login
          </a>
        </Login> */}
      {React.cloneElement(props.children, {
        onClick: () => setShow(!show),
      })}
    </>
  );
};

export default SignUp;
