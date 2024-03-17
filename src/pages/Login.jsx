import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <div className={styles.header}>
          <h1>Connecte toi</h1>
          <p>pour accéder à ton compte</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Connexion
          </button>
        </form>
        <p className={styles.redirect}>
          Tu n'as pas de compte ? <Link to="/signup">Inscris toi !</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
