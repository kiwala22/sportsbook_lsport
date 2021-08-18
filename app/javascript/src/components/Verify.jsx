import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";
import Requests from "../utilities/Requests";

const Verify = (props) => {
  const verificationCode = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

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
      let path = "/verify";
      let values = { pin: verificationCode.current.value };
      Requests.isPostRequest(path, values)
        .then((response) => {
          cogoToast.success(response.data.message, { hideAfter: 5 });
          setIsLoading(false);
          window.location.replace("/");
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

  const resendVerification = (e) => {
    let path = "/resend_verify";
    let values = {};
    Requests.isPostRequest(path, values)
      .then((response) => {
        cogoToast.success(response.data.message, { hideAfter: 5 });
      })
      .catch((error) => {
        cogoToast.error(
          error.response ? error.response.data.message : error.message,
          {
            hideAfter: 10,
          }
        );
      });
  };

  return (
    <>
      <div className="login">
        <div className="content-center cl-grey">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12">
              <div className="web-sidebar-widget login-widget">
                <div className="widget-head">
                  <h3 className="heading-center">Verify Phone Number</h3>
                </div>
                <div className="widget-body">
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleVerification}
                  >
                    <Form.Group controlId="formBasicCode">
                      <Form.Label>Verification Code</Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="verificationCode"
                        placeholder="Ex: 123123"
                        required
                        ref={verificationCode}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter a Code!
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
                        "Verify"
                      )}
                    </Button>
                  </Form>
                  <br />
                  <p className="heading-center devise_forms">
                    <a onClick={resendVerification}>Resend Code</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
        <Modal.Header
          closeButton
          closeLabel="Remove"
          style={{ backgroundColor: "#7690A7" }}
        >
          <Modal.Title>Verify Phone Number</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#5F7b95" }}>
          <form onSubmit={handleVerification}>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                className="form-control"
                id="verificationCode"
                required
                ref={verificationCode}
              />
            </div>
            <div className="actions">
              <button
                name="button"
                type="submit"
                className="btn btn-block btn-primary mt-lg login-btn"
              >
                Verify
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default Verify;

document.addEventListener("DOMContentLoaded", () => {
  const verify = document.getElementById("verify");
  verify && ReactDOM.render(<Verify />, verify);
});
