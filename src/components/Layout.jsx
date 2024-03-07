import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
