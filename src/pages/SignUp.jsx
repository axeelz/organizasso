import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Registration.module.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}>
        <div className={styles.header}>
          <h1>Inscris toi</h1>
          <p>pour accéder au forum</p>
        </div>
        <form onSubmit={handleSignup} className={styles.form}>
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
          <input
            type="password"
            id="repeatedPassword"
            placeholder="Répéter le mot de passe"
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Inscription
          </button>
          {error && <p>{error}</p>}
        </form>
        <p className={styles.redirect}>
          Tu as déjà un compte ? <Link to="/login">Connecte toi !</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
