import { Button, Form, Input } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PhoneInput from "./PhoneInput";
import Requests from "../../utilities/Requests";
import PhoneFormat from "../../utilities/phoneNumber";
import AcceptedPayment from "../../Images/mobile-money-acc.webp";

const Deposit = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const baseUrl = "/api/v1/deposit";

  const performDeposit = (values) => {
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
      }, 2000);
      return;
    }
    if (values.amount < 500) {
      cogoToast.warn("Minimum Deposit is 500 USH.", 5);
      setIsLoading(false);
      return;
    }
    // process deposit here
    let phoneNumber = PhoneFormat(values.phone_number.phone);
    let variables = {
      amount: values.amount,
      phone_number: phoneNumber,
    };
    Requests.isPostRequest(baseUrl, variables)
      .then((response) => {
        setIsLoading(false);
        history.push("/transactions/");
        cogoToast.info("Deposit is being Processed.", 2);
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
                  <h3>Deposit</h3>
                </div>
                <div className="widget-body">
                  <img src={AcceptedPayment} className="mobile-money-logos" />
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={performDeposit}
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
                      Make Deposit
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

export default Deposit;
