// import "antd/dist/antd.css";
import React from "react";
import "../css/App";
import BetSlip from "./BetSlip";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import NewPassword from "./NewPassword";
import PasswordCode from "./PasswordCode";
import PasswordReset from "./PasswordReset";
import SideBanner from "./SideBanner";
import Sidebar from "./Sidebar";
import Verify from "./Verify";

const App = (props) => {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
      <Sidebar />
      <BetSlip />
      <SideBanner />
      <Verify />
      <PasswordReset />
      <PasswordCode />
      <NewPassword />
    </>
  );
};

export default App;
