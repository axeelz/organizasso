import { Link } from "react-router-dom";
import styles from "./ForumsList.module.css";
import { useContext } from "react";
import { UserContext } from "../context/user";

const ForumsList = () => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <main>
      <h1 className={styles.title}>Forums accessibles</h1>
      <p className={styles.description}>Bienvenue, veuillez choisir un forum pour discuter avec les autres membres.</p>
      <ul className={styles.list}>
        <Link to="/forum/ouvert">
          <li data-forum="ouvert">
            <h2>Forum ouvert</h2>
          </li>
        </Link>
        {(loggedInUser.isAdmin && (
          <Link to="/forum/ferme">
            <li data-forum="fermé">
              <h2>Forum fermé</h2>
            </li>
          </Link>
        )) || (
          <Link>
            <li data-forum="no-access">
              <h2>Pas autorisé</h2>
            </li>
          </Link>
        )}
      </ul>
    </main>
  );
};

export default ForumsList;
