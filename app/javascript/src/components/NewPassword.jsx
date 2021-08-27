import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import Requests from "../utilities/Requests";

const NewPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const passwordReset = (data) => {
    setIsLoading(true);
    var tokenArr = window.location.search.split("?")[1].split("=");
    let token = tokenArr[tokenArr.length - 1];
    let path = "/users/password";
    let values = {
      user: {
        password: data.password,
        password_confirmation: data.password_confirmation,
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
                  <Form form={form} layout="vertical" onFinish={passwordReset}>
                    <Form.Item
                      name="password"
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                      />
                    </Form.Item>
                    <br />
                    <Form.Item
                      name="password_confirmation"
                      label="Confirm New Password"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                      />
                    </Form.Item>
                    <br />
                    <Button
                      htmlType="submit"
                      block
                      className="btn btn-block btn-primary mt-lg login-btn"
                      loading={isLoading}
                    >
                      Change my Password
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
