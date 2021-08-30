import { Button, Form, Input } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { withRouter } from "react-router";
import Requests from "../utilities/Requests";

const Verify = (props) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleVerification = (data) => {
    setIsLoading(true);
    let path = "/verify";
    let values = { pin: data.verificationCode };
    Requests.isPostRequest(path, values)
      .then((response) => {
        cogoToast.success(response.data.message, { hideAfter: 5 });
        setIsLoading(false);
        props.history.push("/");
        setTimeout(() => {
          window.location.reload();
        });
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
                    form={form}
                    layout="vertical"
                    onFinish={handleVerification}
                  >
                    <Form.Item
                      name="verificationCode"
                      label="Verification Code"
                      rules={[
                        {
                          required: true,
                          message: "Please provide a verification Code!",
                        },
                      ]}
                    >
                      <Input prefix={"XXX"} placeholder="Verification Code" />
                    </Form.Item>
                    <br />
                    <Button
                      htmlType="submit"
                      block
                      className="btn btn-block btn-primary mt-lg login-btn"
                      loading={isLoading}
                    >
                      Verify
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
    </>
  );
};

export default withRouter(Verify);
