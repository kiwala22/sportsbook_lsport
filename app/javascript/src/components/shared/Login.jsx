import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PhoneFormat from "../../utilities/phoneNumber";
import Requests from "../../utilities/Requests";
import PhoneInput from "./PhoneInput";
import SignUp from "./SignUp";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();
  const signUpRef = React.createRef();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useSelector((state) => state.isMobile);
  const dispatcher = useDispatch();

  const close = () => {
    setShow(false);
  };

  const handleLogin = (values) => {
    setIsLoading(true);
    if (!values.phone_number.phone) {
      cogoToast.error("Phone Number is Required.", 3);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    if (values.phone_number.code !== 256) {
      cogoToast.error("Invalid Country Code.", 5);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    let phoneNumber = PhoneFormat(values.phone_number.phone);
    let path = "/users/sign_in";
    let variables = {
      user: {
        phone_number: phoneNumber,
        password: values.password,
        remember_me: values.remember_me,
      },
    };
    Requests.isPostRequest(path, variables)
      .then((response) => {
        setIsLoading(false);
        close();
        cogoToast.success("Login Successful.", { hideAfter: 5 });
        // props.history.push()
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
  };

  const passwordReset = () => {
    if (isMobile) {
      dispatcher({ type: "sider", payload: false });
    }
    cogoToast.success("Provide Your Phone Number.", { hideAfter: 5 });
    close();
  };

  return (
    <>
      <Modal
        title={props.notice || "Login"}
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
          onFinish={handleLogin}
          initialValues={{ phone_number: { short: "UG" } }}
        >
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
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <br />
          <Form.Item name="remember_me" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <br />
          <br />
          <Button
            htmlType="submit"
            block
            className="btn btn-block btn-primary mt-lg login-btn"
            loading={isLoading}
          >
            Log in
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
        <Link
          className="devise_forms"
          to={"/password_reset/"}
          onClick={passwordReset}
        >
          Forgot your password?
        </Link>
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
