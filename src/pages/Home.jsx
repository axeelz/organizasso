import MessagesList from "../components/MessagesList";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <main>
      <h1 className={styles.title}>Bienvenue sur Organiz'Asso !</h1>
      <MessagesList />
    </main>
  );
};

export default Home;
