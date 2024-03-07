import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { IoSearch } from "react-icons/io5";
import logo from "../assets/logo.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        <img src={logo} alt="Organiz'Asso" className={styles.logo} />
      </Link>
      <nav>
        <ul className={styles.ul}>
          <li>
            <Link to="search">
              <IoSearch />
            </Link>
          </li>
          {(!isLoggedIn && (
            <li>
              <Link to="login">Connexion</Link>
            </li>
          )) || (
            <li>
              <button onClick={() => setIsLoggedIn(false)}>Déconnexion</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
