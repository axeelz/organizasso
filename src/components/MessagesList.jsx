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
      replies: [
        {
          id: 3,
          username: "johndoe",
          date: "2024-03-03T20:15:00",
          content: "This is the first reply",
        },
        {
          id: 4,
          username: "janedoe",
          date: "2024-03-03T20:20:00",
          content: "This is the second reply",
        },
      ],
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

          {message.replies && (
            <div className={styles.replies}>
              {message.replies.map((reply) => (
                <div key={reply.id} className={styles.message}>
                  <div className={styles.messageHeader}>
                    <Link to={`profile/${reply.username}`} className={styles.username}>
                      @{reply.username}
                    </Link>
                    <span>· {formatDistance(new Date(reply.date), new Date(), { addSuffix: true, locale: fr })}</span>
                  </div>
                  <p>{reply.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default MessagesList;
