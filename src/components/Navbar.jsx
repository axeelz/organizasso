import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

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
            <>
              <li>
                <button onClick={logout}>Deconnexion</button>
              </li>
              <li>
                <Link to="profile">
                  <FaUserCircle />
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
