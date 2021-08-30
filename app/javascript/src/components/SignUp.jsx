import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PhoneFormat from "../utilities/phoneNumber";
import Requests from "../utilities/Requests";
import PhoneInput from "./PhoneInput";

const SignUp = (props) => {
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const close = () => {
    setShow(false);
  };

  const handleSignUp = (values) => {
    setIsLoading(true);
    if (values.phone_number.code !== 256) {
      cogoToast.error("Invalid Country Code.", 5);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    }
    let phoneNumber = PhoneFormat(values.phone_number.phone);
    let path = "/users";
    let variables = {
      user: {
        email: values.email,
        phone_number: phoneNumber,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        password_confirmation: values.password_confirmation,
        agreement: values.agreement,
      },
    };
    Requests.isPostRequest(path, variables)
      .then((response) => {
        close();
        cogoToast.success(response.data.message, { hideAfter: 5 });
        setIsLoading(false);
        props.history.push("/new_verify/");
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
      <Modal
        title="Sign Up"
        visible={show}
        onCancel={close}
        footer={null}
        backdrop="static"
        keyboard={false}
        scrollable={true}
        // closeIcon={<CloseOutlined />}
        confirmLoading={true}
        maskClosable={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSignUp}
          initialValues={{ phone_number: { short: "UG" } }}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Please input a valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input className="form-control" />
          </Form.Item>
          <br />
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              { required: true, message: "Please provide a Phone Number!" },
            ]}
          >
            <PhoneInput />
          </Form.Item>
          <br />
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
                whitespace: true,
              },
            ]}
          >
            <Input className="form-control" />
          </Form.Item>
          <br />
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
                whitespace: true,
              },
            ]}
          >
            <Input className="form-control" />
          </Form.Item>
          <br />
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <br />
          <Form.Item
            name="password_confirmation"
            label="Confirm Password"
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
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>
          <br />
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
          >
            <Checkbox>
              I am over 18 years of age and I accept SkylineBet’s{" "}
              <Link to={"/terms/"} className="terms" onClick={close}>
                Terms And Conditions
              </Link>{" "}
              and{" "}
              <Link to={"/privacy/"} className="terms" onClick={close}>
                Privacy Policy
              </Link>
            </Checkbox>
          </Form.Item>
          <br />
          <Button
            htmlType="submit"
            block
            className="btn btn-block btn-primary mt-lg login-btn"
            loading={isLoading}
          >
            Sign Up
          </Button>
        </Form>
      </Modal>

      {React.cloneElement(props.children, {
        onClick: () => setShow(!show),
      })}
    </>
  );
};

export default withRouter(SignUp);
