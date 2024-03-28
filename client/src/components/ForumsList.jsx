import { Link } from "react-router-dom";
import styles from "./ForumsList.module.css";

const ForumsList = () => {
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
        <Link to="/forum/ferme">
          <li data-forum="fermé">
            <h2>Forum fermé</h2>
          </li>
        </Link>
      </ul>
    </main>
  );
};

export default ForumsList;
