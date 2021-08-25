import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import React, { useState } from "react";
import en from "world_countries_lists/data/en/world.json";

const PhoneInput = (props) => {
  const [value, setValue] = useState({ short: "UG" });
  return (
    <ConfigProvider locale={en}>
      <CountryPhoneInput
        value={value}
        onChange={(v) => {
          setValue(v);
        }}
        className="form-control-antd"
        {...props}
      />
    </ConfigProvider>
  );
};

export default PhoneInput;
