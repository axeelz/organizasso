import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";
import { IoWarning } from "react-icons/io5";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    repeatedPassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    repeatedPassword: "",
  });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.repeatedPassword) {
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
          <div className={styles.nameContainer}>
            <input
              type="text"
              id="firstName"
              placeholder="Prénom"
              value={userDetails.firstName}
              onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Nom"
              value={userDetails.lastName}
              onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
            />
          </div>
          <input
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            value={userDetails.username}
            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
          />
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={userDetails.password}
            onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
          />
          <input
            type="password"
            id="repeatedPassword"
            placeholder="Répéter le mot de passe"
            value={userDetails.repeatedPassword}
            onChange={(e) => setUserDetails({ ...userDetails, repeatedPassword: e.target.value })}
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
