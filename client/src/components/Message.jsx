import styles from "./Message.module.css";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";
import { BsFillReplyFill, BsFillTrashFill } from "react-icons/bs";
import { useContext, useState } from "react";
import NewMessage from "./NewMessage";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { displayForumName } from "../utils";
import { deleteMessage } from "../functions/messages";
import { toast } from "sonner";
import { UserContext } from "../context/user";

const Message = ({ message, showForumName, fetchMessages, disableReplying }) => {
  const [isReplying, setIsReplying] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const user = message.user;
  const isLoggedInUserAuthor = loggedInUser._id === user._id;

  return (
    <div className={styles.message}>
      <div className={styles.messageHeader}>
        <Link to={`/profile/${user.username}`} className={styles.username}>
          @{user.username}
          {user.isAdmin && <RiVerifiedBadgeFill />}
        </Link>
        <span title={new Date(message.date)}>
          · {formatDistance(new Date(message.date), new Date(), { addSuffix: true, locale: fr })}
        </span>
      </div>
      {showForumName && <span className={styles.forumName}>Forum {displayForumName(message.forum)}</span>}
      <p>{message.content}</p>
      <div className={styles.messageFooter}>
        {!disableReplying && (
          <button onClick={() => setIsReplying(!isReplying)}>
            <BsFillReplyFill />
            <span>Répondre</span>
          </button>
        )}
        {(isLoggedInUserAuthor || loggedInUser.isAdmin) && (
          <button
            onClick={() =>
              deleteMessage(message._id)
                .then(() => {
                  toast.success("Message supprimé !");
                  fetchMessages();
                })
                .catch((err) => {
                  const { message } = err.response?.data || err;
                  toast.error(message);
                })
            }>
            <BsFillTrashFill />
            <span>Supprimer</span>
          </button>
        )}
      </div>
      {isReplying && (
        <div className={styles.newMessage}>
          <NewMessage
            forumName={message.forum}
            fetchMessages={fetchMessages}
            isReplying={isReplying}
            setIsReplying={setIsReplying}
            replyTo={message._id}
          />
        </div>
      )}
      <div className={styles.replies}>
        {message.replies?.map((reply) => (
          <Message key={reply._id} message={reply} fetchMessages={fetchMessages} disableReplying />
        ))}
      </div>
    </div>
  );
};

export default Message;
