import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Organiz'Asso
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
              <Link to="/">Déconnexion</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
