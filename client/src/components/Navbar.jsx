import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { IoHome, IoSearch, IoPersonCircle, IoShieldCheckmarkSharp, IoLogIn } from "react-icons/io5";
import logo from "../assets/logo.png";
import { loggedInUser } from "../data/sample";

const Navbar = ({ isLoggedIn }) => {
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
          {(!isLoggedIn && (
            <li>
              <Link to="login">
                <IoLogIn />
                <span className="desktop-only">Connexion</span>
              </Link>
            </li>
          )) || (
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
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
