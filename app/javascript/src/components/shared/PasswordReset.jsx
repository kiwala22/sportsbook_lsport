import { Button, Form } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import PhoneFormat from "../../utilities/phoneNumber";
import Requests from "../../utilities/Requests";
import PhoneInput from "./PhoneInput";

const PasswordReset = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const submit = (data) => {
    setIsLoading(true);
    if (!data.phone_number.phone) {
      cogoToast.error("Phone Number is Required.", 3);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    if (data.phone_number.code !== 256) {
      cogoToast.error("Invalid Country Code.", 5);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return;
    }
    let phoneNumber = PhoneFormat(data.phone_number.phone);
    let path = "/reset";
    let values = { phone_number: phoneNumber };
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
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={submit}
                    initialValues={{ phone_number: { short: "UG" } }}
                  >
                    <Form.Item
                      name="phone_number"
                      label="Phone Number"
                      rules={[
                        {
                          required: true,
                          message: "Please provide a Phone Number!",
                        },
                      ]}
                    >
                      <PhoneInput />
                    </Form.Item>
                    <br />
                    <Button
                      htmlType="submit"
                      block
                      className="btn btn-block btn-primary mt-lg login-btn"
                      loading={isLoading}
                    >
                      Send Reset Code
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

export default PasswordReset;
