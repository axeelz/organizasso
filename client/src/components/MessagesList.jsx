import styles from "./MessagesList.module.css";
import Message from "./Message";
import { users } from "../data/sample";

const MessagesList = ({ messages, username }) => {
  if (username) {
    const user = users.find((user) => user.username === username);
    messages = messages.filter((message) => message.userId === user?.id);
  }

  if (messages.length === 0) {
    return <p className={styles.empty}>Aucun message pour le moment</p>;
  }

  return (
    <section className={styles.messagesList}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </section>
  );
};

export default MessagesList;
