import { Button, Form, Input } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
// import Requests from "../utilities/Requests";

const Withdraw = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const performWithdraw = () => {
    setIsLoading(true);
    cogoToast.success("Withdraw Processing coming soon.", 5);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="login">
        <div className="content-center cl-grey">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 mobile-signup">
              <div className="web-sidebar-widget login-widget">
                <div className="widget-head">
                  <h3>Withdraw</h3>
                </div>
                <div className="widget-body">
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={performWithdraw}
                  >
                    <Form.Item
                      name="amount"
                      label="Amount"
                      rules={[
                        { required: true, message: "Please enter amount!" },
                      ]}
                    >
                      <Input
                        prefix={"KES"}
                        placeholder="Amount"
                        type="number"
                      />
                    </Form.Item>
                    <br />
                    <Button
                      htmlType="submit"
                      block
                      className="btn btn-block btn-primary mt-lg login-btn"
                      loading={isLoading}
                    >
                      Make Withdraw
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

export default Withdraw;
