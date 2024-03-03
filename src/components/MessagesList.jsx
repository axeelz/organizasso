import styles from "./MessagesList.module.css";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";

const MessagesList = ({
  messages = [
    {
      id: 1,
      username: "johndoe",
      date: "2024-03-02T12:00:00",
      content: "This is the first message",
    },
    {
      id: 2,
      username: "janedoe",
      date: "2024-03-03T20:12:00",
      content: "This is the second message",
    },
  ],
}) => {
  return (
    <section className={styles.messagesList}>
      {messages.map((message) => (
        <div key={message.id} className={styles.message}>
          <div className={styles.messageHeader}>
            <Link to={`profile/${message.username}`} className={styles.username}>
              @{message.username}
            </Link>
            <span>· {formatDistance(new Date(message.date), new Date(), { addSuffix: true, locale: fr })}</span>
          </div>
          <p>{message.content}</p>
        </div>
      ))}
    </section>
  );
};

export default MessagesList;
