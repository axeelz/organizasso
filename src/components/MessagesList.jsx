import styles from "./MessagesList.module.css";
import Message from "./Message";
import { users } from "../data/sample";

const MessagesList = ({ messages, username }) => {
  if (username) {
    const user = users.find((user) => user.username === username);
    messages = messages.filter((message) => message.userId === user.id);
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
