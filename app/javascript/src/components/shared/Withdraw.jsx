import { Button, Form, Input } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import Requests from "../../utilities/Requests";
import { useHistory } from "react-router-dom";
import AcceptedPayment from "../../Images/mobile-money-acc.webp";

const Withdraw = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const baseUrl = "/api/v1/withdraw";
  const history = useHistory();

  const performWithdraw = (values) => {
    let variables = {
      amount: values.amount,
    };
    setIsLoading(true);
    Requests.isPostRequest(baseUrl, variables)
      .then((response) => {
        setIsLoading(false);
        history.push("/transactions/");
        cogoToast.info("Withdraw is being Processed.", 2);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        if (error.response) {
          cogoToast.warn(error.response.data.errors, 4);
        } else {
          cogoToast.warn("Oops, something is wong, please try again.", 5);
        }
        setIsLoading(false);
      });
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
                  <img src={AcceptedPayment} className="mobile-money-logos" />
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
                        prefix={"UGX"}
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
