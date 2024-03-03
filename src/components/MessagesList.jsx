import styles from "./MessagesList.module.css";

const MessagesList = ({
  messages = [
    {
      id: 1,
      username: "johndoe",
      date: "maintenant",
      content: "This is the first message",
    },
    {
      id: 2,
      username: "janedoe",
      date: "il y a 5 minutes",
      content: "This is the second message",
    },
  ],
}) => (
  <section className={styles.messagesList}>
    {messages.map((message) => (
      <div key={message.id} className={styles.message}>
        <div className={styles.messageHeader}>
          <h4>@{message.username}</h4>
          <span>{message.date}</span>
        </div>
        <p>{message.content}</p>
      </div>
    ))}
  </section>
);

export default MessagesList;
