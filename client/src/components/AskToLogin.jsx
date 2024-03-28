import { Link } from "react-router-dom";
import styles from "./AskToLogin.module.css";

const AskToLogin = () => {
  return (
    <div className={styles.container}>
      <h1>Bienvenue sur Organiz'Asso</h1>
      <div>
        Nos forums sont réservés aux membres. Pour participer, veuillez vous&nbsp;
        <Link to="/login" className={styles.link}>
          connecter
        </Link>
      </div>
    </div>
  );
};
export default AskToLogin;
