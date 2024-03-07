import { Link } from "react-router-dom";
import styles from "./ForumsList.module.css";
import ForumHeader from "./ForumHeader";

const ForumsList = () => {
  return (
    <div className={styles.container}>
      <section className="spacing">
        <h1 className={styles.title}>Forums accessibles</h1>
        <p className={styles.description}>
          Bienvenue, veuillez choisir un forum pour discuter avec les autres membres.
        </p>
      </section>
      <ul className={styles.list}>
        <li>
          <Link to="forum-ouvert">
            <ForumHeader name="ouvert" nameOnly />
          </Link>
        </li>
        <li>
          <Link to="forum-ferme">
            <ForumHeader name="fermé" nameOnly />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ForumsList;
