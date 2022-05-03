import BarcodeOutlined from "@ant-design/icons/lib/icons/BarcodeOutlined";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import Requests from "../../utilities/Requests";

const PasswordCode = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const handleVerification = (data) => {
    setIsLoading(true);
    let path = "/password_update";
    let values = { reset_code: data.resetCode };
    Requests.isPostRequest(path, values)
      .then((response) => {
        cogoToast.success(response.data.message, { hideAfter: 5 });
        setIsLoading(false);
        props.history.push(
          `/users/password/edit?reset_password_token=${response.data.token}`
        );
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
                  <h3 className="heading-center">Enter Reset Code</h3>
                </div>
                <div className="widget-body">
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleVerification}
                  >
                    <Form.Item
                      name="resetCode"
                      label="Reset Code"
                      rules={[
                        {
                          required: true,
                          message: "Please provide a Reset Code!",
                        },
                      ]}
                    >
                      <Input
                        prefix={<BarcodeOutlined />}
                        placeholder="Reset Code"
                      />
                    </Form.Item>
                    <br />
                    <Button
                      htmlType="submit"
                      block
                      className="btn btn-block btn-primary mt-lg login-btn"
                      loading={isLoading}
                    >
                      Confirm
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

export default PasswordCode;
