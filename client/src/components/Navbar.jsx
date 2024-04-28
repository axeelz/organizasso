import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { IoHome, IoSearch, IoPersonCircle, IoShieldCheckmarkSharp, IoLogIn } from "react-icons/io5";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { UserContext } from "../context/user";

const Navbar = () => {
  const { isLoggedIn, loggedInUser, loading } = useContext(UserContext);

  return (
    <header className={styles.container}>
      <Link to="/" className={styles.logoLink}>
        <img src={logo} alt="Organiz'Asso" />
      </Link>

      <nav>
        <ul className={styles.ul}>
          <li className="mobile-only">
            <Link to="/">
              <IoHome />
            </Link>
          </li>
          <NavbarLinks isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} loading={loading} />
        </ul>
      </nav>
    </header>
  );
};

const NavbarLinks = ({ isLoggedIn, loggedInUser, loading }) => {
  if (loading || !loggedInUser) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <li>
        <Link to="login">
          <IoLogIn />
          <span className="desktop-only">Connexion</span>
        </Link>
      </li>
    );
  } else {
    return (
      <>
        <li>
          <Link to="search">
            <IoSearch />
            <span className="desktop-only">Recherche</span>
          </Link>
        </li>
        {loggedInUser.isAdmin && (
          <li>
            <Link to="admin">
              <IoShieldCheckmarkSharp />
              <span className="desktop-only">Admin</span>
            </Link>
          </li>
        )}
        <li>
          <Link to="profile">
            <IoPersonCircle />
            <span className="desktop-only">Profil</span>
          </Link>
        </li>
      </>
    );
  }
};

export default Navbar;
