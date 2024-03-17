import styles from "./MessagesList.module.css";
import Message from "./Message";

const MessagesList = ({
  messages = [
    {
      id: 1,
      username: "johndoe",
      isAdmin: true,
      date: "2024-03-02T12:00:00",
      content: "This is the first message",
    },
    {
      id: 2,
      username: "janedoe",
      isAdmin: false,
      date: "2024-03-03T20:12:00",
      content: "This is the second message",
    },
  ],
  username,
}) => {
  if (username) {
    messages = messages.filter((message) => message.username === username);
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
