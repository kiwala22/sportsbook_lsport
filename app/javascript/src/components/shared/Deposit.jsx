import { Button, Form, Input } from "antd";
import cogoToast from "cogo-toast";
import React, { useState } from "react";
import PhoneInput from "./PhoneInput";
// import Requests from "../utilities/Requests";
import axios from "axios";

const Deposit = (props) => {
   const [isLoading, setIsLoading] = useState(false);
   const [form] = Form.useForm();

   const performDeposit = (values) => {
      console.log(values.phone_number)
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
      // process deposit here
      let baseUrl = "/api/v1/deposit"
      axios
      .post(baseUrl, {
         amount: values.amount,
         phone_number: `${values.phone_number.code}${values.phone_number.phone}`
      })
      .then((response) => {
         cogoToast.success("Deposit Processing coming soon.", 5);
      })
      .catch(error => {
         cogoToast.warn("Oops, something is wong, please try again.", 5);
      })

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
      <h3>Deposit</h3>
      </div>
      <div className="widget-body">
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
