import styles from "./MessagesList.module.css";
import Message from "./Message";

const MessagesList = ({ messages, username, loading, showForumName }) => {
  if (username) {
    // On filtre les messages pour ne garder que ceux de l'utilisateur
    messages = messages.filter((message) => message.user.username === username);
  }

  if (loading) {
    return <p className={styles.loading}>...</p>;
  }

  if (messages.length === 0) {
    return <p className={styles.empty}>Aucun message pour le moment</p>;
  }

  return (
    <section className={styles.messagesList}>
      {messages.map((message) => (
        <Message key={message._id} message={message} showForumName={showForumName} />
      ))}
    </section>
  );
};

export default MessagesList;
