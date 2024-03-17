import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";
import { IoWarning } from "react-icons/io5";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    repeatedPassword: "",
  });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== repeatedPassword) {
      setErrors({ ...errors, repeatedPassword: "Les mots de passe ne correspondent pas" });
      return;
    }
    setErrors({ ...errors, repeatedPassword: "" });
    navigate("/login");
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
            onFocus={() => setErrors({ ...errors, repeatedPassword: "" })}
          />
          {errors.repeatedPassword && (
            <span className={styles.error}>
              <IoWarning />
              {errors.repeatedPassword}
            </span>
          )}
          <button type="submit" className={styles.button}>
            Inscription
          </button>
        </form>
        <p className={styles.redirect}>
          Tu as déjà un compte ? <Link to="/login">Connecte toi !</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
