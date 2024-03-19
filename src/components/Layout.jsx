import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ isLoggedIn }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
