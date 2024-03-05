import MessagesList from "../components/MessagesList";
import NewMessage from "../components/NewMessage";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <section className={styles.hero}>
        <span>Bienvenue sur le</span>
        <h1>Forum ouvert</h1>
      </section>
      <main>
        <NewMessage />
        <MessagesList />
      </main>
    </>
  );
};

export default Home;
