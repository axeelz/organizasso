import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";
import axios from "axios";
import { IoWarning } from "react-icons/io5";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post(import.meta.env.VITE_API_URL + "/user/login", {
        login: username,
        password: password,
      })
      .then((res) => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        const { message } = err.response.data;
        setError(message);
      });
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
            onFocus={() => setError("")}
          />
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError("")}
          />
          {error && (
            <span className={styles.error}>
              <IoWarning />
              {error}
            </span>
          )}
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
