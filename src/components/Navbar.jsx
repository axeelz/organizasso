import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <h1>Organiz'Asso</h1>
      </Link>
      <nav>
        <ul className={styles.ul}>
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
