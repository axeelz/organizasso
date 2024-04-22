import MessagesList from "../components/MessagesList";
import NewMessage from "../components/NewMessage";
import ForumHeader from "../components/ForumHeader";
import { useParams, Navigate } from "react-router-dom";
import { messages } from "../data/sample";
import styles from "./Forum.module.css";
import BackButton from "../components/BackButton";

const Forum = () => {
  const { name } = useParams();
  const forums = ["ouvert", "ferme"];

  if (!forums.includes(name)) {
    return <Navigate to="/forum/ouvert" />;
  }

  const displayName = name === "ouvert" ? "ouvert" : "fermé";
  const forumMessages = messages.filter((message) => message.forum === name);

  return (
    <>
      <ForumHeader name={displayName} />
      <main>
        <div className={styles.backContainer}>
          <BackButton to="/" text="Liste des forums" />
        </div>
        <NewMessage />
        <MessagesList messages={forumMessages} />
      </main>
    </>
  );
};

export default Forum;