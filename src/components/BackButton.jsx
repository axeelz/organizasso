import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = ({ to, text }) => {
  const navigate = useNavigate();

  if (to) {
    return (
      <Link className={styles.link} to={to}>
        <IoArrowBack />
        <span>{text || "Retour"}</span>
      </Link>
    );
  }

  return (
    <button onClick={() => navigate(-1)} className={styles.button}>
      <IoArrowBack />
      <span>Retour</span>
    </button>
  );
};

export default BackButton;
