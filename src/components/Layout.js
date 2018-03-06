import React from "react";
import "../styles/Layout.less";
import "../styles/common.less";
import block from "../helpers/BEM";
import Footer from "./Footer";
import Header from "./Header";
import HomeLayout from "./HomePage/HomeLayout";
const b = block("Layout");

const Layout = () => (
  <div className={b()}>
    <Header />
    <HomeLayout/>
    <Footer />
  </div>
);

export default Layout;
