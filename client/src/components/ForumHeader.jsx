import styles from "./ForumHeader.module.css";

const ForumHeader = ({ name }) => {
  return (
    <section className={styles.hero} data-forum={name}>
      <span>Bienvenue sur le</span>
      <h1>Forum {name}</h1>
    </section>
  );
};

export default ForumHeader;
