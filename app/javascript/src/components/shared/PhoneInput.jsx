import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import en from "world_countries_lists/data/countries/en/world.json";

const PhoneInput = (props) => {
  const [value, setValue] = useState({ short: "UG" });
  const isMobile = useSelector((state) => state.isMobile);
  return (
    <ConfigProvider locale={en}>
      <CountryPhoneInput
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        className={
          isMobile
            ? "form-control-antd mobile-phone-input"
            : "form-control-antd"
        }
        // className="form-control-antd"
        {...props}
      />
    </ConfigProvider>
  );
};

export default PhoneInput;
