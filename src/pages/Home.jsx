import MessagesList from "../components/MessagesList";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main>
      <h2 className={styles.title}>Bienvenue sur Organiz'Asso !</h2>
      <MessagesList />
    </main>
  );
};

export default Home;
