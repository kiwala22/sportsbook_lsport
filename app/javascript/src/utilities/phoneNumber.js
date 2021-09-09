export default function phoneNumber(phone) {
  const PNF = require("google-libphonenumber").PhoneNumberFormat;
  const phoneUtil =
    require("google-libphonenumber").PhoneNumberUtil.getInstance();

  const number = phoneUtil.parseAndKeepRawInput(phone, "UG");

  const formatted = phoneUtil
    .format(number, PNF.INTERNATIONAL)
    .substring(1)
    .split(" ")
    .join("");

  return formatted;
}
