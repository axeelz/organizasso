import { Link } from "react-router-dom";
import styles from "./BackToList.module.css";
import { IoArrowBack } from "react-icons/io5";

const BackToList = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>
        <IoArrowBack />
        <span>Afficher la liste des forums</span>
      </Link>
    </div>
  );
};

export default BackToList;
